'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const Settings = dynamic(() => import('@/components/pages/myprofile/Settings'), { ssr: false })

const page = () => {
  return (
    <Settings />
  )
}

export default page
