import BaseContainer from '@/components/atoms/container/BaseContainer'
import React from 'react'
import { styled } from 'styled-components'
import ChartMainHead from './ChartMainHead'
import { ChartHeadDataType } from '@/types/chart/details/ChartType'
import MainChart from './charts/MainChart'

const ChartMainAreaWrapper = styled.div`
  display: block;
  width: 75%;
`

const ChartMainArea = () => {
  const chartHeadData: ChartHeadDataType = {
    title: 'Bitcoin',
    price: 19965.74,
    change_24h: {
      price: 1498.25,
      percentage: -6.98
    },
    maximumPrice: 21491.86,
    minimumPrice: 19965.74,
    volumeBTC: 715559.40,
    volumeUSDT: 14430472197.94
  }

  return (
    <ChartMainAreaWrapper>
      <BaseContainer width='100%' mb='25px'>
        <ChartMainHead chartHeadItem={chartHeadData} />
      </BaseContainer>
      <BaseContainer width='100%' mb='25px'>
        <MainChart />
      </BaseContainer>
    </ChartMainAreaWrapper>
  )
}

export default ChartMainArea
