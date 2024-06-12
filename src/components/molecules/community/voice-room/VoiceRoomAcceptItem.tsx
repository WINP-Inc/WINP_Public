import { VoiceRoomItemType } from '@/components/molecules/community/voice-room/VoiceRoomItem'
import Image from 'next/image';
import React, { FC } from 'react';
import styled from 'styled-components';

const VoiceRoomAcceptItemWrapper = styled.div`
  width: 420px;
  border-radius: 12px;
  background: #261F32;
  padding: 18px 21px;
`

const AcceptAccountArea = styled.div`
  display: flex;
  align-items: start;
  gap: 8px;

  img {
    width: 77.249px !important;
    position: static !important;
    border-radius: 84.238px;
  }

  span {
    width: 254.017px;
    font-size: 16px;
    font-weight: 400;
    line-height: 28.5px;
    display: block;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 8px;
  
  button {
    border-radius: 8px;
    padding: 10px 30px;
    font-size: 14px;
    font-weight: 400;
    color: #FFF;
    cursor: pointer;
    line-height: normal;

    &:hover {
      opacity: 0.8;
    }

    &:first-child {
      background: #372E53;
    }

    &:nth-child(2) {
      background: #8043F9;
    }
  }
`;


interface VoiceRoomAcceptItemProps {
  accountItem: VoiceRoomItemType
}

const VoiceRoomAcceptItem: FC<VoiceRoomAcceptItemProps> = ({ accountItem }) => {
  return (
    <VoiceRoomAcceptItemWrapper>
      <AcceptAccountArea>
        <Image layout="fill" alt='account-icon' src={accountItem.accountIcon} />
        <span>{`${accountItem.accountName} wants to join as a speaker.`}</span>
      </AcceptAccountArea>
      <ButtonArea>
        <button>Reject</button>
        <button>Admit</button>
      </ButtonArea>
    </VoiceRoomAcceptItemWrapper>
  )
}

export default VoiceRoomAcceptItem
