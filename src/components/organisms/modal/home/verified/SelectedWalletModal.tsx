import ContinueWithServiceButton from '@/components/molecules/auth/ContinueWithServiceButton';
import BaseAuthAccountModal from '@/components/templates/auth/modal/BaseAuthAccountModal';
import React, { FC, memo } from 'react'
import styled from 'styled-components';
import { useWalletServices } from '../../../../../../context/wallet/WalletConnect';

interface SelectWalletModalProps {
  connectedWalletServices: {
    name: string;
    iconSrc: string;
    action: () => void;
  }[];
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const ModalHeader = styled.div`
  text-align: center;

  span {
    display: block;
    font-size: 24px;
    font-weight: 700;
    line-height: normal;
  }
`

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const SelectedWalletModal: FC<SelectWalletModalProps> = memo(({ connectedWalletServices }) => {
  const { isOpenBySelectedWallets, closeBySelectedWallets } = useWalletServices();

  return (
    <BaseAuthAccountModal
      isOpen={isOpenBySelectedWallets}
      closeModal={closeBySelectedWallets}
      width='400px'
    >
      <ModalContainer>
        <ModalHeader>
          <span>Choose your wallet</span>
        </ModalHeader>
        <ModalBody>
          {connectedWalletServices.map((service, index) => {
            return (
              <ContinueWithServiceButton key={index} serviceName={service} />
            )
          })}
        </ModalBody>
      </ModalContainer>
    </BaseAuthAccountModal>
  )
})

SelectedWalletModal.displayName = 'SelectedWalletModal';
export default SelectedWalletModal
