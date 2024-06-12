import React, { FC } from "react";
import { styled } from "styled-components";

const BaseButton = styled.button`
  cursor: pointer;

  &:hover {
    opacity: .8;
  }
`;


const SBaseNavIconButton = styled(BaseButton)<{ image_url?: string }>`
  width: 48px;
  height: 48px;
  background-color: #27203D;
  background-image: url(${props => props.image_url});
  background-repeat: no-repeat;
  background-size: 22px;
  background-position: center center;
  border-radius: 50%;
`;

export const BasePrimaryButton = styled(BaseButton)<{ width?: number , py: number}>`
  width: ${props => props.width ? props.width + 'px' : '100%'};
  padding-top: ${props => props.py + 'px'};
  padding-bottom: ${props => props.py + 'px'};
  border-radius: 8px;
  background: #8043F9;
  color: #fff;
  text-align: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 400;
`;

export const BaseSecondaryButton = styled(BaseButton) <{ width?: number, py: number }>`
  width: ${props => props.width ? props.width + 'px' : '100%'};
  padding-top: ${props => props.py + 'px'};
  padding-bottom: ${props => props.py + 'px'};
  border-radius: 8px;
  background: #978AB1;
  color: #fff;
  text-align: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 400;
`;

const IndicatorButtonWrapper = styled.div`
  position: relative;
`

const IndicatorIcon = styled.div`
  position: absolute;
  top: 0;
`;

interface BaseNavIconButtonProps {
  imageUrl: string;
  children?: React.ReactNode;
  onClick?: (e?: any) => void;
}

export const BaseNavIconButton: FC<BaseNavIconButtonProps> = ({ imageUrl, children, onClick }) => {
  return (
    <SBaseNavIconButton image_url={imageUrl} onClick={onClick}>
      { children }
    </SBaseNavIconButton>
  )
}

interface IndicatorButtonProps {
  onClick?: (e?: any) => void;
}

export const IndicatorButton: FC<IndicatorButtonProps> = ({ onClick }) => {

  return (
    <IndicatorButtonWrapper>
      <BaseNavIconButton imageUrl='/icons/indicator-icon.svg' onClick={onClick}>
        <IndicatorIcon>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none">
            <path fill="#26E366" d="M24 0a24 24 0 1 0 23.048 30.692l-1.8-.523A22.126 22.126 0 1 1 24 1.875V0Z" />
          </svg>
        </IndicatorIcon>
      </BaseNavIconButton>
    </IndicatorButtonWrapper>
  )
}