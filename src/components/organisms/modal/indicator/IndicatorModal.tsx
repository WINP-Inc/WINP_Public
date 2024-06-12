// @ts-nocheck
import IndicatorModalItem from '@/components/molecules/header/right/modal/IndicatorModalItem';
import { modalStyle } from '@/components/atoms/modal/BaseModal';
import { headerHeight } from '@/components/templates/header/customHeaderNav';
import React, { FC, useRef } from 'react'
import Modal from 'react-modal';
import styled from 'styled-components';

const IndicatorModalContainer = styled.div`
  padding: 16px;

  ul {
    display: flex;
    gap: 16px;
    flex-direction: column;
  }
`

interface IndicatorModalProps {
  isOpen: boolean;
  closeModal: () => void;
  triggerPosition: {
    left: number,
    top: number
  }
}

const IndicatorModal: FC<IndicatorModalProps> = ({ isOpen, closeModal, triggerPosition }) => {
  const tabMenuRef = useRef<HTMLDivElement>(null);

  const indicatorItems: {
    title: string,
    isActive: boolean,
    action: () => void
  }[] = [
      {
        title: 'Register wallet on WINP',
        isActive: true,
        action: () => { }
      },
      {
        title: 'Register Discord',
        isActive: true,
        action: () => { }
      },
      {
        title: 'Discord Click',
        isActive: true,
        action: () => { }
      },
      {
        title: 'Retweet WINP',
        isActive: false,
        action: () => { }
      },
      {
        title: 'Join Telegram',
        isActive: false,
        action: () => { }
      },
    ]

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyle({
        width: 'auto',
        height: 'auto',
        minWidth: '218px',
        position: 'relative',
        borderRadius: '12px',
        backgroundColor: '#261F32',
        border: 'none',
        padding: '0',
        top: triggerPosition?.top,
        left: triggerPosition.left - (218 - 48) + 'px',
        textAlign: 'left',
        overflow: 'inherit',
        display: 'inline-block'
      })}
    >
      <IndicatorModalContainer>
        <ul>
          {
            indicatorItems.map((item, index) => {
              return (
                <IndicatorModalItem
                  key={index}
                  title={item.title}
                  isActive={item.isActive}
                  action={item.action}
                />
              )
            })
          }
        </ul>
      </IndicatorModalContainer>
    </Modal>
  )
}

export default IndicatorModal
