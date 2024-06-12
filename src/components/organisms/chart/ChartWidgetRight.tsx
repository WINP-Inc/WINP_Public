import BaseWidget from '@/components/molecules/widget/base-layout/BaseWidget'
import { WidgetHeader } from '@/components/molecules/widget/base-layout/WidgetHeader'
import { IndicatorsTable } from '@/components/molecules/widget/right/global-indicators/IndicatorsTable'
import Image from 'next/image'
import React, { memo } from 'react'
import { styled } from 'styled-components'
import useFetchGlobalIndicator from '../../../../hooks/globalindicator/fetchGlobalIndicator'
import FearAndGreed from './fear-and-greed/FearAndGreed'

const WidgetContainer = styled.div`
  width: 30%;
`

const ChartContainer = styled.div`
  margin-bottom: 30px;
`;

const ChartWidgetRight = memo(() => {
  const { assets } = useFetchGlobalIndicator();
  return (
    <WidgetContainer>
      <ChartContainer>
        <FearAndGreed />
      </ChartContainer>
      <BaseWidget hasSeeAll={true} transition='/home/global-indicator'>
        <WidgetHeader title='GLOBAL INDICATORS' />
        <IndicatorsTable assets={assets} />
      </BaseWidget>
    </WidgetContainer>
  )
})

ChartWidgetRight.displayName = 'ChartWidgetRight'

export default ChartWidgetRight
