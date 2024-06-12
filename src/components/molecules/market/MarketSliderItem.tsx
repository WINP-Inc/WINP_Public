import React, { FC } from 'react'
import styled from 'styled-components'
import MarketSlider from '../../organisms/market/MarketSlider';

const MarketSliderItemWrapper = styled.div<{image: string}>`
  width: 380px;
  height: 280px;
  position: relative;
  background: url(${props => props.image}) no-repeat center center / cover;
  border-radius: 20px;
  z-index: 1;
  margin: 0 10px;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 50%, #000 100%);
  }
`

const MarketSliderItemContent = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 2;
`

const MarketSliderItemTitle = styled.div`
  margin-bottom: 4px;

  span {
    color: #FFF;
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`

const MarketSliderItemLabel = styled.div`
  border-radius: 4px;
  background: #8043F9;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 4px 8px;

  span {
    color: #FFF;
    font-family: Poppins;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`

const MarketSliderItemPrice = styled.div`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #8043F9;

  span {
    font-size: 12px;
    font-weight: 400;
    color: #fff;
    display: block;
  }
`;

interface MarketSliderItemProps {
  image: string
  nftName: string
  price: string
}

const MarketSliderItem: FC<MarketSliderItemProps> = ({ image, nftName, price }) => {
  return (
    <MarketSliderItemWrapper image={image}>
      <MarketSliderItemContent>
        <MarketSliderItemTitle>
          <span>{nftName}</span>
        </MarketSliderItemTitle>
        <MarketSliderItemLabel>
          <span>{price} ETH</span>
        </MarketSliderItemLabel>
      </MarketSliderItemContent>
    </MarketSliderItemWrapper>
  )
}

export default MarketSliderItem