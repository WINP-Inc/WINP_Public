import React, { use, useEffect, useState } from 'react'
import BaseResetPasswordModal from './reset-password/BaseResetPasswordModal'
import { useVerifyOtpModal } from '../../../../../context/modal/useAuthModal'
import AuthFormInput from '@/components/atoms/auth/AuthFormInput';

const VerifyOtpModal = () => {
  const [digits, setDigits] = useState('');
  const { modalIsOpen, closeModal } = useVerifyOtpModal();
  const [count, setCount] = useState<number>();
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [resendLink, setResendLink] = useState('');

  useEffect(() => {
    if (modalIsOpen) {
      setCount(60);
      setResendLink('Resend OTP in 60s');
      setIsResendDisabled(true);
    }
  }, [modalIsOpen])

  useEffect(() => {
    if (count && count > 0) {
      setTimeout(() => {
        setCount(count - 1);
        setResendLink(`Resend OTP in ${count}s`);
        setIsResendDisabled(true);
      }, 1000);
    } else {
      setResendLink('Resend');
      setIsResendDisabled(false);
    }
  }, [count])

  const verifyOtpAction = (event: React.MouseEvent) => {
    event.preventDefault();
    setDigits('');
    closeModal()
  }

  return (
    <BaseResetPasswordModal
      isOpen={modalIsOpen}
      closeModal={closeModal}
      modalTitle='New Login Detected'
      modalSubTitle='Please enter the OTP sent to your email'
      submitAction={verifyOtpAction}
      buttonTitle='Verify OTP'
      resendText='Resend OTP in'
      resendLink={resendLink}
      isOverlay
    > 
      <AuthFormInput type='password' placeholder='6-Digit OTP' value={digits} onChange={e => setDigits(e.target.value)} />
    </BaseResetPasswordModal>
  )
}

export default VerifyOtpModal
