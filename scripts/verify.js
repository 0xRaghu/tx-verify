const ethers = require("ethers");
const { JsonRpcProvider } = require("@ethersproject/providers");
const provider = new JsonRpcProvider(
  "https://goerli.infura.io/v3/d028da77a2d0449e9158478653484f60"
);

const func = async () => {
  const block = await provider.getBlockNumber(); // block number

  const blockData = await provider.getBlock(block);
  const tx = await provider.getTransaction(blockData.transactions[0]);
  const sig = {
    r: tx.r,
    s: tx.s,
    v: tx.v,
  };

  const baseTx = {
    to: tx.to,
    nonce: tx.nonce,
    data: tx.data,
    value: tx.value,
    gasLimit: tx.gasLimit,
    gasPrice: tx.gasPrice,
    chainId: tx.chainId,
  };
  const unsignedTx = ethers.utils.serializeTransaction(baseTx);
  const preimage = ethers.utils.keccak256(unsignedTx);
  const signerAddress = ethers.utils.recoverAddress(preimage, sig);
  console.log("Transaction from address: ", tx.from);
  console.log("Transaction Signed by: ", signerAddress);
};

func();
