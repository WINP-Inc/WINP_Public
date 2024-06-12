import MobileFooterNav from '@/components/molecules/footer/MobileFooterNav';
import React from 'react'
import styled from 'styled-components'
import { useTabMenu } from '../../../../hooks/tabMenu';
import useTabModal from '../../../../hooks/useTabModal';
import TabMenuModal from '@/components/molecules/header/middle/nav/TabMenu';
import BaseTabMenu, { TabMenuItemType } from '@/components/molecules/home/BaseTabMenu';
import { useRouter } from 'next/navigation';

export const footerHeight = '54px';

const FooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #261F32;
  border-radius: 10px 10px 0 0;
  height: ${footerHeight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: solid 2px #372E47;
`


const FooterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const MobileFooter = () => {
  const router = useRouter();

  const getToPage = (href: string) => {
    router.push(href);
  }

  const tabMenuItems: TabMenuItemType[] = [
    {
      title: 'Voice Room',
      action(e) {
        getToPage('/community/voice-room');
      },
    },
    {
      title: 'Chat Room',
      action(e) {
        getToPage('/community/chat-room');
      },
    },
    {
      title: 'Live Streams',
      action(e) {
        getToPage('/community/live-streams');
      },
    },
  ]

  const { openTabModal, triggerPosition, modalIsOpen, closeModal } = useTabModal({ type: 'footer' });

  return (
    <FooterWrapper>
      <FooterContainer>
        <MobileFooterNav icon='/icons/home.svg' href='/home' />
        <MobileFooterNav icon='/icons/on-chain.svg' href='/chart' />
        <MobileFooterNav icon='/icons/live-comm.svg' onClick={openTabModal}/>
        <MobileFooterNav icon='/icons/market.svg' href='/market' />
      </FooterContainer>
      <BaseTabMenu
        isOpen={modalIsOpen}
        closeModal={closeModal}
        items={tabMenuItems}
        position={triggerPosition}
        isOverlay={true}
      />
    </FooterWrapper>
  )
}

export default MobileFooter
