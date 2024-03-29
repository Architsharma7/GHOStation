// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "./interfaces/ICurvePool.sol";

// https://curve.fi/#/ethereum/pools/factory-crvusd-8/deposit
// https://docs.uniswap.org/contracts/v3/guides/providing-liquidity/increase-liquidity
// https://etherscan.io/address/0x86152df0a0e321afb3b0b9c4deb813184f365ada#code

contract CurveMethods is IERC721Receiver {
    ICurvePool public immutable curvePool;

    address public immutable GHO;
    address public immutable USDC;

    // address public constant GHO = 0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f;
    // address public constant USDC = 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48;

    constructor(ICurvePool _curvePool, address token0, address token1) {
        curvePool = _curvePool;
        GHO = token0;
        USDC = token1;
    }

    function addLiquidityCurve(
        uint amount0,
        uint amount1,
        address receiver
    ) public returns (uint256) {
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

        // Note that the pool defined by DAI/USDC and fee tier 0.3% must already be created and initialized in order to mint
        (amount0, amount1) = curvePool.add_liquidity(
            [amount0ToMint, amount1ToMint],
            0,
            receiver
        );

        // Remove allowance and refund in both assets.
        if (amount0 < amount0ToMint) {
            TransferHelper.safeApprove(
                GHO,
                address(nonfungiblePositionManager),
                0
            );
            uint256 refund0 = amount0ToMint - amount0;
            TransferHelper.safeTransfer(GHO, msg.sender, refund0);
        }

        if (amount1 < amount1ToMint) {
            TransferHelper.safeApprove(
                USDC,
                address(nonfungiblePositionManager),
                0
            );
            uint256 refund1 = amount1ToMint - amount1;
            TransferHelper.safeTransfer(USDC, msg.sender, refund1);
        }
    }

    function removeLiquidityCurve(uint burn_amount, address receiver) public {
        // Note that the pool defined by DAI/USDC and fee tier 0.3% must already be created and initialized in order to mint
        (amount0, amount1) = curvePool.remove_liquidity(
            burn_amount,
            [0, 0],
            receiver
        );
    }
}
