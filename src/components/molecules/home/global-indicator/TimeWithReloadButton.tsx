import Image from 'next/image'
import React, { FC } from 'react'
import styled from 'styled-components'

const TimeWithReloadButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    display: block;
    font-size: 14px;
    font-weight: 400;
    opacity: 0.8;
  }
`

const ReloadButton = styled.div`
  width: 16px;
  height: 16px;
  cursor: pointer;
  
  img {
    position: static !important;
    display: block;
  }
`

interface TimeWithReloadButtonProps {
  time: string;
  description?: string;
  onClick?: (e?: any) => void;
}

const TimeWithReloadButton: FC<TimeWithReloadButtonProps> = ({ time, description, onClick }) => {
  return (
    <TimeWithReloadButtonWrapper>
      <span>{description} {time}</span>
      <ReloadButton onClick={onClick}>
        <Image layout='fill' alt='reload-btn' src='/icons/uiw-reload.svg' />
      </ReloadButton>
    </TimeWithReloadButtonWrapper>
  )
}

export default TimeWithReloadButton
