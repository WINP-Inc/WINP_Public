// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { useCreateUserModal } from '../../../../../../context/modal/useAuthModal';
import styled from 'styled-components';
import AuthFormInput from '@/components/atoms/auth/AuthFormInput';
import AuthFormSubmitButton from '@/components/atoms/auth/AuthFormSubmitButton';
import { useRedirectPage } from '@/routes/RedirectRoute';
import { useValidationChecker } from '../../../../../../hooks/validationChecker';
import { modalStyle } from '@/components/atoms/modal/BaseModal';
import { AuthModalStyle } from '@/components/templates/auth/modal/BaseAuthStyleModal';

const CreateUserModalContainer = styled.div`
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const ModalHeadingArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  display: block;
`
const ModalSubTitle = styled.span`
  opacity: 0.3;
  font-size: 10px;
  font-weight: 400;
  line-height: 18px;
  display: block;
`

const ModalBodyArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ModalFooter = styled.div`

`

const CreateUserModal = () => {
  const { closeModal } = useCreateUserModal();
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<any | null>({ fullName: '', userName: '', email: '' });
  const { redirectPage } = useRedirectPage({ href: '/home' });
  const { validateEmptyInputs, validateEmailInput } = useValidationChecker();

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('clickHandler');

    // const fullNameError = validateEmptyInputs(fullName);
    // const userNameError = validateEmptyInputs(userName);
    // const emailError = validateEmailInput(email);

    // if (fullNameError || userNameError || emailError) {
    //   setError({ fullName: fullNameError, userName: userNameError, email: emailError });
    //   return;
    // }

    // redirectPage();
    // setEmail('');
    // setFullName('');
    // setUserName('');
  }

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      style={modalStyle(AuthModalStyle('450px'))}
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}
    >
      <CreateUserModalContainer>
        <ModalHeadingArea>
          <ModalTitle>Enter your details</ModalTitle>
          <ModalSubTitle>I’ll do it later</ModalSubTitle>
        </ModalHeadingArea>
        <ModalBodyArea>
          <AuthFormInput error={error.fullName} type='text' onChange={e => setFullName(e.target.value)} value={fullName} placeholder='Full Name' />
          <AuthFormInput error={error.userName} type='text' onChange={e => setUserName(e.target.value)} value={userName} placeholder='Username' />
          <AuthFormInput error={error.email} type='email' onChange={e => setEmail(e.target.value)} value={email} placeholder='Email' />
        </ModalBodyArea>
        <ModalFooter>
          <AuthFormSubmitButton title='Next' action={clickHandler} />
        </ModalFooter>
      </CreateUserModalContainer>
    </Modal>
  )
}

export default CreateUserModal
