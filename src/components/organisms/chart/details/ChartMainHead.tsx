import MarketDataTable from '@/components/molecules/chart/MarketDataTable'
import { ChartHeadDataType } from '@/types/chart/details/ChartType'
import Image from 'next/image'
import React, { FC } from 'react'
import { styled } from 'styled-components'

const MainHeadContainer = styled.div`
  padding: 15px 25px;
  display: flex;
  align-items: center;
  justify-content: start;
`


const MainTopArea = styled.div`
  font-family: Arial;

  a {
    display: flex;
    align-items: center;
    gap: 4px;

    span {
      color: #848E9C;
      font-size: 12px;
      text-decoration: underline;
      margin-left: 4px;
    }

    img {
      width: 15px !important;
      object-fit: cover;
      position: static !important;
    }
  }
`

const TopAreaTitle = styled.span`
  font-size: 18.961px;
  font-weight: 400;
  color: #EAECEF;
  display: block;
  margin-bottom: 5px;
`

const MiddleArea = styled.div`
  margin-left: 30px;
  font-family: Arial;

  span {
    display: block;
    &:first-child {
      color: #F6465D;
      font-size: 14.969px;
      font-family: Arial;
      margin-bottom: 3px;
      line-height: normal;
    }

    &:nth-child(2) {
      font-size: 10.978px;
      color: #EAECEF;
      font-weight: 400;
    }
  }
`;

const RightArea = styled.div`
  margin-left: 36px;
  width: 66%;
`

interface ChartMainHeadProps {
  chartHeadItem: ChartHeadDataType
}

const ChartMainHead: FC<ChartMainHeadProps> = ({ chartHeadItem }) => {
  return (
    <MainHeadContainer>
      <MainTopArea>
        <TopAreaTitle>{chartHeadItem.title}</TopAreaTitle>
        <a href="#">
          <Image layout="fill"  alt='link-icon' src='/icons/frame.svg' />
          <span>Bitcoin Price</span>
        </a>
      </MainTopArea>
      <MiddleArea>
        <span>{chartHeadItem.price.toLocaleString()}</span>
        <span>₦9,236,949.95</span>
      </MiddleArea>
      <RightArea>
        <MarketDataTable
          priceChange={{price: chartHeadItem.change_24h.price, percentage: chartHeadItem.change_24h.percentage}}
          minPrice={chartHeadItem.minimumPrice}
          maxPrice={chartHeadItem.maximumPrice}
          volumeBTC={chartHeadItem.volumeBTC}
          VolumeUSDT={chartHeadItem.volumeUSDT}
        />
      </RightArea>
    </MainHeadContainer>
  )
}

export default ChartMainHead
