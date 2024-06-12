import ChartItemCard from '@/components/molecules/chart/card/ChartItemCard';
import React, { FC, Suspense } from 'react'
import styled from 'styled-components'

const ChartItemListWrapper = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
`

interface ChartItemListProps {
  chartItems: ChartItemType[];
}

const ChartItemList: FC<ChartItemListProps> = React.memo(({ chartItems }) => {
  return (
    <ChartItemListWrapper>
      {
        chartItems.map((item, index) => {
          return (
            <ChartItemCard
              key={item.id}
              chartItem={item}
            />
          )
        })
      }
    </ChartItemListWrapper>
  )
})

ChartItemList.displayName = 'ChartItemList';

export default ChartItemList
