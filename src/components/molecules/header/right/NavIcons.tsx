import { BaseNavIconButton, IndicatorButton } from '@/components/atoms/button/Buttons';
import IndicatorModal from '@/components/organisms/modal/indicator/IndicatorModal';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useAuth } from '../../../../../context/Auth';
import { useModal } from '../../../../../hooks/useModal';
import BaseTabMenu, { TabMenuItemType } from '../../home/BaseTabMenu';
import { useTabMenu } from '../../../../../hooks/tabMenu';

const NavIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const NavIcons = () => {
  const {
    isOpenByCareDown,
    closeByCareDown,
    openByCareDown,
    isOpenByQuest,
    closeByQuest,
    openByQuest,
    careDownMenuItems,
    triggerPosition,
    openCareDownTab,
    openQuestTab
  } = useTabMenu();

  return (
    <NavIconsWrapper>
      <IndicatorButton onClick={openQuestTab} />
      <BaseNavIconButton imageUrl='/icons/notification.svg' />
      <BaseNavIconButton imageUrl='/icons/CaretDown.svg' onClick={openCareDownTab} />
      <IndicatorModal isOpen={isOpenByQuest} closeModal={closeByQuest} triggerPosition={triggerPosition} />
      <BaseTabMenu isOpen={isOpenByCareDown} closeModal={closeByCareDown} position={triggerPosition} items={careDownMenuItems} />
    </NavIconsWrapper>
  )
}

export default NavIcons