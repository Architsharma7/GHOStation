// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/interfaces/IERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import {VerifierStaking} from "./Staking.sol";

// TASKS
// 1. ALLOWING USERS TO DEPOSIT the GHO asset into the vault ✅
// Depost is locked for a certain period of time , fixed for a certain  ✅
// 2. Allow external companies to register for the insurance , and deposit the insurance premium into the vault periodically✅
// Registeration is one time , and the company can deposit the premium periodically , but if the premium is not deposited for a certain period of time , the insurance is cancelled, claim can't be processed
// Also the Company Can't claim any amount before an year , which is a lockin period
// Moreover there is another cooldown period , before which company can't provide any new claims
// 3. Option to provider a claim request by the company, along with the claim amount , and the proof of the claim in a doc format , and the vault will verify the claim , and if the claim is valid ,
// the claim amount will be sent to the company , and the partial premium will be sent to the verifiers , and the rest of the amount will be sent to the pool ✅
// 4. Allow verifier to actually provide claim result and validation , if the clam is valid , verifier get's the rewards ,claim is processesed
// If not , the claim is cancelled , and still the verifier earn fees , and the pool get's the rest of the amount
// Allow External ShareHolders to raise disputes , in case the verifier is wrong , acquire the stake of the verifier , and the pool get's the rest of amount , and the claim is still cancelled

