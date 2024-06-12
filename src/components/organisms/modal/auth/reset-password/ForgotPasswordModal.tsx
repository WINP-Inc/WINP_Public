// @ts-nocheck
import AuthFormInput from '@/components/atoms/auth/AuthFormInput';
import AuthFormSubmitButton from '@/components/atoms/auth/AuthFormSubmitButton';
import { AuthModalStyle } from '@/components/templates/auth/modal/BaseAuthStyleModal';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react'
import Modal from 'react-modal';
import styled from 'styled-components';
import { useForgotPasswordModal, useSignInModal, useVerifyOtpModal } from '../../../../../../context/modal/useAuthModal';
import { modalStyle } from '@/components/atoms/modal/BaseModal';

const ModalContainer = styled.div`
  padding: 28px 52px;
`

const ModalHeadingArea = styled.div`
  margin-bottom: 24px;
  text-align: left;
`;

const ModalHeadingButton = styled.div`
  display: inline-block;
  cursor: pointer;

  &:hover {
    opacity: .8;
  }

  img {
    width: 20px !important;
    position: static !important;
  }
`

const ModalTitleArea = styled.div`
  margin-bottom: 28px;
  text-align: left;

  span {
    display: block;

    &:first-child {
      font-size: 24px;
      font-weight: 700;
      line-height: normal;
      margin-bottom: 8px;
    }

    &:nth-child(2) {
      font-size: 14px;
      opacity: 0.6;
      font-weight: 400;
      line-height: normal;
    }
  }
`;

const ModalFormArea = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const VerifyContent = styled.div`
  font-weight: 400;
  line-height: 180.5%;
  opacity: .8;
  font-size: 16px;

  span {
    color: #fff;
    display: block;
    line-height: normal;
  }

  a {
    color: #8043F9;

    &:hover {
      text-decoration: underline;
    }
  }
`

const ForgotPasswordModal: FC = () => {
  const [email, setEmail] = useState('');
  const { modalIsOpen, setIsOpen, closeModal } = useForgotPasswordModal();
  const { setIsOpen: setIsOpenByVerifyOtp } = useVerifyOtpModal();
  const [count, setCount] = useState(60);
  const [isShowVerify, setIsShowVerify] = useState(false);

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => setCount(count - 1), 1000);
    }
  }, [count]);

  const clickGoBack = () => {
    closeModal();
    // setIsOpenSignIn(true);
  }

  const onSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(false)
    setEmail('');
    closeModal();
    setIsOpenByVerifyOtp(true);
    setIsShowVerify(true);
  }

  return (
    <Modal
      style={modalStyle(AuthModalStyle('450px', 'auto'))}
      onRequestClose={closeModal}
      isOpen={modalIsOpen}
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}
    >
      <ModalContainer>
        <ModalHeadingArea>
          <ModalHeadingButton onClick={clickGoBack}>
            <Image layout="fill" src='/icons/arrow-left.svg' alt='arrow-button' />
          </ModalHeadingButton>
        </ModalHeadingArea>
        <ModalTitleArea>
          <span>Forgot Password?</span>
          <span>We will send the password reset link to your email.</span>
        </ModalTitleArea>
        <ModalFormArea>
          <form>
            <AuthFormInput placeholder='Enter your email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
            <AuthFormSubmitButton title='Reset Password' action={onSubmit} />
          </form>
        </ModalFormArea>
      </ModalContainer>
    </Modal>
  )
}

export default ForgotPasswordModal
