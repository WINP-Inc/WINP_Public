import React, { FC } from 'react'
import styled from 'styled-components';

interface RadioOptionLabelProps {
  onChange: (e?: any) => void;
  isActive: boolean;
  label: string;
}

const RadioOptionLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 12px;
  cursor: pointer;

  input {
    display: none;
  }

  label {
    font-size: 14px;
    font-weight: 400;
    
  }

  span.checkmark {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: transparent;
    border: 1px solid #fff;
    margin-right: 8px;
    position: relative;
  }

  &.active span.checkmark {
    background: transparent;
    border-color: #8043F9;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      left: 50%;
      top: 50%;
      background-color: #8043F9;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const BaseRadioElement: FC<RadioOptionLabelProps> = ({ label, isActive, onChange }) => {
  return (
    <RadioOptionLabel
      className={isActive ? 'active' : ''}
    >
      <input
        type="radio"
        name="radio"
        onChange={onChange}
      />
      <span className="checkmark"></span>
      <label>
        {label}
      </label>
    </RadioOptionLabel>
  )
}

export default BaseRadioElement
