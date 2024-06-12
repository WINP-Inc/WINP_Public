import Image from 'next/image';
import React, { FC, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

export interface ProfileItemType {
  title: string;
  children?: React.ReactNode;
}

interface SettingsTitleCardProps {
  item: ProfileItemType;
}

const SettingsTitleCardWrapper = styled.div`
  width: 100%;
  padding: 16px;
  background: #261F32;
  border-radius: 8px;
  
  span {
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    display: block;
  }
`;

const SettingsTitleCardIconWrapper = styled.div`
  width: 16px;
  height: 16px;
  transition: all 0.3s ease-in-out;

  &.expand {
    transform: rotate(180deg);
  }

  img {
    position: static !important;
  }
`;

const SettingsCardBody = styled.div`
  overflow: hidden;
  transition: height 0.3s ease-in-out;
`;

const CardTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const SettingsTitleCard: FC<SettingsTitleCardProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [bodyHeight, setBodyHeight] = useState<number>(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      setBodyHeight(bodyRef.current.scrollHeight);
    }
  }, [isExpanded]);

  const handleExpanded = () => {
    if (imageRef.current) {
      imageRef.current.classList.toggle('expand');
    }
    setIsExpanded(!isExpanded);
  }

  return (
    <SettingsTitleCardWrapper>
      <CardTitleWrapper onClick={handleExpanded}>
        <span>{item.title}</span>
        <SettingsTitleCardIconWrapper ref={imageRef}>
          <Image layout='fill' alt='card-icon' src='/icons/bi-chevron-up.svg' />
        </SettingsTitleCardIconWrapper>
      </CardTitleWrapper>
      <SettingsCardBody ref={bodyRef} style={{ height: isExpanded ? `${bodyHeight}px` : '0px' }}>
        {item.children}
      </SettingsCardBody>
    </SettingsTitleCardWrapper>
  )
}

export default SettingsTitleCard;
