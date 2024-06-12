import Image from 'next/image'
import React, { FC, useState } from 'react'
import styled from 'styled-components'
import BaseBidTabWrapper from './BaseBidTabWrapper'
import { useNFTSale } from '../../../../../../context/nft/NFTAuction'
import { CircularProgress } from '@mui/material'

const ContentLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const ProductImage = styled.div`
  width: 93.807px;
  height: 67px;
  border-radius: 12px;
  
  img {
    position: static !important;
    border-radius: 12px;
    object-fit: cover;
  }
`

const BidArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;

  span {
    display: block;
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
  }
`

const ContentRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ControlTabButton = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;

  img {
    position: static !important;
    object-fit: cover;
  }
`;

const BidButton = styled.div`
  display: inline-flex;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`

const ButtonText = styled.span`
  color: #8043F9;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const ButtonLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    width: 20px !important;
    height: 20px !important;
  }
`

interface BaseBitTabProps {
  leftJsx?: JSX.Element;
  rightJsx?: JSX.Element;
}

export const BaseBidTab: FC<BaseBitTabProps> = ({ leftJsx, rightJsx }) => {

  return (
    <BaseBidTabWrapper>
      <ContentLeft>
        {leftJsx}
      </ContentLeft>
      <ContentRight>
        {rightJsx}
      </ContentRight>
    </BaseBidTabWrapper>
  )
}

export const BaseBidTabLeftFromNFTImageWithBidTitleArea = (props: {
  productImage?: string,
  topText?: string,
  bottomText?: string
}) => {
  const { productImage, topText, bottomText } = props;

  return (
    <>
      <ProductImage>
        <Image layout='fill' alt='product-image' src={productImage ? productImage : '/images/nft-default-image.png'} />
      </ProductImage>
      <BaseBidLeftFromBidTitleArea topText={topText} bottomText={bottomText} />
    </>
  )
}

export const BaseBidLeftFromBidTitleArea = (props: { topText?: string, bottomText?: string }) => {
  const { topText, bottomText } = props;

  return (
    <BidArea>
      <span>{topText}</span>
      <span>{bottomText}</span>
    </BidArea>
  )
}

export const BaseBidRightFromControlTabButton = (props: { closeTab?: () => void }) => {
  const { closeTab } = props;

  return (
    <>
      <ControlTabButton onClick={closeTab}>
        <Image layout='fill' alt='tab-menu-btn' src='/icons/control-tab-closed-btn.svg' />
      </ControlTabButton>
      <ControlTabButton>
        <Image layout='fill' alt='tab-menu-btn' src='/icons/control-tab-timer-btn.svg' />
      </ControlTabButton>
    </>
  )
}

export const BaseBidRightFromBidButton = (props: { bidAction: () => void, text?: string }) => {
  const { bidAction, text } = props;
  const { loading } = useNFTSale(); 

  return (
    <BidButton onClick={bidAction}>
      {loading ? <ButtonLoader><CircularProgress color='info' /></ButtonLoader> : <ButtonText>{text}</ButtonText>}
    </BidButton>
  )
}