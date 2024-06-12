import Image from 'next/image';
import React, { FC, useState } from 'react'
import styled from 'styled-components';

const IndicatorItemWrapper = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    span {
      opacity: .8;
    }
  }

  img {
    position: static !important;
    width: 15px !important;
  }

  span {
    font-size: 14px;
    font-weight: 400;
    display: block;
    line-height: normal;
  }
`

interface IndicatorModalItemProps {
  title: string;
  isActive: boolean;
  action?: (e?: any) => void;
}

const IndicatorModalItem: FC<IndicatorModalItemProps> = ({ title, isActive, action }) => {
  const indicatorIcon = isActive ? '/icons/teenyicons-tick-circle-solid-active.svg' : '/icons/teenyicons-tick-circle-solid.svg';

  return (
    <IndicatorItemWrapper onClick={action}>
      <Image layout="fill"  alt='indicator-icon' src={indicatorIcon} />
      <span>{title}</span>
    </IndicatorItemWrapper>
  )
}

export default IndicatorModalItem
