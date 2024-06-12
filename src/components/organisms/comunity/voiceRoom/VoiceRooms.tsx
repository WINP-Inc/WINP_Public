import React, { FC } from 'react'
import styled from 'styled-components'
import VoiceRoomItemList, { VoiceRoomItemListType } from './VoiceRoomItemList'

const VoiceRoomsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

interface VoiceRoomsProps {
  voiceRooms: VoiceRoomItemListType[]
}

const VoiceRooms: FC<VoiceRoomsProps> = ({ voiceRooms }) => {
  return (
    <VoiceRoomsWrapper>
      {
        voiceRooms.map((room, index) => {
          return (
            <VoiceRoomItemList key={index} title={room.title} voiceRoomItems={room.voiceRoomItems} acceptItems={room.acceptItems} />
          )
        })
      }
    </VoiceRoomsWrapper>
  )
}

export default VoiceRooms
