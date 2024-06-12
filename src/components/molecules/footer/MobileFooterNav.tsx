import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'
import styled from 'styled-components'

const MobileFooterNavWrapper = styled.div`
  width: 62px;
  height: 62px;

  img {
    position: static !important;
  }
`

interface MobileFooterNavProps {
  icon: string;
  href?: string;
  onClick?: (e?: any) => void;
}

const MobileFooterNav: FC<MobileFooterNavProps> = ({ 
    icon,
    href,
    onClick,
  }) => {
  return (
    <MobileFooterNavWrapper>
      {href ? (
        <Link href={href}>
          <Image layout='fill' alt='footer-nav' src={icon} />
        </Link>
      ) : (
        <Image layout='fill' alt='footer-nav' src={icon} onClick={onClick} />
      )}
    </MobileFooterNavWrapper>
  )
}

export default MobileFooterNav
