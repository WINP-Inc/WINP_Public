import BaseAuthModal from '@/components/organisms/modal/auth/BaseAuthModal'
import BaseAuthLayout from '@/components/templates/auth/BaseAuthLayout'
import React, { FC, useCallback, useState } from 'react'
import { ForgotPasswordProvider, SignInProvider, SignUpProvider, VerifyOtpProvider, VerifyProvider, useForgotPasswordModal, useSignInModal, useSignUpModal, useVerifyAccountModal } from '../../../../context/modal/useAuthModal'
import BaseVerifyAccountModal from '@/components/organisms/modal/auth/BaseVerifyAccountModal'
import ForgotPasswordModal from '@/components/organisms/modal/auth/reset-password/ForgotPasswordModal'
import VerifyOtpModal from '@/components/organisms/modal/auth/VerifyOtpModal'
import { AuthServiceName } from '@/components/molecules/auth/ContinueWithServiceButton'

const Authentication: FC = () => {
  const { isOpen: isOpenBySignUp, closeModal: closeBySignUp, openModal: openBySignUp, signUp, signUpWithWallet, signUpWithCoinbase, signUpWithGoogle, signUpWithMetamask } = useSignUpModal()
    const { isOpen: isOpenBySignIn, closeModal: closeBySignIn, openModal: openBySignIn, signIn, signInWithGoogle, signInWithCoinbase, signInWithMetamask, signInWithWallet } = useSignInModal()

  const signUpServices: AuthServiceName[] = [
    {
      name: 'Google',
      iconSrc: '/icons/icon-google.svg',
      action: () => signUpWithGoogle(),
    },
    {
      name: 'Metamask',
      iconSrc: '/icons/icon-metamask.svg',
      action: () => signUpWithMetamask(),
    },
    {
      name: 'Coinbase',
      iconSrc: '/icons/coinbase-icon-symbol-11.svg',
      action: () => signUpWithCoinbase(),
    },
    {
      name: 'WalletConnect',
      iconSrc: '/icons/wallet.png',
      action: () => signUpWithWallet(),
    },
  ];
  const signInServices: AuthServiceName[] = [
    {
      name: 'Google',
      iconSrc: '/icons/icon-google.svg',
      action: () => signInWithGoogle(),
    },
    {
      name: 'Metamask',
      iconSrc: '/icons/icon-metamask.svg',
      action: () => signInWithMetamask(),
    },
    {
      name: 'Coinbase',
      iconSrc: '/icons/coinbase-icon-symbol-11.svg',
      action: () => signInWithCoinbase(),
    },
    {
      name: 'WalletConnect',
      iconSrc: '/icons/wallet.png',
      action: () => signInWithWallet(),
    },
  ];

  return (
    <VerifyProvider>
      <ForgotPasswordProvider>
        <VerifyOtpProvider>
          <BaseAuthLayout>
            <BaseAuthModal
              isOpen={isOpenBySignUp}
              closeModal={closeBySignUp}
              authTitle='Sign Up'
              authServices={signUpServices}
              submitAction={signUp}
              changeAction={openBySignIn}
            />
            <BaseAuthModal
              isOpen={isOpenBySignIn}
              closeModal={closeBySignIn}
              authTitle='Sign In'
              authServices={signInServices}
              submitAction={signIn}
              changeAction={openBySignUp}
            />
            <BaseVerifyAccountModal
              verifyText=''
              verifyLinkText=''
            />
            <ForgotPasswordModal />
            <VerifyOtpModal />
          </BaseAuthLayout>
        </VerifyOtpProvider>
      </ForgotPasswordProvider>
    </VerifyProvider>
  )
}

export default Authentication