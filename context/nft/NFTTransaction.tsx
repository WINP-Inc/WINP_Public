'use client'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useAuth } from '../Auth';
import { useModal } from '../../hooks/useModal';
import { ArticleOptions, NFTCollectionDataType, NFTItemType } from '@/types/post/nfts/NFTTransactionType';
import { formatDate } from '../../utils/formatter/formatDate';
import axiosInterceptor from '../../hooks/axiosInterceptor';
import { useAccount } from 'wagmi';
import { useWalletServices } from '../wallet/WalletConnect';

interface NFTTransactionContextType {
  nftTransaction: ArticleOptions | null;
  isVerified: boolean;
  checkedNft: boolean;
  selectedNftItem: NFTItemType | null;
  nftItems: NFTItemType[] | null;
  nftCollections: NFTCollectionDataType[] | null;
  isOpenBySelectedNFT: boolean;
  selectedModalType: 'collection' | 'nft';
  error: string | null;
  loading: boolean;
  handleShowNFT: () => void;
  handleNFTClick: (e: React.MouseEvent, nftItem: any) => void;
  closeBySelectedNFT: () => void;
  openBySelectedNFT: () => void;
  onSubmitNFTModal: (callback?: (...params: any[]) => void) => void;
  initializeNFTConfig: () => void;
  backToPrevious: () => void;
}

const NFTTransactionContextDefaultValues: NFTTransactionContextType = {
  nftTransaction: null,
  isVerified: false,
  checkedNft: false,
  selectedNftItem: null,
  nftItems: null,
  nftCollections: null,
  isOpenBySelectedNFT: false,
  selectedModalType: 'collection',
  error: null,
  loading: false,
  handleShowNFT: () => { },
  handleNFTClick: () => { },
  closeBySelectedNFT: () => { },
  openBySelectedNFT: () => { },
  onSubmitNFTModal: () => { },
  initializeNFTConfig: () => { },
  backToPrevious: () => { },
}

const NFTTransactionContext = React.createContext<NFTTransactionContextType>(NFTTransactionContextDefaultValues);

export function useNFTTransaction() {
  return React.useContext(NFTTransactionContext);
}

interface Props {
  children: React.ReactNode;
}

