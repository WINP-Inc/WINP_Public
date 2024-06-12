'use client';

const GlobalIndicator = dynamic(() => import('@/components/pages/home/global-indicator/GlobalIndicator'), { ssr: false });

import dynamic from 'next/dynamic';
import React from 'react'
import { useAuth } from '../../../../context/Auth';

const Page = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated && <GlobalIndicator />}
    </>
  )
}

export default Page