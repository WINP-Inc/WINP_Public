import Image from 'next/image';
import React, { FC, useState } from 'react'
import styled from 'styled-components'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '@/styles/datepicker/custom.css';

const BaseVerifiedInputWrapper = styled.div<{ width?: string }>`
  position: relative;
  width: ${props => props.width ? props.width : '100%'};

  img {
    width: 20px !important;
    height: 20px !important;
    position: absolute !important;
    top: 50% !important;
    transform: translateY(-50%);
    left: 12px !important;
    z-index: 10;
  }

  input, select {
    width: 100%;
    padding: 18px 12px 18px 36px;
    border-radius: 8px;
    outline: none;
    border: none;
    background-color: #302A43;
    font-size: 12px;
    line-height: normal;
    font-weight: 400;
    color: #fff;

    &::placeholder {
      color: #848E9C;
    }
  }

  select {
    cursor: pointer;
  }
`

interface BaseVerifiedInputProps {
  type?: string;
  width?: string;
  value: any;
  icon: string;
  placeholder: string;
  disabled?: boolean;
  options?: Array<{ value: string, label: string }>;
  required?: boolean;
  onChange: (e: any) => void;
}

const BaseVerifiedInput: FC<BaseVerifiedInputProps> = ({ value, width, type, icon, placeholder, disabled, options, required, onChange }) => {
  return (
    <BaseVerifiedInputWrapper width={width}>
      <Image layout='fill' alt='icon' src={icon} />
      {type === 'date' ? (
        <DatePicker
          selected={value}
          onChange={(date: Date) => onChange(date)}
          dateFormat="yyyy/MM/dd"
          placeholderText={placeholder}
          icon={icon}
          required={required}
        />
      ) : type === 'select' ? (
          <select value={value} onChange={onChange} required={required}>
          {options && options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
          <input value={value} type={type ? type : 'text'} placeholder={placeholder} disabled={disabled} onChange={onChange} required={required} />
      )}
    </BaseVerifiedInputWrapper>
  )
}

export default BaseVerifiedInput
