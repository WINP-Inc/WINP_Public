import MarketSales from '@/components/organisms/market/MarketSales'
import MarketSlider from '@/components/organisms/market/MarketSlider'
import MarketTrending from '@/components/organisms/market/MarketTrending'
import BaseLayout from '@/components/templates/BaseLayout'
import { headerNavOptions } from '@/components/templates/header/customHeaderNav'
import React from 'react'
import styled from 'styled-components'

const MarketWrapper = styled.div`
  margin-top: 34px;
`

const Market = () => {
  return (
    <BaseLayout
      headerNavList={[
        headerNavOptions.home.navItem(),
        headerNavOptions.chart.navItem(),
        headerNavOptions.liveComm.navItem(),
        headerNavOptions.marketActive.navItem(),
      ]}
    >
      <MarketWrapper>
        <MarketSlider />
        <MarketTrending />
        <MarketSales />
      </MarketWrapper>
    </BaseLayout>
  )
}

export default Market
