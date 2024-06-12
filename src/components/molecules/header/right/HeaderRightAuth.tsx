import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import { useAuth } from '../../../../../context/Auth'
import HeaderAuthButton from '@/components/atoms/header/HeaderAuthButton';
import { useSignInModal, useSignUpModal } from '../../../../../context/modal/useAuthModal';

const HeaderRightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const HeaderRightAuth = () => {
  const { openModal: openSignUpModal } = useSignUpModal();
  const { openModal: openSignInModal } = useSignInModal();

  return (
    <HeaderRightWrapper>
      <HeaderAuthButton onClick={openSignInModal} buttonType='login' />
      <HeaderAuthButton onClick={openSignUpModal} buttonType='signUp' />
    </HeaderRightWrapper>
  )
}

export default HeaderRightAuth

