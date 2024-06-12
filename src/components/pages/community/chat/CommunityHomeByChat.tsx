import React from 'react'
import BaseCommunityHome from '../home/BaseCommunityHome'
import CommunityRoomsProvider from '../../../../../context/community/CommunityRoomsProvider'
import { useChatRooms } from '../../../../../hooks/chatRooms/useChatRooms'

const CommunityHomeByChat = () => {
  const { rooms } = useChatRooms()

  return (
    <CommunityRoomsProvider type='chatroom' rooms={rooms}>
      <BaseCommunityHome />
    </CommunityRoomsProvider>
  )
}

export default CommunityHomeByChat
