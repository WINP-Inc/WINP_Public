'use client'

const SearchResult = dynamic(() => import('@/components/pages/search/SearchResult'), { ssr: false });

import dynamic from 'next/dynamic';
import React from 'react'

const page = () => {
  return (
    <SearchResult />
  )
}

export default page
