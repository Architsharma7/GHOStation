// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "./interfaces/IBalancerVault.sol";

// https://etherscan.io/address/0xBA12222222228d8Ba445958a75a0704d566BF2C8#writeContract
// https://etherscan.io/address/0x8353157092ed8be69a9df8f95af097bbf33cb2af#writeContract
// https://app.balancer.fi/#/ethereum/pool/0x8353157092ed8be69a9df8f95af097bbf33cb2af0000000000000000000005d9

contract BalancerMethods is IERC721Receiver {
    IBalancerVault public immutable balancerVault;

    address public immutable GHO;
    address public immutable USDC;
    bytes32 public immutable CURVE_POOL_ID;

    // Mainnet GHO USDC
    // address public immutable GHO = 0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f;
    // address public immutable USDC = 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48;
    // bytes32 public immutable CURVE_POOL_ID =
    //     0x8353157092ed8be69a9df8f95af097bbf33cb2af0000000000000000000005d9;

    constructor(
        IBalancerVault _balancerVault,
        address token0,
        address token1,
        bytes32 poolId
    ) {
        balancerVault = _balancerVault;
        GHO = token0;
        USDC = token1;
        CURVE_POOL_ID = poolId;
    }

    function addLiquidityBalancer(
        uint amount0,
        uint amount1,
        address receiver
    ) public returns (uint256) {
        uint256 amount0ToMint = amount0;
        uint256 amount1ToMint = amount1;
        // NOTE might need to queryJoin first and then decide
        // Also maybe no token1 is needed

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
    }

    function removeLiquidityBalancer(address receiver) public {
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
