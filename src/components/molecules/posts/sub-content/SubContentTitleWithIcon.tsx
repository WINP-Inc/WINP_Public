import Image from 'next/image'
import React, { FC } from 'react'
import styled from 'styled-components'

const SubContentTitleWithIconContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  max-width: 200px;

  span {
    font-size: 12px;
    line-height: normal;
    font-weight: 400;
    color: #fff;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  img {
    position: static !important;
    width: 22px !important;
    height: 22px !important;
  }
`

interface SubContentTitleWithIconProps {
  icon: string
  title: string
}

const SubContentTitleWithIcon: FC<SubContentTitleWithIconProps> = ({ icon, title }) => {
  return (
    <SubContentTitleWithIconContainer>
      <Image layout="fill" alt="airdrop" src={icon} />
      <span>{title}</span>
    </SubContentTitleWithIconContainer>
  )
}

export default SubContentTitleWithIcon
