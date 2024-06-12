import Link from 'next/link';
import React, { FC } from 'react'
import styled from 'styled-components'

const WidgetContainer = styled.div`
  border-radius: 16px;
  background: #261F32;
  margin-bottom: 20px;
  padding-bottom: 20px;
`;

const WidgetBody = styled.div`
  width: 100%;
`

const WidgetFooter = styled.div`
  width: 100%;
  display: flex;

  a {
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    opacity: 0.7;
    margin-left: auto;
    margin-right: 16px;
  }
`;

interface BaseWidgetProps {
  children: React.ReactNode;
  hasSeeAll?: boolean;
  transition?: string; 
}

const BaseWidget: FC<BaseWidgetProps> = ({ children, hasSeeAll, transition }) => {
  return (
    <WidgetContainer>
      <WidgetBody>
        { children }
      </WidgetBody>
      {
        hasSeeAll && transition &&
        <WidgetFooter>
          <Link href={transition}>See All</Link>
        </WidgetFooter>
      }
    </WidgetContainer>
  )
}

export default BaseWidget
