import Image from 'next/image';
import React, { FC } from 'react'
import styled from 'styled-components';

interface BaseSettingInputProps {
  inputType: string;
  placeholder: string;
  icon?: string;
  name?: string;
  autoComplete?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWrapper = styled.div`
  padding: 12px 10px 10px 16px;
  border-radius: 8px;
  background: #302A43;
  display: flex;
  align-items: center;
`

const BaseInput = styled.input`
  outline: none;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  color: #fff;
  width: calc(100% - 24px);

  &::placeholder {
    opacity: 0.3;
  }
`

const InputIconWrapper = styled.div`
  cursor: pointer;
  width: 21.637px;
  height: 21.637px;

  img {
    position: static !important;
  }
`

const BaseSettingInput: FC<BaseSettingInputProps> = ({ inputType, placeholder, icon, autoComplete, name, value, onChange }) => {
  return (
    <InputWrapper>
      <BaseInput type={inputType} placeholder={placeholder} autoComplete={autoComplete} name={name} value={value} onChange={onChange} />
      {icon && (
        <InputIconWrapper>
          <Image layout='fill' alt='input-icon' src={icon} />
        </InputIconWrapper>
      )}
    </InputWrapper>
  )
}

export default BaseSettingInput
