// @ts-nocheck
import { modalStyle } from '@/components/atoms/modal/BaseModal';
import React, { FC } from 'react'
import Modal from 'react-modal'
import { UseModalType } from '../../../../../../hooks/useModal';
import styled from 'styled-components';
import AuthFormSubmitButton from '@/components/atoms/auth/AuthFormSubmitButton';
import { AuthModalStyle } from '@/components/templates/auth/modal/BaseAuthStyleModal';

const ModalContainer = styled.div`
  text-align: left;
  padding: 28px;
`;

const ModalTitleArea = styled.div`
  margin-bottom: 8px;

  span {
    display: block;
    font-size: 24px;
    font-weight: 700;
    line-height: normal;
    color: #FFF;
  }
`

const ModalSubTitleArea = styled.div`
  span {
    display: block;
    color: #FFF;
    font-size: 14px;
    opacity: 0.6;
    font-weight: 400;
    line-height: normal;
  }
`;

const ModalBody = styled.div`
  margin-top: 28px;
`

const ModalButtonArea = styled.div`
  margin-top: 12px;
`

const ResendLinkArea = styled.div`
  margin-top: 12px;
  text-align: center;

  span {
    display: block;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.1px;

    a {
      cursor: pointer;
      color: #9797DE;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`

interface BaseResetPasswordModalProps {
  isOpen: boolean;
  closeModal: () => void;
  modalTitle: string;
  modalSubTitle?: string;
  buttonTitle: string;
  submitAction: (e?: any) => void;
  isOverlay?: boolean;
  children?: React.ReactNode;
  resendText?: string;
  resendLink?: string
}

const BaseResetPasswordModal: FC<BaseResetPasswordModalProps> = ({ isOpen = false, closeModal, children, modalTitle, modalSubTitle, buttonTitle, submitAction, resendText, resendLink, isOverlay = false }) => {

  return (
    <Modal
      style={modalStyle(AuthModalStyle('400px', 'auto'), isOverlay)}
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}
    >
      <ModalContainer>
        <ModalTitleArea><span>{modalTitle}</span></ModalTitleArea>
        <ModalSubTitleArea><span>{modalSubTitle}</span></ModalSubTitleArea>
        {
          children && (
            <ModalBody>
              {children}
            </ModalBody>
          )
        }
        <ModalButtonArea>
          <AuthFormSubmitButton title={buttonTitle} action={submitAction} />
        </ModalButtonArea>
        {
          resendLink && resendText && (
            <ResendLinkArea>
              <span>{resendText} <a>{resendLink}</a></span>
            </ResendLinkArea>
          )
        }
      </ModalContainer>
    </Modal>
  )
}

export default BaseResetPasswordModal
