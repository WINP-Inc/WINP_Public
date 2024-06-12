import Image from 'next/image';
import React, { FC, useState } from 'react'
import { styled } from 'styled-components'
import media from 'styled-media-query';
import BaseNavItem, { NavItemType } from './BaseNavItem';
import ToolTip from '../../tools/ToolTip';
import { useWindowSize } from '../../../../../hooks/windowSize';

const ContentNavWrapper = styled.nav`
  margin-bottom: 34px;
  padding-left: 12px;

  ${media.lessThan('medium')`
    margin-bottom: 5px;
    padding-left: 0;
    height: 34px;
    display: flex;
    position: sticky;
    z-index: 5;
    background-color: #17121F;
    left: 16px;
    top: 58px;
    overflow-x: clip;
    scrollbar-width: none;
    -ms-overflow-style: none;
    width: 100%;
  `}
`;

const NavItemList = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  column-gap: 30px;

  ${media.lessThan('large')`
    overflow-x: scroll;
    gap: 15px;
    white-space: nowrap;
    padding-right: 90px;

    &::-webkit-scrollbar {
      display: none;
    }
  `}
`;

interface ContentNavProps {
  navItems?: NavItemType[] | null;
}

const ContentNav: FC<ContentNavProps> = ({ navItems }) => {
  const windowSize = useWindowSize();

  return (
    <ContentNavWrapper>
      <NavItemList>
        {
          navItems?.map((item, index) => {
            return (
              item.description && windowSize.width && windowSize.width >= 768 ? (
                <ToolTip description={item.description}>
                  <BaseNavItem key={index} navItem={item} />
                </ToolTip>
              ) : (
                <BaseNavItem key={index} navItem={item} />
              )
            )
          })
        }
      </NavItemList>
    </ContentNavWrapper>
  )
}

export default ContentNav
