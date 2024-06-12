'use client';

import React, { FC, useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { NFTItemType } from "@/types/post/nfts/NFTTransactionType";
import { useWalletServices } from "../wallet/WalletConnect";
import { useAuth } from "../Auth";
import { UserType } from "@/types/user/UserType";
import { useNFTTransaction } from "./NFTTransaction";
import { ethers } from "ethers";
import Web3Modal from 'web3modal'
import NFTMarketplace from '../../NFTMarketplace.json';
import { listNFTForSale, succeedSale } from "../../hooks/useNFTSale";
import { useSocket } from "../Socket";
import { useLivestream } from "../Livestream";
import { useNetwork } from "wagmi";

interface NFTSaleContextType {
  isOpenByPrice: boolean;
  closeByPrice: () => void;
  openByPrice: () => void;
  seller: ExhibitedUserType | null;
  buyer: ExhibitedUserType | null;
  amountPrice: number;
  isExhibition: boolean;
  exhibitedNFT: ExhibitedNFTType | null;
  transactionResult: TransactionResultType | null;
  isSold: boolean;
  isBidding: boolean;
  loading: boolean;
  isButtonDisabled: boolean;
  setLoading: (loading: boolean) => void;
  setAmountPrice: (amount: number) => void;
  placeToAuction: () => void;
  cleanUpAuction: () => void;
  initConnectedFromSeller: () => void;
  initConnectedFromBuyer: () => void;
  buyNft: () => void;
}

const NFTSaleContextDefaultValues: NFTSaleContextType = {
  isOpenByPrice: false,
  closeByPrice: () => { },
  openByPrice: () => { },
  seller: null,
  buyer: null,
  amountPrice: 0,
  isExhibition: false,
  exhibitedNFT: null,
  transactionResult: null,
  isSold: false,
  isBidding: false,
  loading: false,
  isButtonDisabled: true,
  setLoading: () => { },
  setAmountPrice: () => { },
  placeToAuction: () => { },
  cleanUpAuction: () => { },
  initConnectedFromSeller: () => { },
  initConnectedFromBuyer: () => { },
  buyNft: () => { }
}

const NFTSaleContext = React.createContext<NFTSaleContextType>(NFTSaleContextDefaultValues);

export function useNFTSale() {
  return React.useContext(NFTSaleContext);
}

interface Props {
  children: React.ReactNode;
}

interface ExhibitedUserType {
  userWalletAddress: string | null;
  userNetworks: string | null;
  account: UserType;
}


export interface ExhibitedNFTType {
  nftItem: {
    tokenId: string;
    tokenURI: string;
    image: string;
    title: string;
  };
  amountPrice: number;
  isSold: boolean;
  seller: ExhibitedUserType;
}

export interface TransactionResultType {
  transactionHash: string;
  buyer: ExhibitedUserType;
  nftItem: {
    tokenId: string;
    tokenURI: string;
    image: string;
    title: string;
  },
  amountPrice: number;
}


export const NFTAuctionProvider: FC<Props> = ({ children }) => {
  const { modalIsOpen: isOpenByPrice, closeModal: closeByPrice, openModal: openByPrice } = useModal();
  const [amountPrice, setAmountPrice] = useState<number>(0);
  const [isExhibition, setIsExhibition] = useState(false);
  const [exhibitedNFT, setExhibitedNFT] = useState<ExhibitedNFTType | null>(null);
  const { isConnected, openByConnectedConfirmModal, userNetwork, userWalletAddress, initConnect } = useWalletServices();
  const [isSold, setIsSold] = useState(false);
  const [isBidding, setIsBidding] = useState(false);
  const { user } = useAuth();
  const [buyer, setBuyer] = useState<ExhibitedUserType | null>(null);
  const [seller, setSeller] = useState<ExhibitedUserType | null>(null);
  const { nftTransaction, initializeNFTConfig, openBySelectedNFT } = useNFTTransaction();
  const { socket } = useSocket();
  const { currentLiveStreamId } = useLivestream();
  const [loading, setLoading] = useState(false);
  const { chain } = useNetwork();
  const [transactionResult, setTransactionResult] = useState<TransactionResultType | null> (null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
  }, [exhibitedNFT])

  useEffect(() => {
    if (!amountPrice || amountPrice < 0.0001 || loading) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [loading, amountPrice])

  /**
 * Initializes the state of the auction.
 */
  const cleanUpAuction = () => {
    setIsExhibition(false);
    setExhibitedNFT(null);
    setAmountPrice(0);
    initializeNFTConfig();
    setIsSold(false);
    setIsBidding(false);
    setSeller(null);
    setBuyer(null);
  }

  /**
 * If a socket exists, it exhibits it when an NFT is listed.
 * It ends the exhibition when the socket is disconnected.
 */
  useEffect(() => {
    if (socket) {
      socket.on('nft-listed', (data: any) => {
        setExhibitedNFT(data.nftData);
        setIsExhibition(true)
      });

      socket.on('nft-sold', (data: any) => {
        setTransactionResult(data)
        setIsSold(true);
      })
    }

    return () => {
      if (socket) {
        socket.off('nft-listed');
        setIsExhibition(false);
        cleanUpAuction();
      }
    }
  }, [socket]);

  /**
 * If a seller is connected, it initializes the connection and opens by the selected NFT.
 * Otherwise, it opens the connection confirmation modal.
 */
  const initConnectedFromSeller = () => {
    if (isConnected) {
      initConnect();
      openBySelectedNFT();
    } else {
      openByConnectedConfirmModal();
    }
    setSeller({ account: user, userNetworks: userNetwork, userWalletAddress: userWalletAddress });
  }

  /**
 * If a buyer is connected, it initializes the connection and starts bidding.
 * Otherwise, it opens the connection confirmation modal.
 */
  const initConnectedFromBuyer = () => {
    if (isConnected) {
      initConnect();
      setIsBidding(true);
    } else {
      openByConnectedConfirmModal();
    }
    setBuyer({ account: user, userNetworks: userNetwork, userWalletAddress: userWalletAddress });
  }

  /**
 * Places to the auction.
 * Throws an error if the wallet is not connected, the wallet address or user network does not exist,
 * the price is not set, or the NFT is not selected.
 */
  const placeToAuction = async () => {
    try {
      if (!isConnected) {
        throw new Error('You must connect your wallet first');
      } else if (!userWalletAddress || !userNetwork) {
        throw new Error('You must connect your wallet first');
      } else if (!amountPrice) {
        throw new Error('You must set price');
      } else if (!nftTransaction?.nftItem) {
        console.log('nftTransaction: ', nftTransaction)
        throw new Error('You must select NFT');
      }

      await listingNFT();
      closeByPrice();
    } catch (error) {
      console.error(error, 'error')
    }
  }

  /**
 * Lists the NFT.
 * Throws an error if the NFT item is invalid or the price is invalid.
 */
  const listingNFT = async () => {
    try {
      setLoading(true);
      const nftItem = nftTransaction?.nftItem;
      if (!nftItem) {
        throw new Error('Invalid NFT Item');
      } else if (!amountPrice) {
        throw new Error('Invalid amountPrice');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();

      if (!chain) {
        alert('Invalid network');
        throw new Error('Invalid network');
      }

      if (chain.id !== network.chainId || userWalletAddress !== address) {
        alert('Invalid wallet address or network');
        throw new Error('Invalid wallet address or network');
      }
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MATIC as string, NFTMarketplace.abi, signer);
      const listingPrice = await contract.getListingPrice();
      const price = ethers.utils.parseEther(amountPrice.toString());
      const transaction = await contract.createToken(nftItem.tokenURI, price, { value: listingPrice });
      const txReceipt = await transaction.wait();
      const txCreatedEvent = txReceipt.events.find((e: any) => e.event === 'MarketItemCreated');
      const newTokenId = txCreatedEvent.args.tokenId.toString();
      const newPrice = txCreatedEvent.args.price / (10**18);
      await listNFTForSale({
        roomId: currentLiveStreamId,
        exhibitedNFT: {
          nftItem: {
            tokenId: newTokenId,
            tokenURI: nftItem.tokenURI,
            image: nftItem.metadata.image,
            title: nftItem.metadata.name
          },
          amountPrice: newPrice,
          isSold: false,
          seller: {
            account: user,
            userNetworks: userNetwork,
            userWalletAddress: userWalletAddress
          }
        },
      });
      setIsExhibition(true);
      setLoading(false);
    } catch (error) {
      console.error(error, 'error')
      setLoading(false);
    }
  }

  /**
 * Buys the NFT.
 */
  const buyNft = async () => {
    try {
      if (!exhibitedNFT) {
        throw new Error('Invalid NFT Item');
      }
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MATIC as string, NFTMarketplace.abi, signer)
      const configPrice = ethers.utils.parseEther(exhibitedNFT?.amountPrice.toString());
      const transaction = await contract.createMarketSale(exhibitedNFT?.nftItem.tokenId, { value: configPrice });
      const txReceipt =  await transaction.wait();
      console.log(txReceipt);
      if (txReceipt.transactionHash) {
        await succeedSale({
          roomId: currentLiveStreamId,
          transaction: {
            transactionHash: txReceipt.transactionHash,
            buyer: {
              account: user,
              userNetworks: network.name,
              userWalletAddress: address
            },
            nftItem: exhibitedNFT.nftItem,
            amountPrice: exhibitedNFT.amountPrice
          }
        })
        setLoading(false);
      } else {
        setLoading(false);
        throw new Error('Transaction failed');
      }
    } catch (error) {
      console.log(error, 'error')
      setLoading(false);
    }
  }

  return (
    <NFTSaleContext.Provider
      value={{
        isOpenByPrice,
        openByPrice,
        closeByPrice,
        seller,
        buyer,
        amountPrice,
        isExhibition,
        exhibitedNFT,
        transactionResult,
        isSold,
        isBidding,
        loading,
        isButtonDisabled,
        setLoading,
        setAmountPrice,
        placeToAuction,
        cleanUpAuction,
        initConnectedFromSeller,
        initConnectedFromBuyer,
        buyNft
      }}
    >
      {children}
    </NFTSaleContext.Provider>
  )
} 
