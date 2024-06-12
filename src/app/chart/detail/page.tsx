'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { PricesProvider } from '../../../../context/prices'
import { useAuth } from '../../../../context/Auth'

const Chart = dynamic(() => import('@/components/pages/chart/Chart'), { ssr: false })

const Page = () => {
  const { isAuthenticated } = useAuth();
  return (
    <PricesProvider>
      {isAuthenticated && <Chart />}
    </PricesProvider>
  )
}

export default Page