const NFTTransactionProvider: FC<Props> = ({ children }) => {
  const [nftTransaction, setNftTransaction] = useState<ArticleOptions | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [showNFT, setShowNFT] = useState(false);
  const [checkedNft, setCheckedNft] = useState(false);
  const [selectedNftItem, setSelectedNftItem] = useState<NFTItemType | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<NFTCollectionDataType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [nftItems, setNftItems] = useState<NFTItemType[]>([]);
  const [nftCollections, setNftCollections] = useState<NFTCollectionDataType[]>([]);
  const [selectedModalType, setSelectedModalType] = useState<'collection' | 'nft'>('collection');
  const {
    modalIsOpen: isOpenBySelectedNFT,
    openModal: openBySelectedNFT,
    closeModal: closeBySelectedNFT,
  } = useModal();
  const { userNetwork, userWalletAddress, isConnected } = useWalletServices();

  useEffect(() => {
    if (!isConnected || !userNetwork || !userWalletAddress) {
      return;
    }

    if (selectedModalType === 'collection') {
      getNFTCollectionsFromWallet(userWalletAddress, userNetwork);
    } else if (selectedModalType === 'nft') {
      getNftItemsFromWallet(userWalletAddress, userNetwork, selectedCollection?.tokenAddress as string);
    }
  }, [userNetwork, userWalletAddress, selectedModalType, isOpenBySelectedNFT])

  const clearAllNftSelections = useCallback(() => {
    document.querySelectorAll('.nft-product .checked').forEach(el => {
      el.classList.remove('checked');
      el.removeAttribute('id');
    });
  }, []);

  const initializeNFTConfig = useCallback(() => {
    clearAllNftSelections();
    setCheckedNft(false);
    setSelectedNftItem(null);
    setSelectedCollection(null);
    setSelectedModalType('collection');
    setNftItems([])
    setNftCollections([])
    setError(null);
    setLoading(false);
    setShowNFT(false);
    setNftTransaction(null);
  }, []);

  const handleNFTClick = useCallback((e: React.MouseEvent, item: NFTItemType | NFTCollectionDataType) => {
    e.preventDefault();
    if (e.currentTarget.classList.contains('checked')) {
      e.currentTarget.classList.remove('checked');
      setCheckedNft(false);

      if (selectedModalType === 'collection') {
        setSelectedCollection(null);
      } else if (selectedModalType === 'nft') {
        setSelectedNftItem(null);
      }
      return;
    }

    if (selectedModalType === 'collection') {
      setSelectedCollection(item as NFTCollectionDataType);
    } else if (selectedModalType === 'nft') {
      setSelectedNftItem(item as NFTItemType);
    }
    clearAllNftSelections();
    e.currentTarget.classList.add('checked');
    setCheckedNft(true);
  }, [selectedModalType]);

  /**
   * Get NFT collections from user wallet
   * - https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-nft-collections
   */
  const getNFTCollectionsFromWallet = useCallback(async (address: string, chain: string) => {
    try {
      setLoading(true);
      const response = await axiosInterceptor.get(`${process.env.NEXT_PUBLIC_API_URL}posts/get-collections?address=${address}&chain=${chain}`);
      console.log(response.data, 'response')
      if (response.data) {
        setNftCollections(response.data.result);
      }
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  }, [])

  /**
   * Get NFT transactions from user wallet
   * -  https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-nfts
   */
  const getNftItemsFromWallet = useCallback(async (address: string, chain: string, tokenAddress: string) => {
    try {
      setLoading(true);
      const response = await axiosInterceptor.get(`${process.env.NEXT_PUBLIC_API_URL}posts/get-nfts?address=${address}&chain=${chain}&tokenAddress=${tokenAddress}`);
      if (response.data) {
        console.log('get-nfts', response.data)
        setNftItems(response.data.result);
      }
      setLoading(false);
    } catch (error: any) {
      console.log(error.response.data);
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  }, [])

  const getNFTBoughtPrice = async () => {
    try {
      if (!selectedNftItem) {
        throw new Error('Invalid nft nft item');
      }
      const response = await axiosInterceptor.get(`${process.env.NEXT_PUBLIC_API_URL}posts/get-nft-boughtPrice?tokenAddress=${selectedNftItem.tokenAddress}&tokenId=${selectedNftItem.tokenId}&chain=${userNetwork}`);
      if (response.data) {
        return response.data.result;
      }
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        setError(error);
      }
    }
  }

  const articleVerification = () => {
    if (selectedNftItem && selectedNftItem.verified_collection && selectedNftItem.possible_spam === false) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }

  const backToPrevious = useCallback(() => {
    if (selectedModalType === 'nft') {
      setSelectedModalType('collection');
      clearAllNftSelections();
      setCheckedNft(false);
      setNftItems([])
    }
  }, [selectedModalType]);

  const onSubmitCollectionModal = () => {
    if (selectedModalType !== 'collection') {
      throw new Error('Invalid modal type');
    }
    setSelectedModalType('nft');
    clearAllNftSelections();
    setCheckedNft(false);
  }

  const onSubmitNFTSelection = async () => {
    if (selectedModalType !== 'nft') {
      throw new Error('Invalid modal type');
    }
    if (!selectedNftItem) {
      throw new Error('Invalid nft transaction');
    }
    const { boughtPrice, timeStamp } = await getNFTBoughtPrice();
    setNftTransaction({
      nftItem: selectedNftItem,
      boughtPrice: boughtPrice / 10 ** 18,
      blockTimestamp: formatDate(timeStamp),
      showNFT: false
    })
  }

  const onSubmitNFTModal = (callback?: any) => {
    if (selectedModalType === 'nft') {
      onSubmitNFTSelection();
      articleVerification();
      closeBySelectedNFT();
      initializeNFTConfig();
      callback && callback();
      return;
    } else if (selectedModalType === 'collection') {
      onSubmitCollectionModal();
      return;
    } else {
      throw new Error('Invalid modal type');
    }
  }

  const handleShowNFT = () => {
    setNftTransaction(prevState => {
      if (prevState) {
        return {
          ...prevState,
          showNFT: !prevState.showNFT
        }
      }
      return prevState;
    })
  }

  return (
    <NFTTransactionContext.Provider
      value={{
        nftTransaction,
        isVerified,
        checkedNft,
        selectedNftItem,
        nftItems,
        isOpenBySelectedNFT,
        selectedModalType,
        nftCollections,
        error,
        loading,
        handleShowNFT,
        handleNFTClick,
        closeBySelectedNFT,
        openBySelectedNFT,
        onSubmitNFTModal,
        initializeNFTConfig,
        backToPrevious,
      }}
    >
      {children}
    </NFTTransactionContext.Provider>
  )
}

export default NFTTransactionProvider
