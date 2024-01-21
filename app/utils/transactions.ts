import { ethers } from "ethers";
import request from "request-promise-native";
import { ABI } from "../constants/GHOTokenABI";
import { parseEther } from "viem";

export const fetchUserTransactions = async (
  Address: `0x${string}` | undefined
) => {
  try {
    const abi = ABI;
    const contractAddress = "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60";
    const contractStartBlock = 1; // deployment block of the contract, to avoid filtering from genesis block
    const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
    const userAddress = Address;

    const baseUrl = "https://api-sepolia.etherscan.io/api/";
    const contractInterface = new ethers.utils.Interface(abi);
    let page = 1;
    let blockNumber = "latest";
    const PAGE_SIZE = 1000;

    const options = {
      url: `${baseUrl}`,
      qs: {
        module: "account",
        action: "txlist",
        address: contractAddress,
        startblock: contractStartBlock,
        endblock: blockNumber,
        page: page,
        sort: "asc",
        apikey: ETHERSCAN_API_KEY,
      },
      json: true,
    };
    console.log(options);
    const response = await request(options);

    const transactionsArray = [];

    for (const tx of response.result) {
      if (tx.from.toLowerCase() === userAddress?.toLowerCase()) {
        try {
          const decodedData = await contractInterface.decodeFunctionData(
            tx.input.slice(0, 10),
            tx.input
          );
          console.log(`Transaction Hash: ${tx.hash}`);
          console.log(`From: ${tx.from}`);
          console.log(`To: ${decodedData.to}`);
          console.log(`Value: ${tx.value}`);
          console.log(
            `Amount `,
            (parseInt(decodedData.amount._hex) / 1e18).toString()
          );
          const transactionHash = await tx.hash;
          const senderAddress = await tx.from;
          const recipientAddress = await decodedData.to;
          const transactionValue = await tx.value;
          const transactionAmount = await decodedData.amount._hex;
          const transactionObject =  {
            transactionHash: transactionHash,
            senderAddress: senderAddress,
            recipientAddress: recipientAddress,
            transactionValue: transactionValue,
            transactionAmount: transactionAmount,
          };
          await transactionsArray.push(transactionObject);
          return await transactionsArray;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No transactions found");
      }
    }

    let shouldBreak = false;
    if (response.result.length < PAGE_SIZE) {
      shouldBreak = true;
    } else {
      page += 1;
    }
    if (shouldBreak) {
      return;
    }
    return;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPremiumTransaction = async (
  Address: `0x${string}`,
  Premium: number
) => {
  try {
    const abi = ABI;
    const contractAddress = "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60";
    const contractStartBlock = 1; // deployment block of the contract, to avoid filtering from genesis block
    const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
    const userAddress = Address;

    const baseUrl = "https://api-sepolia.etherscan.io/api/";
    const contractInterface = new ethers.utils.Interface(abi);
    let page = 1;
    let blockNumber = "latest";
    const PAGE_SIZE = 1000;

    const options = {
      url: `${baseUrl}`,
      qs: {
        module: "account",
        action: "tokentx",
        contractaddress: contractAddress,
        address: Address,
        startblock: contractStartBlock,
        endblock: blockNumber,
        page: page,
        sort: "asc",
        apikey: ETHERSCAN_API_KEY,
      },
      json: true,
    };
    console.log(options);
    const response = await request(options);
    console.log(response);
    const premiumValue = parseEther(Premium.toString());
    console.log(premiumValue);

    for (const tx of response.result) {
      if (tx.value === `${premiumValue}`) {
        try {
          // const decodedData = await contractInterface.decodeFunctionData(
          //   tx.input.slice(0, 10),
          //   tx.input
          // );
          // console.log(`Transaction Hash: ${tx.hash}`);
          // console.log(`From: ${tx.from}`);
          // console.log(`To: ${decodedData.to}`);
          // console.log(`Value: ${tx.value}`);
          // console.log(
          //   `Amount `,
          //   (parseInt(decodedData.amount._hex) / 1e18).toString()
          // );
          const transactionHash = await tx.hash;
          const senderAddress = await tx.from;
          const recipientAddress = await tx.to;
          const transactionValue = await tx.value;

          const txTime = await tx.timeStamp;
          return {
            transactionHash,
            senderAddress,
            recipientAddress,
            transactionValue,
            txTime,
          };
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No transactions found");
      }
    }

    let shouldBreak = false;
    if (response.result.length < PAGE_SIZE) {
      shouldBreak = true;
    } else {
      page += 1;
    }
    if (shouldBreak) {
      return;
    }
    return;
  } catch (error) {
    console.log(error);
  }
};
