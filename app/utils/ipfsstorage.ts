import lighthouse from "@lighthouse-web3/sdk";

export const uploadProposal = async (obj: Object) => {
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
  const file = [new File([blob], "proposal.json")];
  const output = await lighthouse.upload(
    file,
    "685a8211.cacf55559b244372862ac7d68c56cba6",
    true,
    undefined
  );
  console.log(
    "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data[0].Hash
  );
  console.log(output);
  return output.data[0].Hash;
};

export const getFile = async (hash: string) => {
  const fileInfo = await lighthouse.getFileInfo(hash);
};

export const getFileContent = async (CID: string) => {
  fetch(`https://gateway.lighthouse.storage/ipfs/${CID}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.error("An error ocurred", err);
    });
};
