import React, { FC } from 'react'
import { styled } from 'styled-components';

const CheckboxWrapper = styled.label`
  display: block;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  span {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    height: 16px;
    width: 16px;
    background-color: #fff;
    border-radius: 2px;
  }

  input:checked ~ span {
    background-color: #fff;
  }

  span:after {
    content: "";
    position: absolute;
    display: none;
  }

  input:checked ~ span:after {
    display: block;
  }

  span:after {
    left: 5px;
    top: 0;
    width: 5px;
    height: 10px;
    border: solid #8043F9;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

interface CheckboxProps {
  checked: boolean;
  onChange: (e?: any) => void;
}

const Checkbox: FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <CheckboxWrapper>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span></span>
    </CheckboxWrapper>
  )
}

export default Checkbox
