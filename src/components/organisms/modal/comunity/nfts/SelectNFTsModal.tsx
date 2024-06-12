import BaseModal, { modalStyle } from '@/components/atoms/modal/BaseModal';
import BaseAuthAccountModal from '@/components/templates/auth/modal/BaseAuthAccountModal';
import { AuthModalStyle } from '@/components/templates/auth/modal/BaseAuthStyleModal';
import Image from 'next/image';
import React, { FC, memo, useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { useNFTTransaction } from '../../../../../../context/nft/NFTTransaction';
import { NFTCollectionDataType, NFTItemType } from '@/types/post/nfts/NFTTransactionType';
import { usePost } from '../../../../../../context/Post';

const ModalHeader = styled.div`
  position: relative;
  margin-bottom: 20px;
  text-align: center;

  .select-nft-arrow {
    cursor: pointer;
    font-size: 26px;
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .close-modal-btn {
    position: absolute;
    cursor: pointer;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  span {
    font-size: 20px;
    font-weight: 600;
    line-height: normal;
    display: block;
    padding-left: 10px;
  }
`;

const ModalBody = styled.div`
  margin-bottom: 32px;
  height: 412px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`

const ModalBodyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`

const NFTItemWrapper = styled.div`
  text-align: left;
  max-width: 136px;
  span {
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    display: block;
    padding-left: 10px;
    word-break: break-all;
  }
`

const NFTImage = styled.div`
  width: 136px;
  height: 136px;
  margin-bottom: 8px;
  border-radius: 30px;
  cursor: pointer;

  img {
    position: static !important;
    border-radius: 30px;
    object-fit: cover;

    &:hover {
      border: solid 1px #8043F9;
    }
  }

  &.checked {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 10px;
      right: 8px;
      background: transparent url('/icons/teenyicons-tick-circle-solid.svg') no-repeat center center / cover;
      width: 15px;
      height: 15px;
      background-size: 15px;
      display: block;
    }
  }
`

const DefaultNFTImage = styled.div`
  background-color: #302A43;
  border-radius: 30px;
  width: 136px;
  height: 136px;

  &:hover {
    border: solid 1px #8043F9;
  }
`

const ModalFooter = styled.div`
  button {
    display: block;
    width: 100%;
    cursor: pointer;
    height: 52px;
    line-height: 52px;
    background: #8043F9;
    font-size: 14px;
    font-weight: 400;
    color: #FFF;
    border-radius: 100px;
    

    &:disabled {
      background: #302A43;

      &:hover {
        opacity: 1;
      }
    }

    &:hover {
      opacity: 0.8;
    }
  }
`

const CloseButton = styled.button`
  width: 44px;
  height: 44px;
  background: transparent url('/icons/basil-cross-solid.svg') no-repeat center center;
  cursor: pointer;
`;


interface SelectNFTsModalProps {
  callback?: (...params: any[]) => void;
}

const renderNFTItem = (item: NFTItemType | NFTCollectionDataType, handleNFTClick: any, type: 'collection' | 'nft') => (
  <NFTItemWrapper className='nft-product'>
    <NFTImage onClick={(e) => handleNFTClick(e, item)}>
      {item.metadata && item.metadata.image ? (
        <Image layout='fill' src={item.metadata.image as string} alt="nft-item" />
      ) : (
        <DefaultNFTImage />
      )}
    </NFTImage>
    <span>{type === 'collection' ? item.name : item.metadata?.name}</span>
  </NFTItemWrapper>
);

const SelectNFTsModal: FC<SelectNFTsModalProps> = memo(({ callback }) => {
  const {
    nftTransaction,
    nftItems,
    onSubmitNFTModal,
    isOpenBySelectedNFT,
    closeBySelectedNFT,
    backToPrevious,
    handleNFTClick,
    nftCollections,
    checkedNft,
    selectedModalType,
  } = useNFTTransaction();

  const { cleanupPost } = usePost();

  const handleNFTs = () => {
    const items = selectedModalType === 'collection' ? nftCollections : nftItems;
    return (
      items?.map((item: NFTItemType | NFTCollectionDataType, index: number) => {
        return (
          <React.Fragment key={index}>
            {renderNFTItem(item, handleNFTClick, selectedModalType)}
          </React.Fragment>
        );
      })
    );
  }

  const canceled = () => {
    cleanupPost();
    closeBySelectedNFT();
  }

  return (
    <BaseAuthAccountModal
      isOpen={isOpenBySelectedNFT}
      closeModal={canceled}
      width='663px'
    >
      <ModalHeader>
        {selectedModalType === 'nft' && (
          <div onClick={backToPrevious} className="select-nft-arrow">&lt;</div>
          )}
        <span>Your NFTs</span>
        <div className="close-modal-btn">
          <CloseButton onClick={canceled} />
        </div>
      </ModalHeader>
      <ModalBody>
        <ModalBodyContainer>
          {handleNFTs()}
        </ModalBodyContainer>
      </ModalBody>
      <ModalFooter>
        <button onClick={() => onSubmitNFTModal(callback)} disabled={!checkedNft}>
          Choose
        </button>
      </ModalFooter>
    </BaseAuthAccountModal>
  );
});

SelectNFTsModal.displayName = 'SelectNFTsModal';

export default SelectNFTsModal;
