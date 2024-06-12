import { BasePrimaryButton } from '@/components/atoms/button/Buttons';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import ToolTip from '../../tools/ToolTip';
import media from 'styled-media-query';

const NavItemWrapper = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  span {
    color: #FFF;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    white-space: nowrap;

    &.primary {
      color: #8043F9;
    }

    ${media.lessThan('medium')`
      font-size: 11px;
      position: relative;
    `}
  }

  &.right-end {
    margin-left: auto;

    ${media.lessThan('medium')`
      position: absolute;
      right: 0;
      right: 0;
    `}
  }

  img {
    position: static !important;
    margin-right: 8px;
    width: 18px !important;
  }
`;

const SvgWrapper = styled.div`
  width: 20px;
  height: 20px;

  svg {
    width: 100%;
    height: 100%;
  }
`

export interface NavItemType {
  title: string;
  iconSvg?: any;
  isPrimary?: boolean;
  isRightEnd?: boolean;
  isFirst?: boolean;
  action?: () => void;
  isDisabled?: boolean;
  description?: string;
};

interface BasesNavItemProps {
  navItem: NavItemType;
}

const BaseNavItem: FC<BasesNavItemProps> = memo(({ navItem }) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const itemTextRef = useRef<HTMLSpanElement>(null);
  const itemSvgRef = useRef<HTMLDivElement>(null);

  const setSvgColor = (color: string) => {
    const svgPaths = itemRef.current?.querySelectorAll('svg path');
    svgPaths?.forEach(path => {
      path.setAttribute('stroke', color)
    });
  }

  const initializeNavItem = () => {
    if (navItem.isRightEnd) {
      itemRef.current?.classList.add('right-end');
    }

    if (navItem.isFirst) {
      itemRef.current?.classList.add('active');
      itemTextRef.current?.classList.add('primary');
      setSvgColor('#8043F9');
    }
  }

  const resetActiveItems = () => {
    document.querySelectorAll('.active').forEach(item => {
      item.classList.remove('active');
      const textRef = item.querySelector('.primary');
      const svgPaths = item.querySelectorAll('svg path');
      textRef?.classList.remove('primary');
      svgPaths.forEach(path => {
        path.setAttribute('stroke', 'white');
      });
    });
  }

  useEffect(initializeNavItem, [navItem.isFirst, navItem.isRightEnd]);

  const handleClick = useCallback(() => {
    if (navItem.action) {
      navItem.action();
    }
    if (navItem.isDisabled) return;

    resetActiveItems();

    itemTextRef.current?.classList.add('primary');
    itemRef.current?.classList.add('active');
    setSvgColor('#8043F9');
  }, [navItem])

  return (
    <>
      <NavItemWrapper ref={itemRef} onClick={handleClick}>
        {
          navItem.isPrimary ? (
            <BasePrimaryButton width={76} py={8}>
              <Image layout='fill' alt='postIcon' src='/icons/note-pencil.svg' />
              {navItem.title}
            </BasePrimaryButton>
          ) : (
            <>
              {navItem.iconSvg && (
                <SvgWrapper ref={itemSvgRef}>{navItem.iconSvg}</SvgWrapper>
              )}
              <span ref={itemTextRef}>{navItem.title}</span>
            </>
          )
        }
      </NavItemWrapper>
    </>
  )
})

BaseNavItem.displayName = 'BaseNavItem'

export default BaseNavItem
