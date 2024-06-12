import Image from 'next/image'
import Link from 'next/link';
import React, { FC } from 'react'
import { styled } from 'styled-components'

interface HeadNavProps {
  imgSrc: string;
  title: string;
  action?: (e?: any) => void;
}

const NavWrapper = styled.div`
  margin-bottom: 24px;

  div {
    display: inline-flex;
    align-items: center;
    color: #FFF;

    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }

  span {
    font-size: 14px;
    font-family: Inter;
    font-weight: 600;
    letter-spacing: 0.07px;
    display: block;
    margin-left: 8px;
  }

  img {
    position: static !important;
    width: 18px !important;
    height: auto;
  }
`

const BaseHeadNav: FC<HeadNavProps> = ({ imgSrc, title, action }) => {

  return (
    <NavWrapper>
      <div onClick={action}>
        <Image layout="fill"  alt='head-nav-icon' src={imgSrc} />
        <span>{title}</span>
      </div>
    </NavWrapper>
  )
}

export default BaseHeadNav
