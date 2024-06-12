import styled from "styled-components"
import HeaderMiddle from "@/components/molecules/header/middle/HeaderMiddle";
import HeaderLeft from "@/components/molecules/header/left/HeaderLeft";
import media from 'styled-media-query'
import HeaderRight from "@/components/molecules/header/right/HeaderRight";
import React, { FC } from "react";
import HeaderRightAuth from "@/components/molecules/header/right/HeaderRightAuth";
import { HeaderNavItem } from "@/components/molecules/header/middle/nav/HeaderNav";
import { useModal } from "../../../../hooks/useModal";
import { SuggestedGroupItemType } from "@/types/suggested-groups/suggestedGroupType";
import { SearchProvider } from "../../../../context/search/Search";

const SHeaderLayout = styled.header<{ bgcolor?: string, border?: string }>`
  background-color: ${props => props.bgcolor ? props.bgcolor : 'transparent'};
  height: 79px;
  display: flex;
  border-bottom: ${props => props.border ? props.border : 'none'};

  ${media.lessThan('medium')`
    border: none;
    height: 60px;
    padding-top: 5px;
  `}
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 60px;
  box-sizing: content-box;

  ${media.lessThan('medium')`
    padding-left: 16px;
    padding-right: 16px;
    gap: 11px;
  `}
`;

interface HeaderLayoutProps {
  headerNavList?: HeaderNavItem[],
  isAuth?: boolean
}

const HeaderLayout: FC<HeaderLayoutProps> = React.memo(({ headerNavList, isAuth = false }) => {
  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        {isAuth ? (
          <SHeaderLayout>
            <HeaderContainer>
              <HeaderLeft />
              <HeaderRightAuth />
            </HeaderContainer>
          </SHeaderLayout>
        ) : (
          <SHeaderLayout border={'solid 1px #27203D'} bgcolor={'#17121F'}>
              <HeaderContainer>
                <HeaderLeft />
                {headerNavList && <HeaderMiddle headerNavList={headerNavList} />}
                <HeaderRight />
              </HeaderContainer>
            </SHeaderLayout>
        )}
      </div>
    </>
  )
})

HeaderLayout.displayName = 'HeaderLayout';

export default HeaderLayout;


