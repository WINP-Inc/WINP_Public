'use client'

import React, { FC, useState } from "react"
import { usePost } from "../Post";
import { AirdropOptionsType } from "@/types/post/airdrop/airdropType";

interface AirdropContextType {
  airdropUrl: string;
  isFree: boolean;
  costValue: number;
  referralCode: string;
  distributionQuantity: number;
  eventDate: string;
  setAirdropUrl: (url: string) => void;
  setIsFree: (value: boolean) => void;
  setCostValue: (value: number) => void;
  setReferralCode: (code: string) => void;
  setDistributionQuantity: (quantity: number) => void;
  setEventDate: (date: string) => void;
  airdropPost: (title: string, media: any, tags: string[], category: string) => void;
}

const AirdropContextDefaultValues: AirdropContextType = {
  airdropUrl: "",
  isFree: false,
  costValue: 0,
  referralCode: "",
  distributionQuantity: 0,
  eventDate: "",
  setAirdropUrl: () => { },
  setIsFree: () => { },
  setCostValue: () => { },
  setReferralCode: () => { },
  setDistributionQuantity: () => { },
  setEventDate: () => { },
  airdropPost: () => { }
}

const AirdropContext = React.createContext<AirdropContextType>(AirdropContextDefaultValues);

export function useAirdrop() {
  return React.useContext(AirdropContext);
}

interface Props {
  children: React.ReactNode;
}
export const AirdropOptionsProvider: FC<Props> = ({ children }) => {
  const [airdropUrl, setAirdropUrl] = useState<string>("");
  const [isFree, setIsFree] = useState(false);
  const [costValue, setCostValue] = useState(0);
  const [referralCode, setReferralCode] = useState<string>("");
  const [distributionQuantity, setDistributionQuantity] = useState<number>(0);
  const [eventDate, setEventDate] = useState<string>("");
  const { createPost, setError } = usePost();

  const airdropPost = (title: string, media: any, tags: string[], category: string) => {
      const airdropOptions: AirdropOptionsType = {
        airdropUrl,
        cost: {
          isFree,
          value: !isFree ? costValue : 0
        },
        referralCode,
        distributionQuantity,
        eventDate
      }
      if (airdropOptions.airdropUrl && airdropOptions.distributionQuantity, airdropOptions.eventDate) {
        createPost(title, media, tags, category, null, null, airdropOptions);
        cleanupPost();
      } else {
        setError('failed to create airdrop post');
      }
    
  }

  const cleanupPost = () => {
    setAirdropUrl("");
    setIsFree(false);
    setCostValue(0);
    setReferralCode("");
    setDistributionQuantity(0);
    setEventDate("");
  }

  return (
    <AirdropContext.Provider
      value={{
        airdropUrl,
        isFree,
        costValue,
        referralCode,
        distributionQuantity,
        eventDate,
        setAirdropUrl,
        setIsFree,
        setCostValue,
        setReferralCode,
        setDistributionQuantity,
        setEventDate,
        airdropPost
      }}
    >
      { children }
    </AirdropContext.Provider>
  )
} 