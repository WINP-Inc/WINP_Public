// @ts-nocheck
import React, { FC, useEffect, useState } from 'react'
import BaseModal, { modalStyle } from '@/components/atoms/modal/BaseModal';
import { styleModalType } from '@/types/modal/styleModalType';
import { useForgotPasswordModal, useSignInModal, useSignUpModal, useVerifyAccountModal } from '../../../../../context/modal/useAuthModal';
import { UseModalType } from '../../../../../hooks/useModal';
import Modal from 'react-modal'
import { styled } from 'styled-components';
import ContinueWithServiceButton, { AuthServiceName } from '@/components/molecules/auth/ContinueWithServiceButton';
import AuthFormInput from '@/components/atoms/auth/AuthFormInput';
import AuthFormSubmitButton from '@/components/atoms/auth/AuthFormSubmitButton';
import AuthFormCheckbox from '@/components/atoms/auth/AuthFormCheckbox';
import { useAuth } from '../../../../../context/Auth';
import { useValidationChecker } from '../../../../../hooks/validationChecker';
import { useRedirectPage } from '@/routes/RedirectRoute';

const StyleModal: styleModalType = {
  lg: {
    width: '400px',
    height: 'auto',
    maxHeight: '100vh',
    position: 'relative',
    borderRadius: '12px',
    backgroundColor: '#261F32',
    border: 'none',
    padding: '0',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    overflow: 'hidden',
  },
  md: {
    width: '420px',
    height: '420px',
    position: 'relative',
    borderRadius: '12px',
    backgroundColor: '#261F32',
    border: 'none',
    padding: '0',
    top: 'calc(100% - 420px + 20px)',
    left: 'calc(100% - (420px + 60px))',
  }
}

const AuthModalContainer = styled.div`
  padding: 28px;
`

const ButtonArea = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;

  button {
    width: 24px;
    height: 24px;
    background: transparent url('/icons/basil-cross-solid.svg') no-repeat center center;
    cursor: pointer;
    margin-left: auto;
  }
`;

const TitleArea = styled.div`
  span {
    display: block;
    font-size: 24px;
    font-weight: 700;
    line-height: normal;
  }
`;

const ContinueWithServices = styled.div`
  margin: 26px 0;

  li {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const AuthFormGroups = styled.form`
`

const AuthFormTitle = styled.span`
  color: #949494;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1px;
  text-transform: uppercase;
`

const AuthInputArea = styled.div`
  margin-top: 26px;
`
const AuthInputItem = styled.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FormSubmitArea = styled.div`
  margin: 28px 0;
`;

const ConfirmTextAndLinkArea = styled.div`
  span {
    color: #FFF;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.1px;
    line-height: 18px;

    a {
      color: #9797DE;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const CheckboxArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  width: 100%;
`;

const CheckboxAreaLeft = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxTitle = styled.span`
  color: #FFF;
  display: block;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`

const CheckboxAreaRight = styled.div`
  span {
    color: #F6465D;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    vertical-align: top;
    user-select: none;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

const ErrorTextArea = styled.div`
  margin-top: 28px;

  span {
    color: #F6465D;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    display: block;
  }
`;

export interface BaseAuthModalProps {
  isOpen: boolean;
  closeModal: () => void;
  authTitle: string;
  submitAction: (e?: any) => void;
  changeAction?: (e?: any) => void;
  authServices?: AuthServiceName[] | null;
  hasCheckbox?: boolean;
}

const BaseAuthModal: FC<BaseAuthModalProps> = ({ isOpen, closeModal, authTitle, authServices, hasCheckbox, submitAction, changeAction }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { loading } = useAuth();
  const { setEmail, setPassword, email, password, error } = useAuth();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyle(StyleModal.lg)}
    >
      <ButtonArea>
        <button onClick={closeModal}></button>
      </ButtonArea>
      <AuthModalContainer>
        <TitleArea>
          <span>Welcome to WINP!</span>
        </TitleArea>

        <ContinueWithServices>
          <ul>
            {
              authServices?.map((service, index) => {
                return (
                  <li key={index}>
                    <ContinueWithServiceButton
                      serviceName={service}
                    />
                  </li>
                )
              })
            }
          </ul>
        </ContinueWithServices>
        <AuthFormGroups onSubmit={e => e.preventDefault()}>
          <AuthFormTitle>OR SIGN UP WITH Email</AuthFormTitle>
          <AuthInputArea>
            <AuthInputItem>
              <AuthFormInput
                error={error}
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='devvvbajraaa@gmail.com'
              />
            </AuthInputItem>
            <AuthInputItem>
              <AuthFormInput
                error={error}
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Set Password'
              />
            </AuthInputItem>
          </AuthInputArea>
          {hasCheckbox && (
            <CheckboxArea>
              <CheckboxAreaLeft>
                <AuthFormCheckbox checked={isChecked} onChange={() => { setIsChecked(!isChecked) }} />
                <CheckboxTitle>Stay signed in</CheckboxTitle>
              </CheckboxAreaLeft>
              <CheckboxAreaRight>
                <span onClick={() => { }}>Forgot Password?</span>
              </CheckboxAreaRight>
            </CheckboxArea>
          )}
          {
            error && (
              <ErrorTextArea>
                <span>{error}</span>
              </ErrorTextArea>
            )
          }
          <FormSubmitArea>
            {
              loading ? (
                <AuthFormSubmitButton title={'Loading ...'} action={() => { }} disabled />
              ) : (
                <AuthFormSubmitButton title={authTitle} action={submitAction} />
              )
            }
          </FormSubmitArea>
        </AuthFormGroups>
        <ConfirmTextAndLinkArea>
          <span>{authTitle === 'Sign In' ? 'Don’t have an account yet?' : 'Already have an account?'}
            <a onClick={changeAction}>{authTitle === 'Sign In' ? 'Sign Up' : 'Sign In'}</a>
          </span>
        </ConfirmTextAndLinkArea>
      </AuthModalContainer>
    </Modal>
  )
}

export default BaseAuthModal