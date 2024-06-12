import Image from 'next/image';
import React, { FC } from 'react'
import styled from 'styled-components'

const ControlButtonWrapper = styled.div`
  display: inline-block;
  padding: 14px;
  border-radius: 176px;
  text-align: center;
  cursor: pointer;
  background-color: rgba(39, 32, 61, 0.60);
`;

const ControlButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const ControlButtonIconWrapper = styled.div`
  width: 25px;
  height: 25px;

  img {
    position: static !important;
    object-fit: cover;
    width: 28px !important;
    height: 20px !important;
  }
`;

interface ControlButtonProps {
  imgSrc: string;
  ready?: boolean
  isEnabled?: boolean;
  action?: () => void;
  children?: React.ReactNode;
}

const ControlButton: FC<ControlButtonProps> = ({ imgSrc, isEnabled, children, action, ready = true }) => {
  const handleImgUrl = () => {
    const baseImgUrl = imgSrc.split('.')[0];
    const extension = imgSrc.split('.').pop();

    if (!isEnabled) {
      return `${baseImgUrl}-disabled.${extension}`;
    } else {
      return baseImgUrl.endsWith('-disabled') ? `${baseImgUrl.slice(0, -9)}.${extension}` : imgSrc;
    }
  };

  return (
    <ControlButtonWrapper>
      <ControlButtonContainer>
        <ControlButtonIconWrapper onClick={action}>
          <Image layout="fill" src={handleImgUrl()} alt='control-icon' />
        </ControlButtonIconWrapper>
        { children }
      </ControlButtonContainer>
    </ControlButtonWrapper>
  )
}

export default ControlButton
