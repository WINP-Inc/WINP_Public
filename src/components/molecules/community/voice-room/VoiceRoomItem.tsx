import Image from 'next/image';
import React, { FC } from 'react'
import styled from 'styled-components';

const VoiceRoomItemWrapper = styled.div`
  width: 100%;
  height: auto;
  background: #261F32;
  border-radius: 12px;
`

const VoiceRoomItemContainer = styled.div`
  padding: 27px 0;
`;

const VoiceRoomAccountArea = styled.div`
  text-align: center;
  margin-bottom: 28px;

  img {
    width: 120px !important;
    border-radius: 120px !important;
    position: static !important;
  }

  span {
    display: block;
    margin-top: 12px;
    font-family: Inter;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
  }
`;

const VoiceRoomItemButtonArea = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;

  img {
    width: 36px !important;
    position: static !important;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`

export interface VoiceRoomItemType {
  accountIcon: string;
  accountName: string;
}

const VoiceRoomItem: FC<VoiceRoomItemType> = ({ accountIcon, accountName }) => {
  return (
    <VoiceRoomItemWrapper>
      <VoiceRoomItemContainer>
        <VoiceRoomAccountArea>
          <Image layout="fill"  alt='user-icon' src={accountIcon} />
          <span>{accountName}</span>
        </VoiceRoomAccountArea>
        <VoiceRoomItemButtonArea>
          <Image layout="fill"  alt='button-icon' src='/icons/voice-room-audio.svg' />
          <Image layout="fill"  alt='button-icon' src='/icons/thumbtack.svg' />
          <Image layout="fill"  alt='button-icon' src='/icons/voice-room-user.svg' />
        </VoiceRoomItemButtonArea>
      </VoiceRoomItemContainer>
    </VoiceRoomItemWrapper>
  )
}

export default VoiceRoomItem
