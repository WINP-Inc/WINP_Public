// @ts-nocheck
import { modalStyle } from '@/components/atoms/modal/BaseModal';
import React, { FC, useEffect } from 'react'
import Modal from 'react-modal'
import { styled } from 'styled-components';
import { useVerifyAccountModal } from '../../../../../context/modal/useAuthModal';

const VerifyModalContainer = styled.div`
  padding: 32px;
  text-align: left;
`

const ModalTitle = styled.span`
  color: #FFF;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 20px;
  display: block;
`

const VerifyContent = styled.div`
  font-weight: 400;
  line-height: 180.5%;
  opacity: .8;
  font-size: 16px;

  span {
    color: #fff;
    display: block;

    &:first-child {
      margin-bottom: 12px;
    }
  }

  a {
    color: #8043F9;

    &:hover {
      text-decoration: underline;
    }
  }
`

interface BaseVerifyAccountModalProps {
  verifyText: string;
  verifyLinkText: string;
}

const BaseVerifyAccountModal: FC<BaseVerifyAccountModalProps> = ({ verifyLinkText, verifyText }) => {
  const { modalIsOpen, closeModal } = useVerifyAccountModal();
  const [count, setCount] = React.useState(60);

  useEffect(() => {
    const timer: NodeJS.Timeout | null = count > 0 ? setInterval(() => setCount(count - 1), 1000) : null;
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [count]);

  const resendHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('resendHandler');
    setCount(60);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={modalStyle({
        width: '614px',
        height: 'auto',
        position: 'relative',
        borderRadius: '12px',
        backgroundColor: '#261F32',
        border: 'none',
        padding: '0',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        overflow: 'inherit'
      })}
    >
      <VerifyModalContainer>
        <ModalTitle>Verify Your Account</ModalTitle>
        <VerifyContent>
          <span>We have sent a verification link to your email. Please click on the link to have your WINP account verified.</span>
          <span>Didn’t get the verification link?
            <a href="#" onClick={resendHandler}>
              {count > 0 ? ` Resend in ${count}` : ' Resend'}
            </a></span>
        </VerifyContent>
      </VerifyModalContainer>
    </Modal>
  )
}

export default BaseVerifyAccountModal