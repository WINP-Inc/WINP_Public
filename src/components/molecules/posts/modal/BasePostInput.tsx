import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components';
import media from 'styled-media-query'
import PostMedias from '../post-content/PostMedias';
import Image from 'next/image';
import { useNFTTransaction } from '../../../../../context/nft/NFTTransaction';
import { Slider } from '@/components/atoms/slider/Slider';
import { useFileUpload } from '../../../../../context/FileUpload';
import { mediaType } from '@/types/post/postType';

const PostContentWrapper = styled.div`
  width: 100%;
  background: #302A43;
  border-radius: 16px;
  padding: 12px;
  height: auto;
  position: relative;

  ${media.lessThan('medium')`
    margin-top: 0;
    min-height: 158px;
  `}
`
const MediaWrapper = styled.div`
  width: 100%;
  margin-bottom: 70px;

  img {
    object-fit: cover;
  }

  ${media.lessThan('medium')`
    height: auto;
    margin-bottom: 36px;
  `}
`;

const InputArea = styled.div`
  margin-bottom: 12px;
`

const InputText = styled.textarea`
  width: 100%;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
  padding: 12px;
  color: #fff;
  background-color: transparent;
  border: none;
  resize: none;
  height: 100px;
  outline: none;

  ${media.lessThan('medium')`
    padding: 4px;
  `}
`

const MediaButtons = styled.div`
  border-top: solid 1px rgb(149, 144, 164, .1);
  padding-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 20px;
  width: calc(100% - 22px);

  input[type='file'] {
    display: none;

    &::after {
      content: '';
      width: 100%;
    }
  }

  ${media.lessThan('medium')`
    width: 100%;
    position: absolute;
    bottom: 20px;
    right: 20px;
  `}
`

const MediaButtonsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;

  ${media.lessThan('medium')`
    display: none;
  `}
`

const AddMoreButtonWrapper = styled.label`
  display: flex;
  align-items: center;
  background: transparent;
  border-radius: 4px;
  border: 1px dashed #848E9C;
  padding: 6px 22px;
  cursor: pointer;
  gap: 8px;

  img {
    position: static !important;
    width: 20px !important;
    height: 20px !important;
  }

  span {
    color: #848E9C;
    display: inline-block;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`

const ShowMoreButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    color: #FFF;
    font-family: Poppins;
    font-size: 12.847px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`

const MediaButtonsRight = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  label {
    display: block;
    cursor: pointer;
  }

  img {
    width: 32px !important;
    height: 32px !important;
    position: static !important;
  }

  ${media.lessThan('medium')`
    margin-left: auto;

    img {
      width: 20px !important;
      height: 20px !important;
      position: static !important;
    }
  `}
`;

interface BasePostInputProps {
  mediaList: mediaType[];
  removeMedia: (e: any) => void;
  handleFileChange: (e: any) => void;
  title: string;
  handleChangeText: (e?: any) => void;
}

const BasePostInput: FC<BasePostInputProps> = ({ mediaList, handleFileChange, removeMedia, title, handleChangeText }) => {
  const { nftTransaction, handleShowNFT } = useNFTTransaction();

  return (
    <PostContentWrapper>
      <InputArea>
        <InputText placeholder='Type something..' onChange={handleChangeText} value={title} />
        <MediaWrapper>
          {
            mediaList.length > 0 && <PostMedias mediaList={mediaList} deleteIcon={true} deleteAction={(e) => removeMedia(e)} />
          }
        </MediaWrapper>
      </InputArea>
      <MediaButtons>
        <MediaButtonsLeft>
          <AddMoreButtonWrapper htmlFor='add_file'>
            <input type='file' id='add_file' onChange={handleFileChange} />
            <Image layout="fill" src='/icons/linear-video-audio-sound-gallery-add.svg' alt='add-image-icon' />
            <span>Add more</span>
          </AddMoreButtonWrapper>
          {nftTransaction?.nftItem && (
            <ShowMoreButtonWrapper>
              <span>Show NFT</span>
              <Slider checked={nftTransaction.showNFT} handleChange={handleShowNFT} />
            </ShowMoreButtonWrapper>
          )}
        </MediaButtonsLeft>
        <MediaButtonsRight>
          <label htmlFor='upload-video'>
            <Image layout="fill" alt='upload-video' src="/icons/linear-video-audio-sound-video-frame-play-horizontal.svg" />
            <input type="file" id="upload-video" onChange={handleFileChange} />
          </label>
          <label htmlFor='upload-image'>
            <Image layout="fill" alt='upload-image' src="/icons/image-square.svg" />
            <input type="file" id="upload-image" onChange={handleFileChange} />
          </label>
          <label htmlFor='upload-gif'>
            <Image layout="fill" alt='upload-gif' src="/icons/gif.svg" />
            <input type="file" id="upload-gif" />
          </label>
        </MediaButtonsRight>
      </MediaButtons>
    </PostContentWrapper>
  )
}

export default BasePostInput
