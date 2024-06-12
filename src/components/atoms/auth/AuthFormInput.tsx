import React, { ChangeEvent, FC, useEffect, useRef } from 'react'
import { css, styled } from 'styled-components'

const baseAuthFormStyles = css`
  color: #FFF;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  padding: 12px 10px 10px 16px;
  height: 52px;
  width: 100%;
  border-radius: 8px;
  background: #302A43;
  border: none;
  outline: none;

  &.error {
    border: solid 1px #982626;
  }

  &::placeholder {
    opacity: 0.4;
  }
`;

const BaseAuthFormInput = styled.input`
  ${baseAuthFormStyles}
`;

const BaseAuthFormSelector = styled.select<{ isEmpty?: boolean }>`
  ${baseAuthFormStyles}
  cursor: pointer;

  ${({ isEmpty }) => isEmpty && css`
    color: rgba(255, 255, 255, 0.2);
  `}

  option {
    color: #fff;
  }
`;

interface AuthFormInputProps {
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string | null;
  value: string | null;
}

const AuthFormInput: FC<AuthFormInputProps> = ({ type, placeholder, required, onChange, value, error }) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error && ref.current) {
      ref.current.classList.add('error');
    } else if (ref.current) {
      ref.current.classList.remove('error');
    }
  }, [error])

  return <BaseAuthFormInput
    type={type}
    value={value || ''}
    placeholder={placeholder}
    onChange={onChange}
    required={required}
    ref={ref}
  />
}

export default AuthFormInput;

interface AuthFormSelectorProps {
  options: any[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  isValueEmpty?: boolean;
  placeholder?: string;
}

export const AuthFormSelector: FC<AuthFormSelectorProps> = ({ options, onChange, isValueEmpty, placeholder }) => {
  return (
    <BaseAuthFormSelector
      onChange={onChange}
      isEmpty={isValueEmpty}
    >
      {options.map((option, index) => (
        <>
          {
            option.value === '' ? (
              <option value="" selected hidden>{placeholder}</option>
            ) : (
              <option key={index} value={option.value}>{option.label}</option>
            )
          }
        </>
      ))}
    </BaseAuthFormSelector>
  )
}
