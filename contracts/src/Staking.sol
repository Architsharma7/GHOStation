// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";

// TASK
// Allow verifiers to stake GHO tokens , to participate in Verification of the claims
// Verifiers will be rewarded with GHO tokens for their work , 0.1% of the claim amount
// Verifiers will be punished for their wrong work , and the Stake will be taken Away
// Staking amount is 1000 GHO tokens for now , can be changed later
contract VerifierStaking is Ownable {
    mapping(address => bool) public isVerifier;
    address public manager;

    IERC20 public ghoToken;

    constructor(address token, address _manager) {
        ghoToken = IERC20(token);
        manager = _manager; // vault contract , that can block the stake
    }

    function setManager(address _manager) public onlyOwner {
        manager = _manager;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "NOT MANAGER");
        _;
    }

    function stake() public {
        // User need to provider approval for the Token Transfer
        require(
            ghoToken.allowance(msg.sender, address(this)) >= 1000 * 10 ** 18,
            "TOKENS NOT APPROVED"
        );
        require(isVerifier[msg.sender] == false, "ALREADY A VERIFIER");

        uint256 amount = 1000 * 10 ** 18;
        TransferHelper.safeTransfer(address(ghoToken), msg.sender, amount);

        isVerifier[msg.sender] = true;
    }

    function unstake() public {
        require(isVerifier[msg.sender] == true, "NOT A VERIFIER");
        // User can unstake the tokens , if he is not doing the work properly
        isVerifier[msg.sender] = false;
        uint256 amount = 1000 * 10 ** 18;
        TransferHelper.safeTransferFrom(
            address(ghoToken),
            address(this),
            msg.sender,
            amount
        );
    }

    function blockStake(address verifier) public onlyManager {
        require(isVerifier[verifier] == true, "NOT A VERIFIER");
        // Manager can block the stake , if the verifier is not doing the work properly
        isVerifier[verifier] = false;
    }
}
