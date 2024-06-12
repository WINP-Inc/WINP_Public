import MarketDetailLink from '@/components/atoms/market/MarketDetailLink'
import MarketTrendingItem from '@/components/molecules/market/MarketTrendingItem'
import MarketTrendingSelector from '@/components/molecules/market/MarketTrendingSelector'
import React, { useState } from 'react'
import styled from 'styled-components'

const MarketTrendingWrapper = styled.div`
  margin-bottom: 75px;
`


const MarketTrendingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`

const MarketTrendingHeader = styled.div`
  padding-left: 3px;
  padding-bottom: 12px;
  border-bottom: 1px solid #767380;
  display: flex;
  align-items: center;
  gap: 36px;
`

const MarketTrendingHeaderItem = styled.div`
  cursor: pointer;
  position: relative;

  span {
    color: #767380;
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  &::after {
    content: '';
    position: absolute;
    width: calc(100% + 20px);
    height: 3px;
    left: -10px;
    bottom: -16px;
    background: transparent;
    transition: background 0.3s ease;
  }

  &.active {
    span {
      color: #8043F9;
    }

    &::after {
      background: #8043F9;
    }
  }
`

const MarketTrendingBody = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 16px;
  column-gap: 30px;
`

const TrendingSelectWrapper = styled.div`
  margin-left: auto;
`
const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: auto;
  margin-top: 14px;
`

const MarketTrending = () => {
  const [activeItem, setActiveItem] = useState('Trending');

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  }

  const marketTrendingList = [
    {
      nftTitle: 'Poopy Pants',
      price: 2.1,
      floor: 0.24,
      image: '/images/nft-default-image.png',
      percentage: 1.5
    },
    {
      nftTitle: 'Poopy Pants',
      price: 2.1,
      floor: 0.24,
      image: '/images/nft-default-image.png',
      percentage: 1.5
    },
    {
      nftTitle: 'Poopy Pants',
      price: 2.1,
      floor: 0.24,
      image: '/images/nft-default-image.png',
      percentage: 1.5
    },
    {
      nftTitle: 'Poopy Pants',
      price: 2.1,
      floor: 0.24,
      image: '/images/nft-default-image.png',
      percentage: 1.5
    },
    {
      nftTitle: 'Poopy Pants',
      price: 2.1,
      floor: 0.24,
      image: '/images/nft-default-image.png',
      percentage: 1.5
    },
    {
      nftTitle: 'Poopy Pants',
      price: 2.1,
      floor: 0.24,
      image: '/images/nft-default-image.png',
      percentage: 1.5
    },
    {
      nftTitle: 'Poopy Pants',
      price: 2.1,
      floor: 0.24,
      image: '/images/nft-default-image.png',
      percentage: 1.5
    },
    {
      nftTitle: 'Poopy Pants',
      price: 2.1,
      floor: 0.24,
      image: '/images/nft-default-image.png',
      percentage: 1.5
    },
    {
      nftTitle: 'Poopy Pants',
      price: 2.1,
      floor: 0.24,
      image: '/images/nft-default-image.png',
      percentage: 1.5
    },
  ]
  return (
    <MarketTrendingWrapper>
      <MarketTrendingContainer>
        <MarketTrendingHeader>
          <MarketTrendingHeaderItem onClick={() => handleItemClick('Trending')} className={activeItem === 'Trending' ? 'active' : ''}>
            <span>Trending</span>
          </MarketTrendingHeaderItem>
          <MarketTrendingHeaderItem onClick={() => handleItemClick('Latest')} className={activeItem === 'Latest' ? 'active' : ''}>
            <span>Latest</span>
          </MarketTrendingHeaderItem>
          <TrendingSelectWrapper>
            <MarketTrendingSelector />
          </TrendingSelectWrapper>
        </MarketTrendingHeader>
        <MarketTrendingBody>
          {marketTrendingList.map((item, index) => (
            <MarketTrendingItem
              key={index}
              id={index + 1}
              image={item.image}
              nftName={item.nftTitle}
              price={item.price}
              floorPrice={item.floor}
              percentage={item.percentage}
            />
          ))}
        </MarketTrendingBody>
      </MarketTrendingContainer>
      <LinkWrapper>
        <MarketDetailLink href='/home' />
      </LinkWrapper>
    </MarketTrendingWrapper>
  )
}

export default MarketTrending
