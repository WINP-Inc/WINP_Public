import React, { FC } from 'react'
import { styled } from 'styled-components'

const SBaseContainer = styled.div<{ width: string, mb: string }>`
  width: ${props => props.width};
  background: #261F32;
  border-radius: 12px;
  margin-bottom: ${props => props.mb};
`

interface BaseContainerProps {
  width: string,
  mb: string,
  children: React.ReactNode
}

const BaseContainer: FC<BaseContainerProps> = ({ width, mb, children }) => {
  return (
    <SBaseContainer width={width} mb={mb}>
      {children}
    </SBaseContainer>
  )
}

export default BaseContainer
