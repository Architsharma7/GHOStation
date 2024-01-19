// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "./interfaces/IBalancerVault.sol";

// https://etherscan.io/address/0xBA12222222228d8Ba445958a75a0704d566BF2C8#writeContract
// https://etherscan.io/address/0x8353157092ed8be69a9df8f95af097bbf33cb2af#writeContract
// https://app.balancer.fi/#/ethereum/pool/0x8353157092ed8be69a9df8f95af097bbf33cb2af0000000000000000000005d9

abstract contract BalancerMethods is IERC721Receiver {
    IBalancerVault public immutable balancerVault;

    address public constant GHO = 0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f;
    address public constant USDC = 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48;
    bytes32 public constant CURVE_POOL_ID =
        0x8353157092ed8be69a9df8f95af097bbf33cb2af0000000000000000000005d9;

    constructor(IBalancerVault _balancerVault) {
        balancerVault = _balancerVault;
    }

    function addLiquidityBalancer(
        uint amount0,
        uint amount1,
        address receiver
    ) external returns (uint256) {
        uint256 amount0ToMint = amount0;
        uint256 amount1ToMint = amount1;

        // Approve the position manager
        TransferHelper.safeApprove(
            GHO,
            address(nonfungiblePositionManager),
            amount0ToMint
        );
        TransferHelper.safeApprove(
            USDC,
            address(nonfungiblePositionManager),
            amount1ToMint
        );

        IBalancerVault.JoinPoolParams memory params = IBalancerVault
            .JoinPoolParams({
                poolId: CURVE_POOL_ID,
                sender: msg.sender,
                recipient: msg.sender,
                assets: [GHO, USDC],
                maxAmountsIn: [amount0ToMint, amount1ToMint],
                userData: abi.encode(receiver), // TBH NOTE
                fromInternalBalance: false
            });

        // Note that the pool defined by DAI/USDC and fee tier 0.3% must already be created and initialized in order to mint
        balancerVault.joinPool(
            params.poolId,
            params.sender,
            params.recipient,
            IBalancerVault.JoinPoolRequest({
                assets: params.assets,
                maxAmountsIn: params.maxAmountsIn,
                userData: params.userData,
                fromInternalBalance: params.fromInternalBalance
            })
        );

        // // Remove allowance and refund in both assets.
        // if (amount0 < amount0ToMint) {
        //     TransferHelper.safeApprove(
        //         GHO,
        //         address(nonfungiblePositionManager),
        //         0
        //     );
        //     uint256 refund0 = amount0ToMint - amount0;
        //     TransferHelper.safeTransfer(GHO, msg.sender, refund0);
        // }

        // if (amount1 < amount1ToMint) {
        //     TransferHelper.safeApprove(
        //         USDC,
        //         address(nonfungiblePositionManager),
        //         0
        //     );
        //     uint256 refund1 = amount1ToMint - amount1;
        //     TransferHelper.safeTransfer(USDC, msg.sender, refund1);
        // }
    }

    function removeLiquidityBalancer(address receiver) external {
        // Note that the pool defined by DAI/USDC and fee tier 0.3% must already be created and initialized in order to mint

        IBalancerVault.ExitPoolParams memory params = IBalancerVault
            .ExitPoolParams({
                poolId: CURVE_POOL_ID,
                sender: msg.sender,
                recipient: msg.sender,
                assets: [GHO, USDC],
                minAmountsOut: [0, 0],
                userData: abi.encode(receiver), // TBH NOTE
                toInternalBalance: false
            });

        balancerVault.exitPool(
            params.poolId,
            params.sender,
            params.recipient,
            IBalancerVault.ExitPoolRequest({
                assets: params.assets,
                minAmountsOut: params.minAmountsOut,
                userData: params.userData,
                toInternalBalance: params.toInternalBalance
            })
        );
    }
}
