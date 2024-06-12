'use client'

import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useProtectedRoute } from '@/routes/protectedRoute'
import { useAuth } from '../../../../../context/Auth'

const CommunityStream = dynamic(() => import('../../../../components/pages/community/live-streaming/CommunityStream'), { ssr: false })

const Page = ({ params }: { params: { id: string } }) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <CommunityStream roomId={params.id} />}
    </>
  )
}

export default Page
