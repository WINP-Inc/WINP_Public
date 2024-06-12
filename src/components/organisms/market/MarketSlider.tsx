// @ts-nocheck
import MarketSliderItem from '@/components/molecules/market/MarketSliderItem'
import React from 'react'
import styled from 'styled-components'
import Slider from "react-slick";

const MarketSliderWrapper = styled.div`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 35px;
`

const MarketSlider = () => {
  const sliderList = [
    {
      image: '/images/nft-default-image.png',
      nftName: 'NFT Name',
      price: '0.0001',
    },
    {
      image: '/images/nft-default-image.png',
      nftName: 'NFT Name',
      price: '0.0001',
    },
    {
      image: '/images/nft-default-image.png',
      nftName: 'NFT Name',
      price: '0.0001',
    },
    {
      image: '/images/nft-default-image.png',
      nftName: 'NFT Name',
      price: '0.0001',
    },
    {
      image: '/images/nft-default-image.png',
      nftName: 'NFT Name',
      price: '0.0001',
    },
    {
      image: '/images/nft-default-image.png',
      nftName: 'NFT Name',
      price: '0.0001',
    },
    {
      image: '/images/nft-default-image.png',
      nftName: 'NFT Name',
      price: '0.0001',
    },
    {
      image: '/images/nft-default-image.png',
      nftName: 'NFT Name',
      price: '0.0001',
    },
    {
      image: '/images/nft-default-image.png',
      nftName: 'NFT Name',
      price: '0.0001',
    },
    {
      image: '/images/nft-default-image.png',
      nftName: 'NFT Name',
      price: '0.0001',
    },
  ]

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesPerRow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    variableWidth: true,
  };
  return (
    <MarketSliderWrapper className='slider-container'>
      <Slider {...settings}>
        {sliderList.map((item, index) => (
          <MarketSliderItem
            key={index}
            image={item.image}
            nftName={item.nftName}
            price={item.price}
          />
        ))}
      </Slider>
    </MarketSliderWrapper>
  )
}

export default MarketSlider