import React, { FC } from 'react'
import styled from 'styled-components'
import BaseSlickSlider from '../utils/BaseSlickSlider'
import MarketSalesNFTItem from '@/components/molecules/market/MarketSalesNFTItem'
import MarketDetailLink from '@/components/atoms/market/MarketDetailLink'

const MarketSalesItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const SalesItemHeader = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 16px 1px;
  border-bottom: 1px solid #767380;

  h3 {
    color: #FFF;
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`

const SalesSliderContainer = styled.div``

interface SaleItemType {
  title: string;
  price: number;
  image: string;
  floorPrice: number;
}

interface SalesItemType {
  title: string;
  saleItems?: SaleItemType[] | null;
}

interface MarketSalesItemProps {
  salesItem: SalesItemType;
}

const MarketSalesItem: FC<MarketSalesItemProps> = ({ salesItem }) => {
  const sliderSettings = {
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
  }

  return (
    <MarketSalesItemWrapper>
      <SalesItemHeader>
        <h3>{salesItem.title}</h3>
      </SalesItemHeader>
      <SalesSliderContainer>
        {salesItem.saleItems && (
          <BaseSlickSlider settings={sliderSettings}>
            {salesItem.saleItems.map((saleItem) => (
              <MarketSalesNFTItem
                key={saleItem.title}
                title={saleItem.title}
                price={saleItem.price}
                image={saleItem.image}
                floorPrice={saleItem.floorPrice}
              />
            ))}
          </BaseSlickSlider>
        )}
      </SalesSliderContainer>
      <MarketDetailLink href='/home' />
    </MarketSalesItemWrapper>
  )
}

export default MarketSalesItem
