import React, { useEffect } from 'react'
import BaseLayout, { BaseLayoutFlexBox } from '../../templates/BaseLayout'
import { styled } from 'styled-components'
import HeadNavLayout from '../../templates/chart/HeadNavLayout'
import ChartMainArea from '../../organisms/chart/details/ChartMainArea'
import { headerNavOptions } from '@/components/templates/header/customHeaderNav'
import { useRouter } from 'next/navigation'
import ChartWidgetRight from '@/components/organisms/chart/ChartWidgetRight'

const ChartLayoutFlexBox = styled(BaseLayoutFlexBox)``
const PageChartWrapper = styled.div`
  position: relative;
`

const Chart = () => {
  const router = useRouter();

  const redirectToChartItems = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push('/chart')
  }

  return (
    <PageChartWrapper id='llm-modal'>
      <BaseLayout headerNavList={[
        headerNavOptions.home.navItem(),
        headerNavOptions.chartActive.navItem(),
        headerNavOptions.liveComm.navItem(),
        headerNavOptions.market.navItem(),
      ]}>
        <HeadNavLayout navIcon='/icons/arrow-down.svg' navTitle='BitCoin' action={redirectToChartItems}>
          <ChartLayoutFlexBox>
            <ChartMainArea />
            <ChartWidgetRight />
          </ChartLayoutFlexBox>
        </HeadNavLayout>
      </BaseLayout>
    </PageChartWrapper>
  )
}

export default Chart
