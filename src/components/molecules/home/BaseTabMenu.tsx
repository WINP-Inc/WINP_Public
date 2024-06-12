// @ts-nocheck
import React, { FC, HtmlHTMLAttributes, useEffect, useRef, useState } from 'react'
import Modal from 'react-modal';
import styled from 'styled-components';
import { useModal } from '../../../../hooks/useModal';
import { modalStyle } from '../../atoms/modal/BaseModal';
import { useDeviceType } from '../../../../hooks/windowSize';

const TabMenuWrapper = styled.div``

const TabMenuContainer = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TabMenuItem = styled.div`
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;

  &:hover {
    opacity: 0.8;
    color: #8043F9;
  }

  span {
    display: block;

    &.is-danger {
      color: #F6465D;
    }
  }

`

export interface TabMenuItemType {
  title: string;
  isDanger?: boolean;
  action?: (e?: any) => void;
}

interface TabMenuPosition {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
}

interface BaseTabMenuProps {
  isOpen: boolean;
  closeModal: (e?: any) => void;
  items: TabMenuItemType[];
  position: TabMenuPosition;
  isOverlay?: boolean;
}

const BaseTabMenu: FC<BaseTabMenuProps> = ({ isOpen, closeModal, items, position, isOverlay }) => {
  const { isMobile } = useDeviceType();

  const SModal = () => {
    if (isMobile) {
      return {
        width: 'auto',
        height: 'auto',
        position: 'relative',
        borderRadius: '12px',
        backgroundColor: '#302A43',
        border: 'none',
        padding: '0',
        top: position?.top,
        left: position?.left - (162 - 48) + 'px',
        textAlign: 'left',
        overflow: 'inherit',
        display: 'inline-block'
      }
    } else {
      return {
        width: 'auto',
        height: 'auto',
        minWidth: '162px',
        position: 'relative',
        borderRadius: '12px',
        backgroundColor: '#302A43',
        border: 'none',
        padding: '0',
        top: position?.top,
        left: position?.left - (162 - 48) + 'px',
        textAlign: 'left',
        overflow: 'inherit',
        display: 'inline-block'
      }
    }
  
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyle(
        SModal(),
        isOverlay
      )}
    >
      <TabMenuContainer>
        {items.map((item, index) => {
          return (
            <TabMenuItem key={index}>
              <span
                className={item.isDanger ? 'is-danger' : ''}
                onClick={item.action}
              >
                {item.title}
              </span>
            </TabMenuItem>
          )
        })}
      </TabMenuContainer>
    </Modal>
  )
}

export default BaseTabMenu
