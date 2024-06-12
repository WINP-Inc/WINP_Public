import React from 'react'
import NavIcons from './NavIcons'
import { styled } from 'styled-components'
import media from 'styled-media-query'
import BaseAvatar from '@/components/atoms/avatar/BaseAvatar'
import { useAuth } from '../../../../../context/Auth'
import { useTabMenu } from '../../../../../hooks/tabMenu'
import BaseTabMenu from '../../home/BaseTabMenu'

const HeaderRightTabAndPC = styled.div`
  ${media.lessThan('medium')`
    display: none;
  `}
`

const HeaderRightMobile = styled.div`
  ${media.greaterThan('medium')`
    display: none;
  `}
`

const HeaderRight = () => {
  const { user } = useAuth();
  const {
    isOpenByCareDown,
    closeByCareDown,
    careDownMenuItems,
    triggerPosition,
    openCareDownTab,
  } = useTabMenu();

  return (
    <div>
      <HeaderRightTabAndPC>
        <NavIcons />
      </HeaderRightTabAndPC>
      <HeaderRightMobile onClick={openCareDownTab}>
        <BaseAvatar size={40} url={user.image}/>
      </HeaderRightMobile>
      <BaseTabMenu
        isOpen={isOpenByCareDown}
        closeModal={closeByCareDown}
        position={triggerPosition}
        items={careDownMenuItems}
      />
    </div>
  )
}

export default HeaderRight
