'use client'
import dynamic from 'next/dynamic'
import React from 'react'
import { useAuth } from '../../../../../context/Auth'
const CommunityChatRoom = dynamic(() => import('../../../../components/pages/community/chat/CommunityChatRoom'), { ssr: false })

const Page = ({ params }: { params: { id: string } }) => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated && <CommunityChatRoom roomId={params.id} />}
    </>
  )
}

export default Page;