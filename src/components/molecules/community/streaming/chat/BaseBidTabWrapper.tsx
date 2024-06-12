import React, { FC } from 'react'
import styled from 'styled-components'

const BidTabWrapper = styled.div`
  width: 100%;
  height: auto;
  background: #8043F9;
  position: absolute;
  top: 56px;
  z-index: 20;
  border-radius: 12px;
`

const BidTabContainer = styled.div`
  padding: 8px;
`

const BidTabFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
`

interface Props {
  children: React.ReactNode;
}

const BaseBidTabWrapper: FC<Props> = ({ children }) => {
  return (
    <BidTabWrapper>
      <BidTabContainer>
        <BidTabFlex>
          {children}
        </BidTabFlex>
      </BidTabContainer>
    </BidTabWrapper>
  )
}

export default BaseBidTabWrapper
