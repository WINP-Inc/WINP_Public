import React, { FC, useEffect } from 'react'
import { styled } from 'styled-components'
import ChatItem from '@/components/molecules/chat/ChatItem';
import Image from 'next/image';
import TextAreaWithButton from '@/components/molecules/community/TextAreaWithButton';
import { useChatRooms } from '../../../../hooks/chatRooms/useChatRooms';
import { useAuth } from '../../../../context/Auth';
import { useSocket } from '../../../../context/Socket';
import media from 'styled-media-query';

const CommunityChatContainer = styled.div<{ width: string }>`
  background: #261F32;
  border-radius: 20px;
  width: ${props => props.width};
  height: 80vh;
  position: relative;

  ${media.lessThan('medium')`
    height: 75vh;
  `}
`;

const ChatArea = styled.div`
  padding: 17px 15px;
  text-align: left;
  height: 100%;
  max-height: 88%;
  overflow: scroll;
  white-space: pre-wrap;

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

interface BaseCommunityChatProps {
  chatContainerWidth: string
  defaultValues?: any[],
  myAccountPrimary?: boolean,
  roomId: string
}

const BaseCommunityChat: FC<BaseCommunityChatProps> = ({ chatContainerWidth, roomId }) => {
  const { message, handleMessageInput, chatAreaRef, postMessage, handleKeyDown, chatHistory } = useChatRooms(roomId);
  const { user } = useAuth();

  const ifOwnMessage = (chat: any) => {
    if (chat?.sender?._id && chat.sender._id === user._id) {
      return true;
    }
    if (chat?.sender?.id && chat.sender.id === user._id) {
      return true;
    }
    return false;
  }

  return (
    <CommunityChatContainer width={chatContainerWidth}>
      <ChatArea ref={chatAreaRef}>
        {
          chatHistory && [...chatHistory].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map((chat, index) => {
            return (
              <ChatItem
                key={chat._id}
                chatIcon={chat.sender.image}
                messageText={chat.message}
                shouldShowUserName={true}
                userName={chat.sender.fullName}
                shouldShowPrimaryMessage={true}
                isUser={ifOwnMessage(chat)}
              />
            )
          })
        }
      </ChatArea>
      <ChartSubmitArea onKeyDown={handleKeyDown}>
        <TextAreaWithButton
          message={message}
          onClick={postMessage}
          handleChangeInput={handleMessageInput}
        />
      </ChartSubmitArea>
    </CommunityChatContainer>
  )
}

export default BaseCommunityChat;
