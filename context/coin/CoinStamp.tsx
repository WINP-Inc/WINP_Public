'use client';
import { CoinStampTransactionType } from "@/types/post/coin/coinStamp";
import React, { ReactNode, useEffect, useState } from "react";
import axiosInterceptor from "../../hooks/axiosInterceptor";
import { formatDate } from "../../utils/formatter/formatDate";
import { mediaType } from "@/types/post/postType";
import { usePost } from "../Post";

type CoinStampContextType = {
  isApproved?: boolean;
  transactionAddress: string;
  currency: string;
  coinStampTransaction: CoinStampTransactionType | null;
  stampPost: (title: string, media: any, tags: string[], category: string) => void;
  handleCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleTransactionAddress: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getCoinStampTransaction: (currency: string, address: string) => void;
}

const CoinStampContextDefaultValues: CoinStampContextType = {
  isApproved: false,
  transactionAddress: "",
  currency: "eth",
  coinStampTransaction: null,
  stampPost: () => { },
  handleCurrency: () => { },
  handleTransactionAddress: () => { },
  getCoinStampTransaction: () => { },
}

const CoinStampContext = React.createContext<CoinStampContextType>(CoinStampContextDefaultValues);

export function useCoinStamp() {
  return React.useContext(CoinStampContext);
}

interface Props {
  children: ReactNode;
}

export const CoinStampProvider = ({ children }: Props) => {
  const [transactionAddress, setTransactionAddress] = useState<string>("");
  const [currency, setCurrency] = useState<string>("eth");
  const [coinStampTransaction, setCoinStampTransaction] = useState<CoinStampTransactionType | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [getTransactionError, setGetTransactionError] = useState<string | null>(null);
  const { createPost, setError, error } = usePost();

  useEffect(() => {
    if (!transactionAddress || !currency) return;
    getCoinStampTransaction(currency, transactionAddress);
  }, [transactionAddress, currency])

  useEffect(() => {
    if (!coinStampTransaction) return;
    if (coinStampTransaction?.boughtPrice && coinStampTransaction?.timeStamp) {
      setIsApproved(true);
    }
  }, [coinStampTransaction])

  const handleCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  }

  const handleTransactionAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionAddress(e.target.value);
  }

  const stampPost = (title: string, media: any, tags: string[], category: string) => {
    if (coinStampTransaction) {
      createPost(title, media, tags, category, coinStampTransaction, null, null)
    } else {
      setError('Invalid transaction address');
      return;
    }
    cleanupPost();
  }

  const cleanupPost = () => {
    setTransactionAddress("");
    setCurrency("eth");
    setCoinStampTransaction(null);
    setIsApproved(false);
    setError(null);
  }

  const getCoinStampTransaction = async (currency: string, address: string) => {
    try {
      const response = await axiosInterceptor.get(`${process.env.NEXT_PUBLIC_API_URL}posts/coin-stamp?chain=${currency}&address=${address}`);
      const result = response.data.result;
      const newTransaction = {
        transactionAddress: transactionAddress,
        currency: currency,
        boughtPrice: result?.price,
        timeStamp: formatDate(result?.timeStamp)
      }
      if (result) {
        setCoinStampTransaction(newTransaction);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CoinStampContext.Provider
      value={{
        isApproved,
        transactionAddress,
        currency,
        coinStampTransaction,
        stampPost,
        handleCurrency,
        handleTransactionAddress,
        getCoinStampTransaction,
      }}
    >
      {children}
    </CoinStampContext.Provider>
  )
}