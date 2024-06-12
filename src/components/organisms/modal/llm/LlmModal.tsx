import React, { useEffect, useRef, useState } from 'react'
import { styleModalType } from '@/types/modal/styleModalType';
import styled from 'styled-components';
import Image from 'next/image';
import { useLlmChat } from '../../../../../hooks/useLlmChat';
import BaseLlmModal from '../chat/BaseLlmModal';
import { useModal } from '../../../../../hooks/useModal';
import LlmHistoryModal from './LlmHistoryModal';
import { useLlmModalManager } from '../../../../../context/llm/LlmModalManager';
import { Styles } from 'react-modal';
import { useSystemChat } from '../../../../../context/SystemChat';
import ChatItem from '@/components/molecules/chat/ChatItem';
import { SystemChatMessage } from '@/types/llm/systemChatType';
import { useAuth } from '../../../../../context/Auth';
import { useSocket } from '../../../../../context/Socket';
import { useDeviceType, useWindowSize } from '../../../../../hooks/windowSize';
import media from 'styled-media-query';
import { footerHeight } from '@/components/templates/footer/MobileFooter';

const ModalButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  cursor: pointer;

  &:hover {
    opacity: .7;
  }

  img {
    position: static !important;
  }

  ${media.lessThan('medium')`
    bottom: calc(${footerHeight} + 15px);
  `}
`;

const ChartSubmitArea = styled.div`
  position: absolute;
  bottom: 29px;
  left: 14px;

  ${media.lessThan('medium')`
    width: calc(100% - 28px);
    bottom: 18px;
  `}
`

const InputSubmitWrapper = styled.div`
  display: flex;
  align-items: center;

  textarea {
    font-family: Poppins;
    resize: none;
    padding: 10px 50px 10px 10px;
    border-radius: 8px;
    background: #3C3551;
    width: 388px;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    border: none;
    outline: none;
    word-break: break-all;

    &::placeholder {
      color: #7A738F;
    }
  }

  button {
    position: absolute;
    right: 10px;
    width: 28px;
    height: 28px;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      opacity: .7;
    }

    img {
      position: static !important;
      object-fit: contain;
    }
  }
`
const ChatArea = styled.div`
  padding: 17px 15px;
  overflow: scroll;
  max-height: 300px;

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.lessThan('medium')`
    max-height: 230px;
  `}
`

const LlmModal = () => {
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const {
    isOpenByHistoryModal,
    isOpenBySystemChatModal,
    closeByHistoryModal,
    closeBySystemChatModal,
    openByHistoryModal,
    openBySystemChatModal,
  } = useLlmModalManager();
  const { message, handleMessageInput, handleKeyDown } = useLlmChat();
  const { systemChats, systemChat, createSystemChat } = useSystemChat();
  const { user } = useAuth();
  const { isMobile, isDesktop } = useDeviceType();
  const windowsize = useWindowSize();

  function generateRandomString(length: number): string {
    const characters = '0123456789abcdef';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const postMessage = () => {
    if (!message.trim()) {
      return;
    }
    const id = generateRandomString(24);
    createSystemChat(id, message);
  }

  const llmModalStyle: Styles = isDesktop ? (
    {
      overlay: {
        backgroundColor: 'transparent',
        position: 'fixed',
        top: 'calc(100% - (420px + 20px))',
        left: 'calc(100% - (420px + 60px))',
        zIndex: 10,
      },
      content: {
        width: '420px',
        height: '420px',
        position: 'relative',
        borderRadius: '12px',
        backgroundColor: '#302A43',
        border: 'none',
        padding: '0',
        top: '0',
        left: '0',
      }
    }
  ) : (
      {
        overlay: {
          backgroundColor: 'transparent',
          position: 'fixed',
          zIndex: 10,
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
        },
        content: {
          width: 'calc(100% - 32px)',
          height: '352px',
          position: 'absolute',
          borderRadius: '12px',
          backgroundColor: '#302A43',
          border: 'none',
          padding: '0',
          top: 'calc(50% - 26px)',
          left: '50%',
          transform: 'translateX(-50%)',
        }
      }
  )
  return (
    <>
      {isOpenBySystemChatModal ? (
        <BaseLlmModal
          styles={llmModalStyle}
          title='Bridge'
          isOpen={isOpenBySystemChatModal}
          closeModal={closeBySystemChatModal}
          isOverlay={false}
        >
          <form action="#">
            <ChatArea ref={chatAreaRef}>
              {systemChat?.messages.map((message: SystemChatMessage, index: number) => {
                return (
                  <ChatItem
                    key={index}
                    chatIcon={user.image}
                    messageText={message.content}
                    isUser={message.user === 'USER'}
                    shouldShowPrimaryMessage={false}
                  />
                )
              })}
            </ChatArea>
            <ChartSubmitArea>
              <InputSubmitWrapper>
                <textarea onKeyDown={(e) => handleKeyDown(e, postMessage)} onChange={handleMessageInput} placeholder='Etiam feugiat nisl eget fermentum mattis augue ullamcorper arcu ut.' value={message}></textarea>
                <button type='button' onClick={postMessage}><Image layout="fill" src='/icons/group-162965.svg' alt='button-icon' /></button>
              </InputSubmitWrapper>
            </ChartSubmitArea>
          </form>
        </BaseLlmModal>
      ) : (
        <ModalButton onClick={openBySystemChatModal}>
          <Image layout="fill" alt='logo-button' src='/icons/llm-logo.svg' />
        </ModalButton>
      )}
      <LlmHistoryModal isOpen={isOpenByHistoryModal} closeModal={closeByHistoryModal} />
    </>
  )
}

export default LlmModal
