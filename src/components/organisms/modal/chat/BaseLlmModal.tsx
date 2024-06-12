// @ts-nocheck
import Image from 'next/image'
import Modal, { Styles } from 'react-modal'
import { styled } from 'styled-components'
import React, { FC } from 'react';
import { useLlmChat } from '../../../../../hooks/useLlmChat';
import { useModal } from '../../../../../hooks/useModal';
import LlmHistoryModal from '../llm/LlmHistoryModal';
import { useLlmModalManager } from '../../../../../context/llm/LlmModalManager';

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-bottom: 1px solid #3C3551;
`

const ModalHeaderLeft = styled.div`
  span {
    color: #FFF;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`

const ModalHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
`

const BaseHeadButton = styled.button`
  border-radius: 50%;
  background-color: #3C3551;
  text-align: center;
  width: 24px;
  height: 24px;
  cursor: pointer;

  img {
    width: 16px !important;
    position: static !important;
  }
`

const ModalBody = styled.div``

interface BaseLlmModalProps {
  title: string;
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  styles: Styles
  isOverlay?: boolean
}

const BaseLlmModal: FC<BaseLlmModalProps> = ({ styles, title, isOpen, closeModal, children, isOverlay }) => {
  const { openByHistoryModal } = useLlmModalManager();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={styles}
      contentLabel='content modal'
      shouldCloseOnOverlayClick={isOverlay}
      ariaHideApp={false}
    >
      <ModalHeader>
        <ModalHeaderLeft>
          <span>{title}</span>
        </ModalHeaderLeft>
        <ModalHeaderRight>
          <BaseHeadButton onClick={closeModal}>
            <Image layout="fill" src='/icons/system-uicons-cross-key.svg' alt='closed icon' />
          </BaseHeadButton>
          <BaseHeadButton onClick={openByHistoryModal}>
            <Image layout="fill" src='/icons/system-uicons-reload.svg' alt='closed icon' />
          </BaseHeadButton>
          <BaseHeadButton onClick={closeModal}>
            <Image layout="fill" src='/icons/system-uicons-hyphen.svg' alt='closed icon' />
          </BaseHeadButton>
        </ModalHeaderRight>
      </ModalHeader>
      <ModalBody>
        {children}
      </ModalBody>
    </Modal>
  )
}

export default BaseLlmModal;
