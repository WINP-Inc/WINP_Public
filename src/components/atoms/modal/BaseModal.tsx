// @ts-nocheck
import React, { FC } from 'react';
import styled from 'styled-components';
import Modal, { Styles } from 'react-modal';
import media from 'styled-media-query';

const ModalHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 16px;
    font-weight: 600;
  }

  ${media.lessThan('medium')`
    margin-top: 0;
  `}
`;

const CloseButton = styled.button`
  width: 44px;
  height: 44px;
  background: transparent url('/icons/basil-cross-solid.svg') no-repeat center center;
  cursor: pointer;
  position: absolute;
  right: 0;
`;

const ModalContainer = styled.div`
  ${media.lessThan('medium')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px 0;
  `}
`

export const modalStyle = (css: React.CSSProperties, isOverlay: boolean = true): Styles => {
  return {
    overlay: {
      background: isOverlay ? 'rgba(0, 0, 0, 0.40)' : 'transparent',
      zIndex: 50,
    },
    content: css,
  };
};

interface BaseModalProps {
  isOpen: boolean;
  isCloseButton?: boolean;
  closeModal: () => void;
  title?: string;
  css: React.CSSProperties;
  children: React.ReactNode;
  isOverlay?: boolean;
  zIndex?: number;
}

const BaseModal: FC<BaseModalProps> = ({
  isOpen,
  closeModal,
  title,
  css,
  children,
  isOverlay = true,
  zIndex = 50,
  isCloseButton,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyle(css, isOverlay)}
      className='base-modal'
      shouldReturnFocusAfterClose={false}
      shouldFocusAfterRender={false}
    >
      <ModalContainer>
        <ModalHeader>
          {title && <span>{title}</span>}
          {isCloseButton && <CloseButton onClick={closeModal}></CloseButton>}
        </ModalHeader>
        {children}
      </ModalContainer>
    </Modal>
  );
};

export default BaseModal;
