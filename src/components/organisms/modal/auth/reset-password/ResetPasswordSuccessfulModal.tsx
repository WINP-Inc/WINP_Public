import React from 'react'
import BaseResetPasswordModal from './BaseResetPasswordModal'
import { useResetPasswordSuccessfulModal } from '../../../../../../context/modal/useAuthModal';

const ResetPasswordSuccessfulModal = () => {
  const { modalIsOpen, closeModal } = useResetPasswordSuccessfulModal();

  return (
    <BaseResetPasswordModal
      modalTitle='Password Reset Successful!'
      buttonTitle='Login'
      submitAction={() => {}}
      isOpen={modalIsOpen}
      closeModal={closeModal}
    >
      
    </BaseResetPasswordModal>
  )
}

export default ResetPasswordSuccessfulModal
