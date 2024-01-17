import {
  formatReservesAndIncentives,
  formatGhoReserveData,
  formatGhoUserData,
  formatUserSummaryAndIncentives,
  formatUserSummaryWithDiscount,
} from "@aave/math-utils";
import dayjs from "dayjs";
import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import {
  UiPoolDataProvider,
  UiIncentiveDataProvider,
  ChainId,
  GhoService,
} from "@aave/contract-helpers";

/*/ @dev:every method is performed for sepolia chain /*/

const provider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_RPC_URL
);

const poolDataProviderContract = new UiPoolDataProvider({
  uiPoolDataProviderAddress: "0x69529987FA4A075D0C00B0128fa848dc9ebbE9CE",
  provider,
  chainId: ChainId.sepolia,
});

const incentiveDataProviderContract = new UiIncentiveDataProvider({
  uiIncentiveDataProviderAddress: "0xBA25de9a7DC623B30799F33B770d31B44c2C3b77",
  provider,
  chainId: ChainId.sepolia,
});

const ghoService = new GhoService({
  provider,
  uiGhoDataProviderAddress: "0x69B9843A16a6E9933125EBD97659BA3CCbE2Ef8A",
});

// market data method
const getMarketReserveData = async () => {
  const reserves = await poolDataProviderContract.getReservesHumanized({
    lendingPoolAddressProvider: "0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A",
  });

  const reserveIncentives =
    await incentiveDataProviderContract.getReservesIncentivesDataHumanized({
      lendingPoolAddressProvider: "0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A",
    });

  const reservesArray = reserves.reservesData;
  const baseCurrencyData = reserves.baseCurrencyData;

  const currentTimestamp = dayjs().unix();

  const formattedPoolReserves = await formatReservesAndIncentives({
    reserves: reservesArray,
    currentTimestamp,
    marketReferenceCurrencyDecimals:
      baseCurrencyData.marketReferenceCurrencyDecimals,
    marketReferencePriceInUsd:
      baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    reserveIncentives: reserveIncentives,
  });

  console.log(formattedPoolReserves);
  return formattedPoolReserves;
};

// GHO reserve data method
const getGHOReserveData = async () => {
  const ghoReserveData = await ghoService.getGhoReserveData();
  const formattedGhoReserveData = formatGhoReserveData({
    ghoReserveData,
  });

  console.log(formattedGhoReserveData);
  return formattedGhoReserveData;
};

// GHO user data method
const getGHOUserData = async (currentAccount: `0x${string}`) => {
  const ghoReserveData = await ghoService.getGhoReserveData();
  const ghoUserData = await ghoService.getGhoUserData(currentAccount);
  const currentTimestamp = dayjs().unix();

  const formattedGhoUserData = formatGhoUserData({
    ghoReserveData,
    ghoUserData,
    currentTimestamp,
  });

  console.log(formattedGhoUserData);
  return formattedGhoUserData;
};

// user data method
const getUserSummary = async (currentAccount: `0x${string}`) => {
  const currentTimestamp = dayjs().unix();
  const reserves = await poolDataProviderContract.getReservesHumanized({
    lendingPoolAddressProvider: "0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A",
  });
  const userReserves = await poolDataProviderContract.getUserReservesHumanized({
    lendingPoolAddressProvider: "0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A",
    user: currentAccount,
  });

  const reserveIncentives =
    await incentiveDataProviderContract.getReservesIncentivesDataHumanized({
      lendingPoolAddressProvider: "0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A",
    });

  const userIncentives =
    await incentiveDataProviderContract.getUserReservesIncentivesDataHumanized({
      lendingPoolAddressProvider: "0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A",
      user: currentAccount,
    });

  const poolReserve = await getMarketReserveData();
  const userSummary = formatUserSummaryAndIncentives({
    currentTimestamp,
    marketReferencePriceInUsd:
      reserves.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    marketReferenceCurrencyDecimals:
      reserves.baseCurrencyData.marketReferenceCurrencyDecimals,
    userReserves: userReserves.userReserves,
    formattedReserves: poolReserve,
    userEmodeCategoryId: userReserves.userEmodeCategoryId,
    reserveIncentives: reserveIncentives,
    userIncentives: userIncentives,
  });

  let formattedUserSummary = userSummary;
  const ghoUserData = await getGHOUserData(currentAccount);
  // Factor discounted GHO interest into cumulative user fields
  if (ghoUserData.userDiscountedGhoInterest > 0) {
    const userSummaryWithDiscount = formatUserSummaryWithDiscount({
      userGhoDiscountedInterest: ghoUserData.userDiscountedGhoInterest,
      user: userSummary,
      marketReferenceCurrencyPriceUSD: Number(
        formatUnits(
          reserves.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
          6
        )
      ),
    });
    formattedUserSummary = {
      ...userSummary,
      ...userSummaryWithDiscount,
    };
  }
  console.log(formattedUserSummary);
  return formattedUserSummary;
};

export {
  getMarketReserveData,
  getGHOReserveData,
  getGHOUserData,
  getUserSummary,
};
