import VoiceRoomItem, { VoiceRoomItemType } from '@/components/molecules/community/voice-room/VoiceRoomItem';
import React, { FC } from 'react'
import styled from 'styled-components';
import VoiceRoomAcceptItem from '../../../molecules/community/voice-room/VoiceRoomAcceptItem';

const VoiceRoomItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`

const RoomTitleArea = styled.div`
  text-align: left;

  span {
    font-size: 16px;
    font-weight: 600;
    font-family: Inter;
    line-height: normal;
    display: block;
  }
`

const RoomBody = styled.div`
  width: 100%;

  ul {
    gap: 30px;
    display: flex;
    flex-wrap: wrap;
  }

  li {
    width: calc(100% / 4 - 30px * 3 / 4);
  }
`

export interface VoiceRoomItemListType {
  title: string;
  voiceRoomItems: VoiceRoomItemType[];
  acceptItems?: VoiceRoomItemType[];
}

const VoiceRoomItemList: FC<VoiceRoomItemListType> = ({ title, voiceRoomItems, acceptItems }) => {
  return (
    <VoiceRoomItemsWrapper>
      <RoomTitleArea>
        <span>{title}</span>
      </RoomTitleArea>
      <RoomBody>
        <ul>
          {
            voiceRoomItems.map((item, index) => {
              return (
                <li key={index}>
                  <VoiceRoomItem accountIcon={item.accountIcon} accountName={item.accountName} />
                </li>
              )
            })
          }
          {
            acceptItems?.map((item, index) => {
              return (
                <li key={index}>
                  <VoiceRoomAcceptItem accountItem={item} />
                </li>
              )
            })
          }
        </ul>
      </RoomBody>
    </VoiceRoomItemsWrapper>
  )
}

export default VoiceRoomItemList
