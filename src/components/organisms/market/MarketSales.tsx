import React from 'react'
import styled from 'styled-components'
import MarketSalesItem from './MarketSalesItem'

const SalesWrapper = styled.div`
  margin-bottom: 103px;
`

const SalesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`

const marketSalesItems = [
  {
    title: 'On Sale',
    saleItems: [
      {
        title: 'NFT Name',
        price: 0.2,
        image: '/images/nft-default-image.png',
        floorPrice: 0.001,
      },
      {
        title: 'NFT Name',
        price: 0.2,
        image: '/images/nft-default-image.png',
        floorPrice: 0.001,
      },
      {
        title: 'NFT Name',
        price: 0.2,
        image: '/images/nft-default-image.png',
        floorPrice: 0.001,
      },
      {
        title: 'NFT Name',
        price: 0.2,
        image: '/images/nft-default-image.png',
        floorPrice: 0.001,
      },
      {
        title: 'NFT Name',
        price: 0.2,
        image: '/images/nft-default-image.png',
        floorPrice: 0.001,
      },
      {
        title: 'NFT Name',
        price: 0.2,
        image: '/images/nft-default-image.png',
        floorPrice: 0.001,
      },
    ]
  },
  {
    title: 'On Sale',
    saleItems: [
      {
        title: 'NFT Name',
        price: 0.2,
        image: '/images/nft-default-image.png',
        floorPrice: 0.001,
      },
      {
        title: 'NFT Name',
        price: 0.2,
        image: '/images/nft-default-image.png',
        floorPrice: 0.001,
      },
      {
        title: 'NFT Name',
        price: 0.2,
        image: '/images/nft-default-image.png',
        floorPrice: 0.001,
      },
      {
        title: 'NFT Name',
        price: 0.2,
        image: '/images/nft-default-image.png',
        floorPrice: 0.001,
      },
      {
        title: 'NFT Name',
        price: 0.2,
        image: '/images/nft-default-image.png',
        floorPrice: 0.001,
      },
      {
        title: 'NFT Name',
        price: 0.2,
        image: '/images/nft-default-image.png',
        floorPrice: 0.001,
      },
    ]
  },
  {
    title: 'On Sale',
    saleItems: [
      {
        title: 'NFT Name',
        price: 0.2,
        image: '/images/nft-default-image.png',
        floorPrice: 0.001,
      },
      {
        title: 'NFT Name',
        price: 0.2,
        image: '/images/nft-default-image.png',
        floorPrice: 0.001,
      },
      {
        title: 'NFT Name',
        price: 0.2,
        image: '/images/nft-default-image.png',
        floorPrice: 0.001,
      },
      {
        title: 'NFT Name',
        price: 0.2,
        image: '/images/nft-default-image.png',
        floorPrice: 0.001,
      },
      {
        title: 'NFT Name',
        price: 0.2,
        image: '/images/nft-default-image.png',
        floorPrice: 0.001,
      },
      {
        title: 'NFT Name',
        price: 0.2,
        image: '/images/nft-default-image.png',
        floorPrice: 0.001,
      },
    ]
  },
]

const MarketSales = () => {
  return (
    <SalesWrapper>
      <SalesContainer>
        {marketSalesItems.map((salesItem, index) => (
          <MarketSalesItem key={index} salesItem={salesItem} />
        ))}
      </SalesContainer>
    </SalesWrapper>
  )
}

export default MarketSales
