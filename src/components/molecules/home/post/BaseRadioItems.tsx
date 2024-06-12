import BaseRadioElement from '@/components/atoms/radio/BaseRadioElement';
import React, { FC } from 'react';
import styled from 'styled-components';

const BaseRadioItemsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

interface BaseRadioItemsProps {
  radioItems?: string[];
  activeTarget: string;
  onRadioChange: (label: any) => void;
}

const BaseRadioItems: FC<BaseRadioItemsProps> = ({ radioItems, activeTarget, onRadioChange }) => {
  return (
    <BaseRadioItemsWrapper>
      {radioItems?.map((label, index) => (
        <BaseRadioElement
          key={index}
          isActive={activeTarget === label}
          label={label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}
          onChange={() => onRadioChange(label)}
        />
      ))}
    </BaseRadioItemsWrapper>
  );
};

export default BaseRadioItems;
