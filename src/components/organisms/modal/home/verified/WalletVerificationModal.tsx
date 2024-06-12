import React, { FC, memo, useEffect } from 'react'
import BaseAuthModal from '../../auth/BaseAuthModal';
import BaseAuthAccountModal from '@/components/templates/auth/modal/BaseAuthAccountModal';
import styled from 'styled-components';
import { useWalletServices } from '../../../../../../context/wallet/WalletConnect';

const ModalTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 28px;
`

const ModalTitle = styled.div`
  text-align: left;

  span {
    font-size: 24px;
    font-weight: 700;
    display: block;
  }
`

const ModalText = styled.div`
  text-align: left;

  span {
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
    display: block;
    opacity: 0.6;
  }
`

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  button {
    width: 172px;
    padding: 12px 10px 10px 16px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.1px;
    cursor: pointer;
    color: #FFF;
    
    
    &:first-child {
      background: #302A43;
    }

    &:nth-child(2) {
      background: #8043F9;
    }
  }
`

const WalletVerificationModal: FC = memo(() => {
  const { isOpenByConnectedConfirmModal, closeByConnectedConfirmModal, openByConnectedConfirmModal, openBySelectedWallets } = useWalletServices();

  const openSelectedWallets = () => {
    closeByConnectedConfirmModal();
    openBySelectedWallets();
  }

  return (
    <BaseAuthAccountModal
      isOpen={isOpenByConnectedConfirmModal}
      closeModal={closeByConnectedConfirmModal}
      width='366px'
    >
      <ModalTextWrapper>
        <ModalTitle>
          <span>Wallet Verification</span>
        </ModalTitle>
        <ModalText>
          <span>To create a safe investment environment, WINP requires wallet authentication to post analysis about Crypto & NFT</span>
        </ModalText>
      </ModalTextWrapper>
      <ModalFooter>
        <button onClick={closeByConnectedConfirmModal}>Cancel</button>
        <button onClick={openSelectedWallets}>Connect</button>
      </ModalFooter>
    </BaseAuthAccountModal>
  )
});
WalletVerificationModal.displayName = 'WalletVerificationModal';

export default WalletVerificationModal
