// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

interface ICurvePool {
    function add_liquidity(
        uint256[2] memory _amounts,
        uint256 _min_mint_amount,
        address _receiver
    ) external returns (uint256);

    function remove_liquidity(
        uint256 _burn_amount,
        uint256[2] memory _min_amounts,
        address _receiver
    ) external returns (uint256[2] memory);
}
