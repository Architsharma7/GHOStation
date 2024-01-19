// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/interfaces/IERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import {IBalancerVault, BalancerMethods} from "./Balancer.sol";
import {ICurvePool, CurveMethods} from "./Curve.sol";
import {UniswapMethods, ISwapRouter, INonfungiblePositionManager} from "./Uniswap.sol";

// TASKS
// 1. ALLOWING USERS TO DEPOSIT the GHO asset into the vault ✅
// 2. REDISTRIBUTE THE TOKENS TO DIFFERENT POOLS , uniswap , curve , balancer
// Redistribution could happen at certain intervals or when a certain threshold is reached
// Need to use Automation to , either make a time based or custom trigger to redistribute the tokens
// Only 80% tokens are redistributed , 20% are kept for the vault available for withdrawl
// 3. Also Maybe add a trigger to withdraw the tokens from the pools
// 4. Maybe collect fees from the pools and rewards too , might need to swap those rewards to convert into the favourable asset
// 5. Then finally Allow withdrawl of tokens from the vault , in the right proportion

contract ERC4626Vault is ERC4626, BalancerMethods {
    address public controller;

    constructor(
        address _balancerVault,
        ISwapRouter _swapRouter,
        INonfungiblePositionManager _nonfungiblePositionManager,
        address _factory,
        address _WETH9,
        ICurvePool _curvePool
    )
        BalancerMethods(IBalancerVault(_balancerVault))
        CurveMethods(_curvePool)
        UniswapMethods(
            _swapRouter,
            _nonfungiblePositionManager,
            _factory,
            _WETH9
        )
        ERC4626("GHO Vault", "GHO-V")
    {
        controller = msg.sender;
    }

    function redistribute() external {
        // TODO
        // 1. Get the amount of tokens in the vault
        // 2. Calculate the 80% of the tokens to be redistributed
        // 3. safeApprove the needed Tokens
        // 4. Add liquidity to the respective pool contracts
    }

    // /// @dev Send entry fee to {_entryFeeRecipient}. See {IERC4626-_deposit}.
    // function _deposit(
    //     address caller,
    //     address receiver,
    //     uint256 assets,
    //     uint256 shares
    // ) internal virtual override {
    //     uint256 fee = _feeOnTotal(assets, _entryFeeBasisPoints());
    //     address recipient = _entryFeeRecipient();

    //     super._deposit(caller, receiver, assets, shares);

    //     if (fee > 0 && recipient != address(this)) {
    //         SafeERC20.safeTransfer(IERC20(asset()), recipient, fee);
    //     }
    // }

    // /// @dev Send exit fee to {_exitFeeRecipient}. See {IERC4626-_deposit}.
    // function _withdraw(
    //     address caller,
    //     address receiver,
    //     address owner,
    //     uint256 assets,
    //     uint256 shares
    // ) internal virtual override {
    //     uint256 fee = _feeOnRaw(assets, _exitFeeBasisPoints());
    //     address recipient = _exitFeeRecipient();

    //     super._withdraw(caller, receiver, owner, assets, shares);

    //     if (fee > 0 && recipient != address(this)) {
    //         SafeERC20.safeTransfer(IERC20(asset()), recipient, fee);
    //     }
    // }

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
