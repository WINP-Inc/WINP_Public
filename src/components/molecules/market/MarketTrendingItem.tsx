import Image from 'next/image'
import React, { FC } from 'react'
import styled from 'styled-components'

const MarketTrendingItemWrapper = styled.div`
  border-radius: 4px;
  background: #27203D;
  cursor: pointer;

  &:hover {
    opacity: .9;
  }
`

const MarketTrendingItemContainer = styled.div`
  padding: 16px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const MarketItemLeft = styled.div`
  display: flex;
  align-items: center;
`
const MarketItemLeftHeader = styled.div`
  margin-right: 16px;

  span {
    color: #FFF;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
const MarketItemLeftBody = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const MarketItemLeftBodyImage = styled.div`
  width: 48px;
  height: 48px;

  img {
    position: static !important;
    border-radius: 4px;
  }
`

const MarketItemLeftBodyContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h3 {
    color: #FFF;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`

const MarketItemRight = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const PriceArea = styled.span`
  color: #FFF;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  .decorator {
    opacity: 0.5;
  }

  .percentage-green {
    color: #66E792;
    opacity: 1;
  }
`

interface MarketTrendingItemProps {
  id: number;
  image: string
  nftName: string
  price: number;
  floorPrice: number;
  percentage: number;
}

const MarketTrendingItem: FC<MarketTrendingItemProps> = ({ id, image, nftName, price, floorPrice, percentage }) => {
  return (
    <MarketTrendingItemWrapper>
      <MarketTrendingItemContainer>
        <MarketItemLeft>
          <MarketItemLeftHeader>
            <span>{id}</span>
          </MarketItemLeftHeader>
          <MarketItemLeftBody>
            <MarketItemLeftBodyImage>
              <Image layout='fill' src={image} alt={nftName} />
            </MarketItemLeftBodyImage>
            <MarketItemLeftBodyContent>
              <h3>{nftName}</h3>
              <PriceArea><span className="decorator">Floor</span> {floorPrice} <span className="decorator">ETH</span></PriceArea>
            </MarketItemLeftBodyContent>
          </MarketItemLeftBody>
        </MarketItemLeft>
        <MarketItemRight>
          <PriceArea>{price} <span className="decorator">ETH</span></PriceArea>
          <PriceArea><span className={`percentage-green`}>{percentage}%</span></PriceArea>
        </MarketItemRight>
      </MarketTrendingItemContainer>
    </MarketTrendingItemWrapper>
  )
}

export default MarketTrendingItem
