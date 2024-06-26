import { FC } from "react";
import styled from "styled-components";

const StyledSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;  // Rounded slider

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;  // Rounded knob
  }
`;

const VerifiedSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + ${StyledSlider} {
      background-color: #8043F9;
    }

    &:focus + ${StyledSlider} {
      box-shadow: 0 0 1px #8043F9;
    }

    &:checked + ${StyledSlider}:before {
      -webkit-transform: translateX(12px);
      -ms-transform: translateX(12px);
      transform: translateX(12px);
    }
  }
`;

interface SliderProps {
  checked: boolean;
  handleChange: (e?: any) => void;
}

export const Slider: FC<SliderProps> = ({ checked, handleChange }) => {
  return (
    <VerifiedSwitch>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <StyledSlider />
    </VerifiedSwitch>
  )
}