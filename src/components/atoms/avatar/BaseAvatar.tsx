import { styled } from "styled-components";
import React, { FC } from 'react'
import Image from "next/image";

const BaseCircularAvatar = styled.div<{ size: number, border?: string }>`
  border-radius: 50%;
  cursor: pointer;

  img {
    position: static !important;
    width: ${props => props.size + 'px'} !important;
    height: ${props => props.size + 'px'} !important;
    object-fit: cover;
    border-radius: 50%;
    border: ${props => props.border ? props.border : 'none'}};
`;

type BaseAvatarProps = {
  size: number,
  url: string,
  border?: string,
}

const BaseAvatar: FC<BaseAvatarProps> = ({ size, url, border }) => {
  return (
    <BaseCircularAvatar className="circle-avatar" size={size} border={border}>
      {url && <Image layout="fill" alt="avatar-icon" src={url} />}
    </BaseCircularAvatar>
  )
}

export default BaseAvatar

