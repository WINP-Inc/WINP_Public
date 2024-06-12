import styled from "styled-components"
import media from 'styled-media-query'
import HeaderLayout from "../organisms/header/HeaderLayout";
import React, { FC, useEffect } from "react";
import { HeaderNavItem, HeaderNavListType } from "../molecules/header/middle/nav/HeaderNav";
import { headerHeight } from "./header/customHeaderNav";
import LlmModal from "../organisms/modal/llm/LlmModal";
import { LlmModalManagerProvider } from "../../../context/llm/LlmModalManager";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/Auth";
import { useDeviceType } from "../../../hooks/windowSize";
import MobileFooter from "./footer/MobileFooter";

const BaseLayoutWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  font-family: Poppins;
`

export const BaseLayoutContainer = styled.div`
  padding-left: 60px;
  padding-right: 60px;

  ${media.lessThan('medium')`
    padding-left: 16px;
    padding-right: 16px;
  `}
`;

export const BaseLayoutFlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 30px;

  ${media.lessThan('medium')`
    display: block;
  `}
`

const HeaderWrapper = styled.div`
  width: 100%;
  position: fixed;
  z-index: 20;
`;

const BaseLayoutBodyContainer = styled.div`
  padding: 0 60px;
  position: absolute;
  top: ${headerHeight.lg};
  width: 100%;

  ${media.lessThan('medium')`
    padding: 0 16px;
    top: ${headerHeight.sm};
  `}
`

type BaseLayoutProps = {
  headerNavList: HeaderNavItem[]
  children: React.ReactNode
}

const BaseLayout: FC<BaseLayoutProps> = ({ children, headerNavList }) => {
  const { isMobile } = useDeviceType();

  return (
    <LlmModalManagerProvider>
      <BaseLayoutWrapper>
        <HeaderWrapper>
          <HeaderLayout headerNavList={headerNavList} />
        </HeaderWrapper>
        <BaseLayoutBodyContainer>
          {children}
        </BaseLayoutBodyContainer>
        <LlmModal />
        {isMobile && <MobileFooter />}
      </BaseLayoutWrapper>
    </LlmModalManagerProvider>
  )
}

export default BaseLayout;