'use client'
import dynamic from 'next/dynamic'
import React from 'react'

const VoiceRoomUserView = dynamic(() => import('../../../../components/pages/community/voice-room/VoiceRoom'), { ssr: false });

const page = () => {
  return (
    <VoiceRoomUserView />
  )
}

export default page
