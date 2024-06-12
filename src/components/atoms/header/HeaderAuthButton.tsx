import React, { FC } from 'react'
import { styled } from 'styled-components'

const BaseAuthButton = styled.div<{ bgcolor: string, border?: string }>`
  padding: 10px 20px;
  color: #fff;
  background-color: ${props => props.bgcolor};
  font-size: 18px;
  font-weight: 500;
  letter-spacing: .9px;
  line-height: normal;
  border: ${props => props.border ? props.border : 'none'};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: .8;
  }
`

interface HeaderAuthButtonProps {
  buttonType: string;
  onClick?: () => void;
}

const HeaderAuthButton: FC<HeaderAuthButtonProps> = ({ buttonType, onClick }) => {
  return (
    <>
      {buttonType === 'login' ? (
        <BaseAuthButton bgcolor="transparent" border={'solid 1px #fff'} onClick={onClick}>
          Login
        </BaseAuthButton>
      ) : buttonType === 'signUp' ? (
        <BaseAuthButton bgcolor="#8043F9" onClick={onClick}>
          Sign Up
        </BaseAuthButton>
      ) : null}
    </>
  );
};

export default HeaderAuthButton
