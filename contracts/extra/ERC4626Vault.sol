// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/interfaces/IERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import {IBalancerVault, BalancerMethods} from "./Balancer.sol";
import {ICurvePool, CurveMethods} from "./Curve.sol";
import {UniswapMethods, ISwapRouter, INonfungiblePositionManager} from "./Uniswap.sol";
import "./interfaces/Gelato/AutomateTaskCreator.sol";

// TASKS
// 1. ALLOWING USERS TO DEPOSIT the GHO asset into the vault ✅
// 2. REDISTRIBUTE THE TOKENS TO DIFFERENT POOLS , uniswap , curve , balancer
// Redistribution could happen at certain intervals or when a certain threshold is reached
// Need to use Automation to , either make a time based or custom trigger to redistribute the tokens
// Only 80% tokens are redistributed , 20% are kept for the vault available for withdrawl
// 3. Also Maybe add a trigger to withdraw the tokens from the pools
// 4. Maybe collect fees from the pools and rewards too , might need to swap those rewards to convert into the favourable asset
// 5. Then finally Allow withdrawl of tokens from the vault , in the right proportion

contract ERC4626Vault is
    ERC4626,
    BalancerMethods,
    CurveMethods,
    UniswapMethods,
    AutomateTaskCreator
{
    using Math for uint256;
    address public controller;
    // IERC20 public ghoToken = IERC20(0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f);
    IERC20 public ghoToken;
    uint public taskId;

    constructor(
        address token0,
        address token1,
        bytes32 poolId,
        address payable _automate,
        address _fundsOwner,
        address _balancerVault,
        ISwapRouter _swapRouter,
        INonfungiblePositionManager _nonfungiblePositionManager,
        address _factory,
        address _WETH9,
        ICurvePool _curvePool
    )
        BalancerMethods(IBalancerVault(_balancerVault), token0, token1, poolId)
        CurveMethods(_curvePool, token0, token1)
        UniswapMethods(
            _swapRouter,
            _nonfungiblePositionManager,
            _factory,
            _WETH9,
            token0,
            token1
        )
        AutomateTaskCreator(_automate, _fundsOwner)
        ERC4626(address(ghoToken))
    {
        controller = msg.sender;
        ghoToken = IERC20(token0);
    }

    /*///////////////////////////////////////////////////////////////
                           Gelato
    //////////////////////////////////////////////////////////////*/
    function executeGelatoTask() public {
        // Perform all the checks you want to make sure the task is valid
        // execute the redistribution function
    }

    function depositGelatoFees() external payable {
        _depositFunds(msg.value, ETH);
    }

    // address(0) for ETH
    function withdrawGealtoFees(uint256 _amount, address _token) external {
        withdrawFunds(_amount, _token);
    }

    function createTask(uint frequency) external returns (bytes32 taskId) {
        require(
            msg.sender == controller,
            "ERC4626Vault: Only controller can withdraw locked assets"
        );
        ModuleData memory moduleData = ModuleData({
            modules: new Module[](2),
            args: new bytes[](2)
        });

        moduleData.modules[0] = Module.TIME;
        moduleData.modules[1] = Module.PROXY;
        // moduleData.modules[2] = Module.SINGLE_EXEC;

        // we can pass any arg we want in the encodeCall
        moduleData.args[0] = _timeModuleArg(
            block.timestamp + frequency,
            frequency
        );
        moduleData.args[1] = _proxyModuleArg();
        // moduleData.args[2] = _singleExecModuleArg();

        _taskId = _createTask(
            address(this),
            abi.encodeCall(this.executeGelatoTask, ()),
            moduleData,
            address(0)
        );

        taskId = _taskId;
        /// Here we just pass the function selector we are looking to execute
    }

    function redistribute() external {
        // TODO
        // 1. Get the amount of tokens in the vault
        uint balance = ghoToken.balanceOf(address(this));

        // 2. Calculate the 80% of the tokens to be redistributed
        uint amountToRedistribute = (balance * 80) / 100;

        // 3. safeApprove the needed Tokens
        // approvals are already added in the functions
        // internal calls to the functions

        // Uniswap 30%
        // Curve 30%
        // Balancer 40%
        uint amountToUniswap = (amountToRedistribute * 30) / 100;
        uint amountToCurve = (amountToRedistribute * 30) / 100;
        uint amountToBalancer = (amountToRedistribute * 40) / 100;

        // 4. Add liquidity to the respective pool contracts
        increaseLiquidityUniswap(tokenId, amountToUniswap, 0);
        addLiquidityBalancer(amountToBalancer, 0, address(this));
        addLiquidityCurve(amountToCurve, 0, address(this));
    }

    function removeLiquidity() external {
        decreaseLiquidityUniswap(tokenId);
        removeLiquidityBalancer(address(this));
        removeLiquidityCurve(burn_amount, address(this));
        // TODO : Get the burn_amount and other stats for the Curve Pool
    }

    function collectRewards() external {
        collectAllFeesUniswap(tokenId);
        // exiting pools collects the rewards too for Balancer
        // it awards CRV it seems , which has to be collected in some or other way , and then swapped to GHO
    }

    // function to withdraw any locked assets handled by the controller
    function withdrawLockedAssets(
        address asset,
        uint256 amount
    ) external override {
        require(
            msg.sender == controller,
            "ERC4626Vault: Only controller can withdraw locked assets"
        );
        require(amount > 0, "ERC4626Vault: Cannot withdraw 0 amount of tokens");
        if (asset == address(0)) {
            (bool sent, bytes memory data) = payable(msg.sender).call{
                value: amount
            }("");

            require(sent, "Failed to send Ether");
        } else {
            TransferHelper.safeTransfer(asset, msg.sender, amount);
        }
    }
}
