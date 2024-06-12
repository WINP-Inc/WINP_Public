import HeaderLayout from '@/components/organisms/header/HeaderLayout'
import React, { FC } from 'react'
import { styled } from 'styled-components'
import media from 'styled-media-query'

const BaseAuthLayoutWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url('/icons/coin2.png'), url('/icons/coin3.png'), url('/icons/coin4.png'), url('/icons/coin1.png');
  background-position: bottom left, top 80% right, top -10% left, bottom -20% right 0;
  background-repeat: no-repeat;
  background-size: 50% cover;
  background-color: #1F152E;
  position: relative;
`

const MainTitleArea = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  max-width: 1000px;

  h1 {
    text-align: center;
    font-size: 64px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.64px;
  }

  span {
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    margin-bottom: 34px;
    display: block;
  }

  ${media.lessThan('medium')`
    h1 {
      font-size: 28px;
    }
  `}
`

interface BaseAuthLayoutProps {
  children: React.ReactNode
}

const BaseAuthLayout: FC<BaseAuthLayoutProps> = ({ children }) => {
  return (
    <BaseAuthLayoutWrapper>
      <HeaderLayout isAuth />
      <MainTitleArea>
        <span>WELCOME TO WINP</span>
        <h1>Unleashing the power of
          decentralization
</h1>
      </MainTitleArea>
      { children }
    </BaseAuthLayoutWrapper>
  )
}

export default BaseAuthLayout
