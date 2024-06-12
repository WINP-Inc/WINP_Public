import React, { FC } from 'react'
import styled from 'styled-components';

interface BaseSettingItemProps {
  title: string;
  children: React.ReactNode;
}

const SettingItemWrapper = styled.div`
  padding-top: 16px;
  background: #261F32;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SettingItemLeft = styled.div`
  span {
    font-size: 14px;
    display: block;
    font-weight: 400;
    line-height: 18px;
  }
`;

const SettingItemRight = styled.div`
  margin-left: auto;
`

const BaseSettingItem: FC<BaseSettingItemProps> = ({ title, children }) => {
  return (
    <SettingItemWrapper>
      <SettingItemLeft>
        <span>{title}</span>
      </SettingItemLeft>
      <SettingItemRight>
        { children }
      </SettingItemRight>
    </SettingItemWrapper>
  )
}

export default BaseSettingItem
