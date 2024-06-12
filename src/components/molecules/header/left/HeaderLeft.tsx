import styled from "styled-components"
import React from 'react'
import { HeaderLogo } from "@/components/atoms/header/HeaderLogo";

const LogoContainer = styled.div`
  
`;

const HeaderLeft = () => {
  return (
    <LogoContainer>
      <HeaderLogo />
    </LogoContainer>
  )
}

export default HeaderLeft
