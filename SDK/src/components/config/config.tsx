// NOTE: modify this config Input data type according to the requirements

export type configDataType = {
  path: string;
  data: {
    contractAddress: string;
    tokenId?: string;
    amount?: number;
    attributes?: { value: string; trait_type: string }[];
  };
};

export type configType = configDataType[];
