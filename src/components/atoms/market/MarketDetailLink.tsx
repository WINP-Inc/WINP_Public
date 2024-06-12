import Link from 'next/link'
import React, { FC } from 'react'
import styled from 'styled-components'

const MarketDetailLinkWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-left: auto;

  a {
    display: inline-block;
    color: #8043F9;
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
  }
`

interface MarketDetailLinkProps {
  href: string;
}

const MarketDetailLink: FC<MarketDetailLinkProps> = ({ href }) => {
  return (
    <MarketDetailLinkWrapper>
      <Link href={href}>See All {'>'}</Link>
    </MarketDetailLinkWrapper>
  )
}

export default MarketDetailLink
