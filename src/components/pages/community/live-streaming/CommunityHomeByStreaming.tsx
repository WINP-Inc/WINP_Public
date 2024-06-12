import React from 'react'
import BaseCommunityHome from '../home/BaseCommunityHome'
import { useLivestream } from '../../../../../context/Livestream'
import CommunityRoomsProvider from '../../../../../context/community/CommunityRoomsProvider'

const CommunityHomeByStreaming = () => {
  const { livestreams } = useLivestream();

  return (
    <CommunityRoomsProvider rooms={livestreams} type='livestream' >
      <BaseCommunityHome />
    </CommunityRoomsProvider>
  )
}

export default CommunityHomeByStreaming
