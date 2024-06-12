'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { useAuth } from '../../../context/Auth'

const ChartList = dynamic(() => import('@/components/pages/chart/ChartList'), { ssr: false })

const Page = () => {
  const { isAuthenticated } = useAuth()
  return (
    <>
      {isAuthenticated && <ChartList />}
    </>
  )
}

export default Page
