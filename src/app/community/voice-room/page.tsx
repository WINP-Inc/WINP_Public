'use client'
import dynamic from 'next/dynamic'
import React from 'react'

const CommunityHomeByVoice = dynamic(() => import('../../../components/pages/community/voice-room/CommunityHomeByVoice'), { ssr: false })

const page = () => {
  return (
    <>
      <CommunityHomeByVoice />
    </>
  )
}

export default page