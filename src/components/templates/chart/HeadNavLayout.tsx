import React, { FC } from 'react';
import styled from 'styled-components';
import BaseHeadNav from '../../molecules/nav/BaseHeadNav';

const HeadNavWrapper = styled.div`
  margin-top: 30px;
`;

interface HeadNavLayoutProps {
  navTitle: string;
  navIcon: string;
  children: React.ReactNode;
  action?: (e?: any) => void;
}

const HeadNavLayout: FC<HeadNavLayoutProps> = React.memo(({ navTitle, navIcon, children, action }) => {
  return (
    <HeadNavWrapper>
      <BaseHeadNav title={navTitle} imgSrc={navIcon} action={action} />
      {children}
    </HeadNavWrapper>
  );
});

HeadNavLayout.displayName = 'HeadNavLayout';

export default HeadNavLayout;
