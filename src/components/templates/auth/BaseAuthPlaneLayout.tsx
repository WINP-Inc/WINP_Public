import React, { FC } from 'react'
import styled from 'styled-components'

const BaseAuthLayoutWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #1F152E;
`

interface BaseAuthPlaneLayoutProps {
  children: React.ReactNode
}

const BaseAuthPlaneLayout: FC<BaseAuthPlaneLayoutProps> = ({ children }) => {
  return (
    <BaseAuthLayoutWrapper>
      { children }
    </BaseAuthLayoutWrapper>
  )
}

export default BaseAuthPlaneLayout
