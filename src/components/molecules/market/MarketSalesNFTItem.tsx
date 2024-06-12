import Image from 'next/image';
import React, { FC } from 'react'
import styled from 'styled-components';

interface MarketSalesNFTItemProps {
  title: string;
  price: number;
  image: string;
  floorPrice: number;
}

const SalesNFTItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 242px;
  margin: 0 10px;
  cursor: pointer;
`;

const ItemHeaderImage = styled.div`
  width: 100%;
  height: 160px;

  img {
    position: static !important;
    border-radius: 8px;
    object-fit: cover;
  }
`

const ItemBody = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
`

const ItemBodyLeft = styled.div`
  h3 {
    color: #FFF;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`

const ItemBodyRight = styled.div`
  margin-left: auto;
`

const PriceText = styled.span`
  color: #FFF;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  .decorator {
    opacity: 0.5;
  }
`

const MarketSalesNFTItem: FC<MarketSalesNFTItemProps> = ({ title, price, image, floorPrice }) => {
  return (
    <SalesNFTItemWrapper>
      <ItemHeaderImage>
        <Image layout='fill' alt={title} src={image} />
      </ItemHeaderImage>
      <ItemBody>
        <ItemBodyLeft>
          <h3>{title}</h3>
          <PriceText><span className="decorator">Vol</span> {price} ETH</PriceText>
        </ItemBodyLeft>
        <ItemBodyRight>
          <PriceText><span className="decorator">Floor</span> {floorPrice} ETH</PriceText>
        </ItemBodyRight>
      </ItemBody>
    </SalesNFTItemWrapper>
  )
}

export default MarketSalesNFTItem
