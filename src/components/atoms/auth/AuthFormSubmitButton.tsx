import React, { FC } from 'react'
import { styled } from 'styled-components'

const BaseSubmitButton = styled.button`
  width: 100%;
  height: 52px;
  padding: 12px 10px 10px 16px;
  background: #8043F9;
  border-radius: 100px;
  color: var(--gv-sys-light-on-primary, #FFF);
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.1px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    opacity: .8;
  }

  &:disabled {
    opacity: .4;
  }
`;

interface AuthFormSubmitButtonProps {
  title: string;
  action: (...args: any[]) => void;
  disabled?: boolean
}

const AuthFormSubmitButton: FC<AuthFormSubmitButtonProps> = ({ title, action, disabled }) => {
  return <BaseSubmitButton disabled={disabled} onClick={action}>{title}</BaseSubmitButton>
}

export default AuthFormSubmitButton
