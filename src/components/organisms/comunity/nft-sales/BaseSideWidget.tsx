import styled from "styled-components";
import useTabModal from "../../../../../hooks/useTabModal";
import { useModal } from "../../../../../hooks/useModal";
import { FC, useEffect, useState } from "react";
import { useNFTTransaction } from "../../../../../context/nft/NFTTransaction";
import { useWalletServices } from "../../../../../context/wallet/WalletConnect";
import Image from "next/image";
import BaseTabMenu, { TabMenuItemType } from "@/components/molecules/home/BaseTabMenu";
import SelectPiceModal from "../../modal/comunity/nfts/SelectPriceModal";
import BidTabBySeller from "./BidTabBySeller";
import { useNFTSale } from "../../../../../context/nft/NFTAuction";
import SelectNFTsModal from "../../modal/comunity/nfts/SelectNFTsModal";
import ConfirmModalWithSelectedWalletsModal from "../../modal/comunity/nfts/ConfirmModalWitSelectWalletsModal";
import { useAuth } from "../../../../../context/Auth";
import BidTabBuyer from "./BidTabBuyer";

const CommunityChatContainer = styled.div`
  background: #261F32;
  border-radius: 20px;
  width: 100%;
  height: 85vh;
  position: relative;
`;

const ChatHeadWrapper = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: solid 1px #302A43;
`

const ChatHeadContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  justify-content: space-between;
  background: #261F32;
  border-radius: 20px;
`;

const ChatHeadLeft = styled.div``
const ChatHeadRight = styled.div``

const SearchInputArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  input[type="search"] {
    width: 230px;
    background-color: transparent;
    color: #726C86;
    font-size: 14px;
    font-weight: 400;
    border: none;
    outline: none;

    &::-webkit-search-cancel-button {
      display: none;
    }
  }

  span {
    display: block;
    width: 24px;
    height: 24px;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }

    img {
      position: static !important;
    }
  }
`;

const CaretDown = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;

  img {
    position: static !important;
  }
`
interface BaseSideWidgetProps {
  title?: string;
  children: React.ReactNode;
}

const BaseSideWidget: FC<BaseSideWidgetProps> = ({ title, children }) => {
  const { modalIsOpen: tabIsOpen, closeModal: closeTabModal, openTabModal, triggerPosition } = useTabModal();
  const { openBySelectedNFT, closeBySelectedNFT } = useNFTTransaction();
  const {
    openByPrice,
    isExhibition,
    exhibitedNFT,
    initConnectedFromSeller,
    seller,
  } = useNFTSale();
  const { userWalletAddress } = useWalletServices();
  const { user } = useAuth();

  const tabMenuItems: TabMenuItemType[] = [
    {
      title: 'User list'
    },
    {
      title: 'Sell NFT',
      action: () =>  {
        initConnectedFromSeller();
        closeTabModal();
      }
    }
  ]

  const renderBitTab = () => {
    if (isExhibition) {
      if (exhibitedNFT?.seller.userWalletAddress === userWalletAddress) {
        return <BidTabBySeller />
      } else {
        return <BidTabBuyer />
      }
    }
  }

  return (
    <CommunityChatContainer>
      <ChatHeadWrapper>
        <ChatHeadContainer>
          <ChatHeadLeft>
            <SearchInputArea>
              <span><Image layout='fill' src='/icons/MagnifyingGlass.svg' alt='search-icon' /></span>
              <input type="search" placeholder="Search for users" />
            </SearchInputArea>
          </ChatHeadLeft>
          <ChatHeadRight>
            <CaretDown onClick={openTabModal}><Image layout='fill' src='/icons/CaretDown.svg' alt='care-down-icon' /></CaretDown>
            <BaseTabMenu isOpen={tabIsOpen} closeModal={closeTabModal} items={tabMenuItems} position={triggerPosition} />
          </ChatHeadRight>
        </ChatHeadContainer>
      </ChatHeadWrapper>
      {isExhibition && renderBitTab()}
      { children }
      <SelectNFTsModal callback={() => {
        openByPrice();
        closeBySelectedNFT();
      }} />
      <ConfirmModalWithSelectedWalletsModal onAuthenticationComplete={openBySelectedNFT} />
      <SelectPiceModal />
    </CommunityChatContainer>
  )
}

export default BaseSideWidget
