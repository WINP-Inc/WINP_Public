import BaseModal from '@/components/atoms/modal/BaseModal';
import React, { FC } from 'react'
import Modal from 'react-modal';
import { AuthModalStyle } from './BaseAuthStyleModal';
import styled from 'styled-components';

const BaseAuthAccountModalContainer = styled.div`
  padding: 28px;
`

interface BaseAuthAccountModalProps {
  isOpen: boolean;
  closeModal: () => void;
  width?: string;
  height?: string;
  children: React.ReactNode
}

const BaseAuthAccountModal: FC<BaseAuthAccountModalProps> = ({ isOpen, closeModal, width, height, children }) => {
  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      css={AuthModalStyle(width, height)}
    >
      <BaseAuthAccountModalContainer>
        { children }
      </BaseAuthAccountModalContainer>
    </BaseModal>
  )
}

export default BaseAuthAccountModal
