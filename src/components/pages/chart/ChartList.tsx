import BaseLayout from '@/components/templates/BaseLayout'
import HeadNavLayout from '@/components/templates/chart/HeadNavLayout'
import { headerNavOptions } from '@/components/templates/header/customHeaderNav'
import React, { Suspense, lazy } from 'react'
import styled from 'styled-components'

const ChartItemList = lazy(() => {
  return new Promise<{ default: React.ComponentType<{ chartItems: ChartItemType[] }> }>(resolve => {
    setTimeout(() => resolve(import('@/components/organisms/chart/ChartItemList')), 2000);
  });
});

const ChartListWrapper = styled.div`
  margin-top: 28px;
  margin-bottom: 110px;
  `

const metadataChartCardItems: ChartItemType[] = [
  {
    id: Math.random().toString(36).slice(2, 11),
    title: 'Bitcoin (BTC)',
    label: 'Prediction',
    icon: '/images/coin1.png',
    price: 1400,
    marketPrice: 1510,
    gapPrice: 100,
    href: '/chart/detail'
  },
  {
    id: Math.random().toString(36).slice(2, 11),
    title: 'Bitcoin (BTC)',
    label: 'Prediction',
    icon: '/images/coin2.png',
    price: 1400,
    marketPrice: 1510,
    gapPrice: 100,
    href: '/chart/detail'
  },
  {
    id: Math.random().toString(36).slice(2, 11),
    title: 'Bitcoin (BTC)',
    label: 'Prediction',
    icon: '/images/coin3.png',
    price: 1400,
    marketPrice: 1510,
    gapPrice: 100,
    href: '/chart/detail'
  },
  {
    id: Math.random().toString(36).slice(2, 11),
    title: 'Bitcoin (BTC)',
    label: 'Prediction',
    icon: '/images/coin4.png',
    price: 1400,
    marketPrice: 1510,
    gapPrice: 100,
    href: '/chart/detail'
  },
  {
    id: Math.random().toString(36).slice(2, 11),
    title: 'Bitcoin (BTC)',
    label: 'Prediction',
    icon: '/images/coin5.png',
    price: 1400,
    marketPrice: 1510,
    gapPrice: 100,
    href: '/chart/detail'
  },
  {
    id: Math.random().toString(36).slice(2, 11),
    title: 'Bitcoin (BTC)',
    label: 'Prediction',
    icon: '/images/coin6.png',
    price: 1400,
    marketPrice: 1510,
    gapPrice: 100,
    href: '/chart/detail'
  },
  {
    id: Math.random().toString(36).slice(2, 11),
    title: 'Bitcoin (BTC)',
    label: 'Prediction',
    icon: '/images/coin1.png',
    price: 1400,
    marketPrice: 1510,
    gapPrice: 100,
    href: '/chart/detail'
  },
  {
    id: Math.random().toString(36).slice(2, 11),
    title: 'Bitcoin (BTC)',
    label: 'Prediction',
    icon: '/images/coin2.png',
    price: 1400,
    marketPrice: 1510,
    gapPrice: 100,
    href: '/chart/detail'
  },
]

const ChartList = () => {
  return (
    <BaseLayout headerNavList={[
      headerNavOptions.home.navItem(),
      headerNavOptions.chartActive.navItem(),
      headerNavOptions.liveComm.navItem(),
      headerNavOptions.market.navItem(),
    ]}>
      <HeadNavLayout navIcon='/icons/sort-icon.svg' navTitle='Sort'>
        <ChartListWrapper>
          <Suspense fallback={<div>loading...</div>}>
            <ChartItemList chartItems={metadataChartCardItems} />
          </Suspense>
        </ChartListWrapper>
      </HeadNavLayout>
    </BaseLayout>
  )
}

export default ChartList
