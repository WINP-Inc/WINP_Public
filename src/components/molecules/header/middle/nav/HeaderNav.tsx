import Image from 'next/image'
import React, { FC, useCallback, useEffect, useRef } from 'react'
import { styled } from 'styled-components'
import media from 'styled-media-query'
import { TabMenuItemType } from './TabMenu'
import { HeaderTabMenuModalProvider, useHeaderTabMenuModal } from '../../../../../../context/modal/headerTabMenuModal'
import TabMenuModal from './TabMenu'
import Link from 'next/link'

const HeaderNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;

  a {
    position: relative;
    display: flex;
    width: 64px;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    img {
      width: 64px !important;
      height: 70px !important;
      position: static !important;
    }

  ${media.lessThan('medium')`
    display: none;
  `}
  }

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
`;

const HeaderNavItemWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  &.is-active {
    &::after {
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      background-color: #8043F9;
      bottom: 0;
    }
  }

  ${media.lessThan('medium')`
    display: none;
  `}
`

export interface HeaderNavItem {
  navType: 'link' | 'tab'
  imgSrc: string;
  href: string;
  isActive?: boolean;
  tabMenuList?: TabMenuItemType[];
}

interface HeaderNavItemProps {
  navItem: HeaderNavItem;
}

export const HeaderNavItem: FC<HeaderNavItemProps> = React.memo(({ navItem }) => {
  const { openModal } = useHeaderTabMenuModal();
  const triggerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navItem.isActive && itemRef.current) {
      itemRef.current.className += ' is-active'
    }
  }, [navItem.isActive])

  const getTriggerPosition = () => {
    const triggerElement = triggerRef.current;
    if (triggerElement) {
      const rect = triggerElement.getBoundingClientRect();
      return {
        left: rect.left,
      };
    }
    return null;
  };

  const onClickItemHandler = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    openModal();
  }, [openModal])

  return (
    <HeaderNavItemWrapper ref={itemRef}>
      {
        navItem.navType === 'tab' ? (
          <div style={{height: "100%"}} ref={triggerRef}>
            <Link href={navItem.href} onClick={onClickItemHandler}><Image layout="fill" src={navItem.imgSrc} alt='navItem' /></Link>
            <TabMenuModal
              tabMenuItems={navItem.tabMenuList}
              triggerPosition={getTriggerPosition()}
            />
          </div>
        ) : (
            <Link href={navItem.href}><Image layout="fill" src={navItem.imgSrc} alt='navItem'  /></Link>
        )
      }
    </HeaderNavItemWrapper>
  );

})

HeaderNavItem.displayName = 'HeaderNavItem';

export interface HeaderNavListType {
  headerNavList: HeaderNavItem[]
}

export const HeaderNav: FC<HeaderNavListType> = ({ headerNavList }) => {
  return (
    <HeaderTabMenuModalProvider>
      <HeaderNavWrapper>
        {
          headerNavList.map((navItem, index) => {
            return (
              <HeaderNavItem 
                key={index}
                navItem={navItem}
              />
            )
          })
        }
      </HeaderNavWrapper>
    </HeaderTabMenuModalProvider>
  )
}
