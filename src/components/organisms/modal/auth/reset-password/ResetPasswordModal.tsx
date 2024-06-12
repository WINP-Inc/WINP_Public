import React, { FC, useEffect, useState } from 'react'
import BaseResetPasswordModal from './BaseResetPasswordModal'
import { useResetPasswordModal, useResetPasswordSuccessfulModal } from '../../../../../../context/modal/useAuthModal'
import styled from 'styled-components';
import AuthFormInput from '@/components/atoms/auth/AuthFormInput';

const InputItem = styled.div`
  margin-bottom: 12px;
`

const ResetPasswordModal: FC = () => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { modalIsOpen: resetPasswordIsOpen, setIsOpen: setResetPasswordIsOpen, closeModal } = useResetPasswordModal();
  const { setIsOpen: setResetPasswordSuccessfulIsOpen } = useResetPasswordSuccessfulModal();

  const onClickAction = (event: React.MouseEvent) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      return;
    }

    closeModal();
    setResetPasswordSuccessfulIsOpen(true);
  }

  useEffect(() => { setResetPasswordIsOpen(true) }, [setResetPasswordIsOpen])
  useEffect(() => {
    console.log(error)
  }, [error, setResetPasswordIsOpen])

  return (
    <BaseResetPasswordModal
      modalSubTitle='Set new password'
      modalTitle='Reset Password'
      buttonTitle='Reset Password'
      submitAction={onClickAction}
      isOpen={resetPasswordIsOpen}
      closeModal={closeModal}
    >
      <InputItem><AuthFormInput type='password' placeholder='New Password' value={password} onChange={e => setPassword(e.target.value)} /></InputItem>
      <InputItem><AuthFormInput type='password' placeholder='Repeat Password' value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} /></InputItem>
    </BaseResetPasswordModal>
  )
}

export default ResetPasswordModal
