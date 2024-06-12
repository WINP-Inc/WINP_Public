import SearchInput from '@/components/molecules/header/middle/SearchInput'
import TimeWithReloadButton from '@/components/molecules/home/global-indicator/TimeWithReloadButton'
import { IndicatorsTable } from '@/components/molecules/widget/right/global-indicators/IndicatorsTable'
import BaseLayout from '@/components/templates/BaseLayout'
import { headerNavOptions } from '@/components/templates/header/customHeaderNav'
import React from 'react'
import styled from 'styled-components'
import useFetchGlobalIndicator from '../../../../../hooks/globalindicator/fetchGlobalIndicator'

const GlobalIndicatorWrapper = styled.div`
  width: 643px;
  margin: 33px auto;
`

const GlobalIndicatorHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const GlobalIndicatorTitleArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  h1 {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    line-height: normal;
  }

  div {
    margin-left: auto;
  }
`

const GlobalIndicatorBody = styled.div`
  margin-top: 18px;
`

const GlobalIndicator = () => {
  const { filteredAssets, searchText, handleSearchChange, getFilteredAssets } = useFetchGlobalIndicator();

  return (
    <BaseLayout headerNavList={[
      headerNavOptions.homeActive.navItem(),
      headerNavOptions.chart.navItem(),
      headerNavOptions.liveComm.navItem(),
      headerNavOptions.market.navItem(),
    ]}>
      <GlobalIndicatorWrapper>
        <GlobalIndicatorHeader>
          <GlobalIndicatorTitleArea>
            <h1>Global Indicators</h1>
            <div>
              <TimeWithReloadButton time='14:02:12' description='Last updated on' />
            </div>
          </GlobalIndicatorTitleArea>
          <SearchInput onClick={getFilteredAssets} value={searchText} onChange={handleSearchChange} width='100%' radius='8px' />
        </GlobalIndicatorHeader>
        <GlobalIndicatorBody>
          <IndicatorsTable assets={filteredAssets} />
        </GlobalIndicatorBody>
      </GlobalIndicatorWrapper>
    </BaseLayout>
  )
}

export default GlobalIndicator
