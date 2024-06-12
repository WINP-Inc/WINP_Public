import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import ChatItem from '@/components/molecules/chat/ChatItem';
import Image from 'next/image';
import BaseSideWidget from './nft-sales/BaseSideWidget';

const metaData: any[] = [
//   {
//     id: 1,
//     roleName: 'user-1',
//     chatIcon: '/icons/ellipse-25.svg',
//     accountName: 'Shelby Thomas',
//     messageText: 'This game is sick!'
//   },
//   {
//     id: 2,
//     roleName: 'user-2',
//     chatIcon: '/icons/ellipse-27.svg',
//     accountName: 'Shelby Thomas',
//     messageText: 'This game is sick! This game is sick!This game is sick!'
//   },
//   {
//     id: 3,
//     roleName: 'user-3',
//     chatIcon: '/icons/ellipse-2318.png',
//     messageText: `This game is sick! This game is sick!This
// game is sick! This game is sick! This game is sick!This
// game is sick!`,
//     accountName: 'Shelby Thomas',
//   },
//   {
//     id: 4,
//     roleName: 'my-account',
//     chatIcon: '/icons/ellipse-26.svg',
//     messageText: 'My name is Dev'
//   },
//   {
//     id: 5,
//     roleName: 'user-5',
//     chatIcon: '/icons/ellipse-28.svg',
//     messageText: 'This game is sick!',
//     accountName: 'Shelby Thomas',
//   },

//   {
//     id: 6,
//     roleName: 'user-6',
//     chatIcon: '/icons/ellipse-29.svg',
//     messageText: `This game is sick! This game is sick!This
// game is sick!`,
//     accountName: 'Shelby Thomas',
//   },
]

const CommunityChatContainer = styled.div`
  background: #261F32;
  border-radius: 20px;
  width: 420px;
  height: 85vh;
  position: relative;
`;

const ChatBodyWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90%;
  z-index: 1;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const ChatBodyContainer = styled.div`
  padding: 60px 21px 0 21px;
`

const ChatArea = styled.div`
  text-align: left;
  height: 100%;
  max-height: 88%;
  overflow: scroll;
  white-space: pre-wrap;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChartSubmitArea = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  width: calc(100% - (16px * 2));
`

const InputSubmitWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  textarea {
    font-family: Poppins;
    resize: none;
    padding: 10px 50px 10px 10px;
    border-radius: 8px;
    background: #3C3551;
    width: 100%;
    height: 60px;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    border: none;
    outline: none;

    &::-webkit-scrollbar {
      display: none;
    }

    &::placeholder {
      color: #7A738F;
    }
  }
`

const ChatImageButtonArea = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    display: block;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`

const LiveStreamChat = () => {
  return (
    <CommunityChatContainer>
      <BaseSideWidget>
        <ChatBodyWrapper>
          <ChatBodyContainer>
            <ChatArea>
              {metaData.map((item) => (
                <ChatItem key={item.id}
                  chatIcon={item.chatIcon}
                  messageText={item.messageText}
                />
              ))}
            </ChatArea>
          </ChatBodyContainer>
        </ChatBodyWrapper>
        <ChartSubmitArea>
          <InputSubmitWrapper>
            <textarea placeholder="Type your message here..."/>
            <ChatImageButtonArea>
              <span><Image layout='fill' alt='/icons/mingcute-hand-fill.svg' src='/icons/mingcute-hand-fill.svg' /></span>
              <span><Image layout='fill' alt='emoji' src='/icons/mdi-emoji.svg' /></span>
            </ChatImageButtonArea>
          </InputSubmitWrapper>
        </ChartSubmitArea>
      </BaseSideWidget>
    </CommunityChatContainer>
  )
}

export default LiveStreamChat;
