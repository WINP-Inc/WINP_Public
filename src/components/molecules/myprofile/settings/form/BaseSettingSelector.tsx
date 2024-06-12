import React, { FC } from 'react'
import styled from 'styled-components';
import Image from 'next/image';

interface BaseSettingSelectorProps {
    flag: string;
    title: string;
    isSelected: boolean;
    handleLanguageChange: (language: string) => void;
}

const SettingItemWrapper = styled.div`
  padding-top: 16px;
  background: #261F32;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`

const SettingItemLeft = styled.div`
  span {
    font-size: 14px;
    display: block;
    font-weight: 400;
    line-height: 18px;
    margin-left: 10px;
  }
`;

const ImageWrapper = styled.div`
    width: 20px;
    height: 20px;
    position: relative;
    `

const SettingItemRight = styled.div`
    margin-left: auto;
`

const CheckIcon = styled.div`
    width: 16px;
    height: 16px;
    position: relative;
`

const BaseSettingSelector: FC<BaseSettingSelectorProps> = ({ flag, title, isSelected, handleLanguageChange }) => {
    return (
        <SettingItemWrapper onClick={() => handleLanguageChange(flag)}>
            <ImageWrapper>
                <Image alt='flag-icon' src={`/icons/${flag}.svg`} height={20} width={20} />
            </ImageWrapper>
            <SettingItemLeft>
                <span>{title}</span>
            </SettingItemLeft>
            <SettingItemRight>
                { isSelected && <CheckIcon>
                    <Image alt='check-icon' src='/icons/check.svg' height={16} width={16} />
                </CheckIcon>}
            </SettingItemRight>
        </SettingItemWrapper>
    )
}

export default BaseSettingSelector
