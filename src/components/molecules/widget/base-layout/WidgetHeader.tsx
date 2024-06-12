import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'

const SWidgetHeader = styled.div`
  height: 54px;
  display: flex;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 16px;
  line-height: 60px;
`

const WidgetHeaderLeft = styled.div`
  h3 {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1.4px;
  }
`;

const WidgetHeaderRight = styled.div`
  
`

interface WidgetHeaderProps {
  title: string,
  children?: ReactNode
}

export const WidgetHeader: FC<WidgetHeaderProps> = ({ title, children }) => {
  return (
    <SWidgetHeader>
      <WidgetHeaderLeft>
        <h3>{title}</h3>
      </WidgetHeaderLeft>
      <WidgetHeaderRight>
        {children}
      </WidgetHeaderRight>
    </SWidgetHeader>
  )
}
