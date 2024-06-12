import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'
import styled from 'styled-components'
import ToolTip from '../../tools/ToolTip';

const ChartItemWrapper = styled.li`
  width: calc(100% / 4 - 30px * 3 / 4);
  height: auto;
  border-radius: 12px;
  background: #261F32;

  a {
    color: #FFF;
    display: block;
    width: 100%;
    height: 100%;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

const ChartItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 35px 35px 35px;
`

const ItemTitleArea = styled.div`
  text-align: center;

  span {
    display: block;
    font-size: 22px;
    font-weight: 700;
    font-family: Inter;
  }
`
const ItemImageArea = styled.div`
  text-align: center;
  width: 140px;
  height: 140px;
  margin: 0 auto;

  img {
    position: static !important;
  }
`;

const ItemScoreArea = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ScoreHeadingArea = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-end;
`

const HeadItemScore = styled.span`
  font-family: Inter;
  font-size: 24px;
  font-weight: 700;
`

const ItemLabel = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
  border-radius: 4px;
  background: #30234B;
  padding: 4px 10px;
`

const ScoreBodyArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const BaseBodyItemPrice = styled.span`
  color: #FFF;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  line-height: normal;
`

const BodyItemPrice = styled(BaseBodyItemPrice)`
  font-weight: 700;
  margin-right: 12px;
`

const BodyItemPriceLabel = styled(BaseBodyItemPrice)`
  opacity: 0.75;
  font-weight: 400;
`;

const ScoreBodyItem = styled.div`
  display: flex;
  justify-content: space-between;
`

interface ChartItemCardProps {
  chartItem: ChartItemType
}

const ChartItemCard: FC<ChartItemCardProps> = ({ chartItem }) => {
  return (
    <ChartItemWrapper>
      <Link href={chartItem.href}>
        <ChartItemContainer>
          <ItemTitleArea>
            <span>{chartItem.title}</span>
          </ItemTitleArea>
          <ItemImageArea>
            <Image layout="fill" src={chartItem.icon}  alt='card-item-image' />
          </ItemImageArea>
          <ItemScoreArea>
            <ScoreHeadingArea>
              <HeadItemScore>${chartItem.price.toLocaleString()}</HeadItemScore>
              {chartItem.label && (
                <ToolTip description='This is the prediction price by AI computing.'>
                  <ItemLabel>{chartItem.label}</ItemLabel>
                </ToolTip>
              )}
            </ScoreHeadingArea>
            <ScoreBodyArea>
              <ScoreBodyItem>
                <BodyItemPriceLabel>Market Price:</BodyItemPriceLabel>
                <BodyItemPrice>${chartItem.marketPrice.toLocaleString()}</BodyItemPrice>
              </ScoreBodyItem>
              <ScoreBodyItem>
                <ToolTip description='The difference between AI-predicted price and current price'>
                  <BodyItemPriceLabel>Gap:</BodyItemPriceLabel>
                </ToolTip>
                <BodyItemPrice>${chartItem.gapPrice.toLocaleString()}</BodyItemPrice>
              </ScoreBodyItem>
            </ScoreBodyArea>
          </ItemScoreArea>
        </ChartItemContainer>
      </Link>
    </ChartItemWrapper>
  )
}

export default ChartItemCard