contract InsuranceVault is ERC4626 {
    using Math for uint256;

    struct DepositDetails {
        bool hasDeposited;
        uint256 time;
    }

    mapping(address => DepositDetails) public _depositsData;

    struct InsuranceDetails {
        address companyAddress;
        string companyCID;
        uint256 insuredAmount;
        uint256 premium;
        uint256 lastPremiumDepositTime;
        uint256 registerationTime;
        uint256 lastClaimTime;
        uint256 lastClaimAmount;
    }

    mapping(address => InsuranceDetails) public _insuranceData;

    enum ClaimStatus {
        PENDING,
        VERIFIED,
        DISPUTED,
        CANCELLED
    }

    enum ClaimResult {
        NOT_PROCESSED,
        VALID,
        INVALID
    }

    struct ClaimProposal {
        address companyAddress;
        address verifierAddress;
        uint256 claimAmount;
        string proofCID;
        uint claimProposalTime;
        ClaimStatus _status;
        ClaimResult _result;
    }

    mapping(uint => ClaimProposal) public _claimProposals;
    uint public totalClaimProposals;

    event ClaimRequested(
        uint claimId,
        address indexed companyAddress,
        string proofCID,
        uint claimAmount,
        uint timestamp
    );

    event ClaimSetteled(
        uint claimId,
        address indexed companyAddress,
        address indexed verifierAddress,
        ClaimStatus _status,
        ClaimResult _result,
        uint timestamp
    );

    VerifierStaking public staking;
    address public controller;
    // IERC20 public ghoToken = IERC20(0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f);
    IERC20 public ghoToken;

    // PERIOD FOR DEPOSIT / WITHDRAW
    uint public constant FIXED_PERIOD = 30 minutes; //TODO: change to 6,12 months later
    // PERIOD FOR PREMIUM Payment
    uint public constant PREMIUM_PERIOD = 1 days; // TODO: change to 30 days
    // PERIOD OF CLAIM LOCKIN AFTER REGISTERATION
    uint public constant LOCKIN_PERIOD = 30 minutes; // TODO: change to 1 years
    // PERIOD OF CLAIM COOLDOWN
    uint public constant COOLDOWN_PERIOD = 30 minutes; // TODO: change to 1 years
    uint public constant PREMIUM_RATE = 150; // 100 BPS = 1%

    constructor(
        address token0,
        address _staking
    ) ERC4626(IERC20(token0)) ERC20("GHOInsure", "GHO-I") {
        controller = msg.sender;
        ghoToken = IERC20(token0);
        staking = VerifierStaking(_staking);
    }

    modifier onlyVerifier() {
        require(staking.isVerifier(msg.sender), "NOT A VERIFIER");
        _;
    }

    modifier onlyCompany() {
        require(
            _insuranceData[msg.sender].companyAddress == msg.sender,
            "NOT COMPANY"
        );
        _;
    }

    // Deposits are locked for a certain period of time , fixed for a certain pool
    function _deposit(
        address caller,
        address receiver,
        uint256 assets,
        uint256 shares
    ) internal virtual override {
        super._deposit(caller, receiver, assets, shares);
        // Add the record of deposit by the User
        _depositsData[caller] = DepositDetails(true, block.timestamp);
    }

    ///  adding constraint that the user should have deposits for more then FIXED_PERIOD
    function _withdraw(
        address caller,
        address receiver,
        address owner,
        uint256 assets,
        uint256 shares
    ) internal virtual override {
        require(
            _depositsData[caller].hasDeposited == true,
            "InsuranceVault: User has not deposited"
        );
        require(
            block.timestamp - _depositsData[caller].time > FIXED_PERIOD,
            "InsuranceVault: User has not deposited for more then FIXED_PERIOD"
        );

        super._withdraw(caller, receiver, owner, assets, shares);
    }

    // function to withdraw any locked assets handled by the controller
    function withdrawLockedAssets(address asset, uint256 amount) external {
        require(
            msg.sender == controller,
            "InsuranceVault: Only controller can withdraw locked assets"
        );
        require(
            amount > 0,
            "InsuranceVault: Cannot withdraw 0 amount of tokens"
        );
        if (asset == address(0)) {
            (bool sent, ) = payable(msg.sender).call{value: amount}("");

            require(sent, "Failed to send Ether");
        } else {
            TransferHelper.safeTransfer(asset, msg.sender, amount);
        }
    }

    function setStakingContract(address _staking) public {
        require(
            msg.sender == controller,
            "InsuranceVault: Only controller can withdraw locked assets"
        );
        staking = VerifierStaking(_staking);
    }

    // Along with registeration , the company has to deposit the premium in GHO tokens Only
    function registerInsurance(
        address companyAddress,
        string memory companyCID,
        uint insuredAmount
    ) public {
        require(
            _insuranceData[companyAddress].companyAddress == address(0),
            "InsuranceVault: Company already registered"
        );
        require(
            insuredAmount > 0,
            "InsuranceVault: Insured amount should be greater then 0"
        );
        uint premium = insuredAmount.mulDiv(PREMIUM_RATE, 10000);

        // Transfer the premium from the company to the vault ,NOTE Should be approved to the vault
        TransferHelper.safeTransferFrom(
            address(ghoToken),
            companyAddress,
            address(this),
            premium
        );

        _insuranceData[companyAddress] = InsuranceDetails(
            companyAddress,
            companyCID,
            insuredAmount,
            premium,
            block.timestamp,
            block.timestamp,
            0,
            0
        );
    }

    // premium has to be paid every month , i.e. 30 days , if not paid , the insurance claim can not be done
    function depositPremium() public onlyCompany {
        require(
            _insuranceData[msg.sender].companyAddress != address(0),
            "InsuranceVault: Company not registered"
        );
        // Premium should be paid before or on the day of PREMIUM_PERIOD
        // If called after , the premium is late , and the insurance is cancelled
        if (
            block.timestamp -
                _insuranceData[msg.sender].lastPremiumDepositTime >
            PREMIUM_PERIOD
        ) {
            // Cancel the insurance
            delete _insuranceData[msg.sender];
            revert("InsuranceVault: Premium late");
        }

        // Transfer the premium from the company to the vault ,NOTE Should be approved to the vault
        TransferHelper.safeTransferFrom(
            address(ghoToken),
            msg.sender,
            address(this),
            _insuranceData[msg.sender].premium
        );

        _insuranceData[msg.sender].lastPremiumDepositTime = block.timestamp;
    }

    // Can be only done by registered company
    // Should have last premium deposit time within the premium period
    // No Claim for the lockin or Cooldown period
    // takes in the Claim request , and the proof of the claim in a doc format
    function requestClaim(
        string memory proofCID,
        uint claimAmount
    ) public onlyCompany returns (uint) {
        require(
            _insuranceData[msg.sender].companyAddress != address(0),
            "InsuranceVault: Company not registered"
        );
        require(
            block.timestamp -
                _insuranceData[msg.sender].lastPremiumDepositTime <
                PREMIUM_PERIOD,
            "InsuranceVault: Premium not paid"
        );
        require(
            block.timestamp - _insuranceData[msg.sender].registerationTime >
                LOCKIN_PERIOD,
            "InsuranceVault: Claim not allowed in lockin period"
        );
        require(
            block.timestamp - _insuranceData[msg.sender].lastClaimTime >
                COOLDOWN_PERIOD,
            "InsuranceVault: Claim not allowed in cooldown period"
        );
        require(
            claimAmount <= _insuranceData[msg.sender].insuredAmount,
            "InsuranceVault: Claim amount should be less then insured amount"
        );
        require(
            claimAmount <= ghoToken.balanceOf(address(this)),
            "InsuranceVault: Insufficient funds"
        );

        uint claimId = totalClaimProposals;

        _claimProposals[claimId] = ClaimProposal(
            msg.sender,
            address(0),
            claimAmount,
            proofCID,
            block.timestamp,
            ClaimStatus.PENDING,
            ClaimResult.NOT_PROCESSED
        );

        totalClaimProposals++;
        emit ClaimRequested(
            claimId,
            msg.sender,
            proofCID,
            claimAmount,
            block.timestamp
        );

        return claimId;
    }

    function verifyClaim(
        uint claimId,
        ClaimResult _decision
    ) public onlyVerifier {
        // check the authenticity of the claim
        require(
            _claimProposals[claimId]._status == ClaimStatus.PENDING,
            "InsuranceVault: Claim already processed"
        );
        require(
            _claimProposals[claimId].verifierAddress == address(0),
            "InsuranceVault: Verifier already Present"
        );

        if (_decision == ClaimResult.VALID) {
            _claimProposals[claimId]._status = ClaimStatus.VERIFIED;
            _claimProposals[claimId].verifierAddress = msg.sender;
            _claimProposals[claimId]._result = ClaimResult.VALID;

            _insuranceData[msg.sender].lastClaimTime = block.timestamp;
            _insuranceData[msg.sender].lastClaimAmount = _claimProposals[
                claimId
            ].claimAmount;

            // if the claim is valid , and the claim is then sent to the company for the claim amount
            // the Verifier get's a 0.5% of the claim amount as reward

            // Transfer the insured amount from the vault to the company
            TransferHelper.safeTransfer(
                address(ghoToken),
                msg.sender,
                _claimProposals[claimId].claimAmount
            );

            uint verifierFee = _claimProposals[claimId].claimAmount.mulDiv(
                50,
                10000
            );

            // // Transfer the partial premium to the verifiers
            TransferHelper.safeTransfer(
                address(ghoToken),
                msg.sender,
                verifierFee
            );
            emit ClaimSetteled(
                claimId,
                _claimProposals[claimId].companyAddress,
                msg.sender,
                ClaimStatus.VERIFIED,
                ClaimResult.VALID,
                block.timestamp
            );
        } else if (_decision == ClaimResult.INVALID) {
            // if the claim is invalid , the verifier still get's the rewards , and the pool get's the rest of the amount

            _claimProposals[claimId]._status = ClaimStatus.CANCELLED;
            _claimProposals[claimId]._result = ClaimResult.INVALID;
            _claimProposals[claimId].verifierAddress = msg.sender;

            uint verifierFee = _claimProposals[claimId].claimAmount.mulDiv(
                50,
                10000
            );

            // // Transfer the partial premium to the verifiers
            TransferHelper.safeTransfer(
                address(ghoToken),
                msg.sender,
                verifierFee
            );
            emit ClaimSetteled(
                claimId,
                _claimProposals[claimId].companyAddress,
                msg.sender,
                ClaimStatus.CANCELLED,
                ClaimResult.INVALID,
                block.timestamp
            );
        } else {
            revert("InsuranceVault: Invalid decision");
        }
    }

    // Maybe we can restrict this to the shareholder's only , who have deposited in the pool
    function raiseDispute(uint claimId) public {
        require(
            _claimProposals[claimId]._status == ClaimStatus.VERIFIED,
            "InsuranceVault: Claim not verified"
        );
        require(
            _claimProposals[claimId]._result == ClaimResult.INVALID,
            "InsuranceVault: Claim not invalid"
        );

        require(balanceOf(msg.sender) > 0, "InsuranceVault: Not a shareholder");

        // if the claim is invalid , the verifier still get's the rewards , and the pool get's the rest of the amount
        // the pool can raise a dispute , and if the dispute is valid , the pool get's the stake of the verifier , and the claim is cancelled

        _claimProposals[claimId]._status = ClaimStatus.DISPUTED;

        // Transfer the stake of the verifier to the pool
        staking.blockStake(_claimProposals[claimId].verifierAddress);

        emit ClaimSetteled(
            claimId,
            _claimProposals[claimId].companyAddress,
            msg.sender,
            ClaimStatus.DISPUTED,
            ClaimResult.INVALID,
            block.timestamp
        );
    }

    // We can also propose if the Claim is valid , the funds are not transferred directly , they are put in a locked state
    // and the pool can raise a dispute , upon which the funds will not be transferred to the company , and the pool get's the stake of the verifier
}
