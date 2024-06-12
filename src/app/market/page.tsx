'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const Marketplace = dynamic(() => import('@/components/pages/market/Market'), { ssr: false })

const page = () => {
  return (
    <Marketplace />
  )
}

export default page
