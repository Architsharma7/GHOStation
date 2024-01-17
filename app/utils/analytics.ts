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
import * as markets from "@bgd-labs/aave-address-book";

/*/ @dev:every method is performed for sepolia chain /*/

const provider = new ethers.providers.JsonRpcProvider(
  //   "https://eth-mainnet.public.blastapi.io"
  ""
);

const poolDataProviderContract = new UiPoolDataProvider({
  uiPoolDataProviderAddress: "0x25c682B532CFFDe7E2E657a4Dc9A277d87b5788C",
  provider,
  chainId: ChainId.sepolia,
});

const incentiveDataProviderContract = new UiIncentiveDataProvider({
  uiIncentiveDataProviderAddress: "0xA5c352032806D3F5935eEA7b67Dfe97eCfB0d7Cc",
  provider,
  chainId: ChainId.sepolia,
});

const ghoService = new GhoService({
  provider,
  uiGhoDataProviderAddress: "0xCC3B9A84d5AbC04fb73B2a8Fa67Be4335d55D594",
});

// market data method
const getMarketReserveData = async () => {
  const reserves = await poolDataProviderContract.getReservesHumanized({
    lendingPoolAddressProvider: "0x6861730cFf157d3Ef3Fe987f526Ec5e1235B2f45",
  });

  const reserveIncentives =
    await incentiveDataProviderContract.getReservesIncentivesDataHumanized({
      lendingPoolAddressProvider: "0x6861730cFf157d3Ef3Fe987f526Ec5e1235B2f45",
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
const getGHOReserveData = async (currentAccount: string) => {
  const ghoReserveData = await ghoService.getGhoReserveData();
  const ghoUserData = await ghoService.getGhoUserData(currentAccount);
  const formattedGhoReserveData = formatGhoReserveData({
    ghoReserveData,
  });

  console.log(formattedGhoReserveData);
  return formattedGhoReserveData;
};

// GHO user data method
const getGHOUserData = async (currentAccount: string) => {
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
const getUserSummary = async (currentAccount: string) => {
  const currentTimestamp = dayjs().unix();
  const reserves = await poolDataProviderContract.getReservesHumanized({
    lendingPoolAddressProvider: "0x6861730cFf157d3Ef3Fe987f526Ec5e1235B2f45",
  });
  const userReserves = await poolDataProviderContract.getUserReservesHumanized({
    lendingPoolAddressProvider: "0x6861730cFf157d3Ef3Fe987f526Ec5e1235B2f45",
    user: currentAccount,
  });

  const reserveIncentives =
    await incentiveDataProviderContract.getReservesIncentivesDataHumanized({
      lendingPoolAddressProvider: "0x6861730cFf157d3Ef3Fe987f526Ec5e1235B2f45", // Goerli GHO Market
    });

  const userIncentives =
    await incentiveDataProviderContract.getUserReservesIncentivesDataHumanized({
      lendingPoolAddressProvider: "0x6861730cFf157d3Ef3Fe987f526Ec5e1235B2f45", // Goerli GHO Market
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
};

export {
  getMarketReserveData,
  getGHOReserveData,
  getGHOUserData,
  getUserSummary,
};
