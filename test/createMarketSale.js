const { ethers } = require('ethers');
const { expect } = require("chai");

const NFTMarketplace = require('../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json');

describe('create market sale', () => {
  let providerUrl,
      contractABI,
      provider,
      marketContractAddress,
      buyerAddress,
      sellerAddress,
      sellerSecret,
      salePrice,
      tokenURI;

  before(async () => {
    providerUrl = process.env.NEXT_PRIVATE_ALCHEMY_API_KEY_TESTNET;
    contractABI = NFTMarketplace.abi;
    marketContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    sellerAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    buyerAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
    sellerSecret = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
    provider = new ethers.providers.JsonRpcProvider();
    salePrice = ethers.utils.parseUnits('0.00001', 'ether')
    tokenURI = 'https://ipfs.moralis.io:2053/ipfs/bafkreic334a2b6737f4zlwqbnk3en2bc36zuaaiuzgnjq5ovgbjxbz5b4q'
  })

  it('Connect to ether testnet', async () => {
    const balance = await provider.getBalance(buyerAddress);
    console.log('Balance: ', ethers.utils.formatEther(balance));
  });

  it('get nfts', async () => {
    const contract = new ethers.Contract(marketContractAddress, contractABI, provider);
    const nfts = await contract.fetchMarketItems();
    for (const item of nfts) {
      console.log(item)
    }
  })

  it('test listing nft', async () => {
    const sellerWallet = new ethers.Wallet(sellerSecret, provider)
    const contractWithSeller = new ethers.Contract(marketContractAddress, contractABI, sellerWallet);
    const listingPrice = await contractWithSeller.getListingPrice();
    const transaction = await contractWithSeller.createToken(tokenURI, salePrice, { value: listingPrice });
    const txReceipt = await transaction.wait();
    const txCreatedEvent = txReceipt.events.find((e) => e.event === 'MarketItemCreated');
    const newTokenId = txCreatedEvent.args.tokenId.toString();
    const newPrice = txCreatedEvent.args.price / (10 ** 18);
    console.log(newPrice);
    console.log(newTokenId);
  });
})

// 