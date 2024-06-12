// @ts-nocheck
import React, { FC, useState } from 'react'
import Modal from 'react-modal';
import styled from 'styled-components';
import { headerHeight } from '@/components/templates/header/customHeaderNav';
import Link from 'next/link';
import { modalStyle } from '../../../../atoms/modal/BaseModal';
import { useHeaderTabMenuModal } from '../../../../../../context/modal/headerTabMenuModal';

const TabMenuContainer = styled.div`
  padding: 12px 20px;
`;

const TabMenuItemList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const TabMenuItemStyle = styled.li`
  text-align: center;
  cursor: pointer;
  &:hover {
    opacity: .8;
  }

  a {
    color: #FFF;
    font-size: 14px;
    font-weight: 400;
    display: block;
  }
`

export interface TabMenuItemType {
  title: string;
  href: string;
}

interface TabMenuProps {
  tabMenuItems?: TabMenuItemType[]
  triggerPosition: { left: number } | null;
}

const TabMenuModal: FC<TabMenuProps> = ({ tabMenuItems, triggerPosition }) => {
  const { modalIsOpen, closeModal } = useHeaderTabMenuModal();

  const TabMenuModalStyle: React.CSSProperties = {
    backgroundColor: "#261F32",
    borderRadius: "12px",
    border: 'none',
    position: "relative",
    top: headerHeight.lg,
    left: `${triggerPosition?.left}px`,
    width: 'auto',
    maxWidth: '128px',
    height: 'auto',
    padding: '0'
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={modalStyle(TabMenuModalStyle)}
    >
      <TabMenuContainer>
        <TabMenuItemList>
          {
            tabMenuItems?.map((item, index) => {
              return (
                <TabMenuItemStyle key={index}>
                  <Link href={item.href}>{item.title}</Link>
                </TabMenuItemStyle>
              )
            })
          }
        </TabMenuItemList>
      </TabMenuContainer>
    </Modal>
  )
}

export default TabMenuModal;
