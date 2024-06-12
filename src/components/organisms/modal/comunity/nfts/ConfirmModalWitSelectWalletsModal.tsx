import React, { FC, useEffect, useState } from 'react'
import { useWalletServices } from '../../../../../../context/wallet/WalletConnect';
import SelectedWalletModal from '../../home/verified/SelectedWalletModal';
import WalletVerificationModal from '../../home/verified/WalletVerificationModal';

/**
 * ConfirmModalWithSelectedWalletsModal
 * @param onAuthenticationComplete
 *  - Callback function to be called after authentication is completed
*/
interface ConfirmModalWithSelectedWalletsModalProps {
  onAuthenticationComplete?: (...params: any[]) => void;
}

const ConfirmModalWithSelectedWalletsModal: FC<ConfirmModalWithSelectedWalletsModalProps> = ({ onAuthenticationComplete }) => {
  const { SignUpWithCoinBase, SignUpWithWallet, connectMetamask } = useWalletServices();

  const walletServices = [
    {
      name: 'Metamask',
      iconSrc: '/icons/icon-metamask.svg',
      action: async () => {
        if (onAuthenticationComplete) {
          await connectMetamask(onAuthenticationComplete);
        } else {
          console.log('else connect')
          await connectMetamask();
        }

        console.log('connected metamask')
      }
    },
    {
      name: 'WalletConnect',
      iconSrc: '/icons/wallet.png',
      action: async () => {
        if (onAuthenticationComplete) {
          await SignUpWithWallet(onAuthenticationComplete);
        } else {
          await SignUpWithWallet();
        }
      }
    },
    {
      name: 'Coinbase',
      iconSrc: '/icons/icon-coinbase.svg',
      action: async () => {
        if (onAuthenticationComplete) {
          await SignUpWithCoinBase(onAuthenticationComplete);
        } else {
          await SignUpWithCoinBase();
        }
      }
    },
  ];
  return (
    <div>
      <SelectedWalletModal connectedWalletServices={walletServices} />
      <WalletVerificationModal />
    </div>
  )
}


export default ConfirmModalWithSelectedWalletsModal
