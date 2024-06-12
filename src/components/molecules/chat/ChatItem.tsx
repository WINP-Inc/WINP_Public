import Image from 'next/image'
import React, { FC, useEffect } from 'react'
import { styled } from 'styled-components'
import { useAuth } from '../../../../context/Auth';

const ChatItemContainer = styled.div<{ align: string; myaccount: string }>`
  display: flex;
  align-items: ${props => props.align};
  margin-bottom: 26px;
  gap: 8px;
  flex-direction: ${({ myaccount }) => (myaccount === 'true' ? 'row-reverse' : 'row')};
  text-align: left;
`;

const ChatAvatar = styled.div`
  width: 32px;
  height: 32px;

  img {
    position: static !important;
    border-radius: 50%;
    object-fit: cover;
  }
`

const ChatMessageBoxContainer = styled.div`
`

const SUserTitle = styled.span`
  color: #D2D2D2;
  font-size: 10px;
  font-weight: 400;
  line-height: normal;
  display: block;
  margin-bottom: 4px;
`

const ChatMessageBox = styled.div<{ primary: string }>`
  border-radius: 12px 12px 12px 12px;
  background: ${({ primary }) => (primary === 'true' ? '#8043F9' : '#3C3551')};
  padding: 10px;
  width: auto;
  max-width: 300px;

  span {
    font-family: Poppins;
    font-size: 14px;
    font-weight: 400;
    color: #EAEAEA;
    line-height: normal;
    word-wrap: break-word;
  }
`;



interface ChatItemProps {
  chatIcon: string;
  messageText: string;
  isUser?: boolean;
  userName?: string;
  shouldShowUserName?: boolean;
  shouldShowPrimaryMessage?: boolean;
  newMessageText?: string;
}

const ChatItem: FC<ChatItemProps> = ({ chatIcon, messageText, shouldShowPrimaryMessage, shouldShowUserName, isUser, userName, newMessageText }) => {

  const formattedMessage = messageText.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <ChatItemContainer myaccount={isUser ? 'true' : 'false'} align={'start'}>
      <ChatAvatar>
        <Image layout="fill" alt='user-icon' src={chatIcon} />
      </ChatAvatar>
      <ChatMessageBoxContainer>
        {shouldShowUserName && userName && <SUserTitle>{userName}</SUserTitle>}
        <ChatMessageBox primary={shouldShowPrimaryMessage && isUser ? 'true' : 'false'}>
          {<span>{formattedMessage}</span>}
        </ChatMessageBox>
      </ChatMessageBoxContainer>
    </ChatItemContainer>
  )
}

export default ChatItem;