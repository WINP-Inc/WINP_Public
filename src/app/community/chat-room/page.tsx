'use client'
import { useProtectedRoute } from '@/routes/protectedRoute'
import dynamic from 'next/dynamic'
import React from 'react'
const CommunityHomeByChat = dynamic(() => import('../../../components/pages/community/chat/CommunityHomeByChat'), { ssr: false })

const Page = () => {
  return (
    <CommunityHomeByChat />
  )
}

export default Page