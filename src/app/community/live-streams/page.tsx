'use client'
import { useProtectedRoute } from '@/routes/protectedRoute'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { useAuth } from '../../../../context/Auth'

const CommunityHomeByStreaming = dynamic(() => import('../../../components/pages/community/live-streaming/CommunityHomeByStreaming'), { ssr: false })

const Page = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated && <CommunityHomeByStreaming />}
    </>
  )
}

export default Page
