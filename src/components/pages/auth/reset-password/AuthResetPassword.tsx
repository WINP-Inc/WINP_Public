import ResetPasswordModal from '@/components/organisms/modal/auth/reset-password/ResetPasswordModal'
import BaseAuthPlaneLayout from '@/components/templates/auth/BaseAuthPlaneLayout'
import React from 'react'
import { ResetPasswordProvider, ResetPasswordSuccessfulProvider } from '../../../../../context/modal/useAuthModal'
import ResetPasswordSuccessfulModal from '@/components/organisms/modal/auth/reset-password/ResetPasswordSuccessfulModal'

const AuthResetPassword = () => {
  return (
    <ResetPasswordProvider>
      <ResetPasswordSuccessfulProvider>
        <BaseAuthPlaneLayout>
          <ResetPasswordModal/>
          <ResetPasswordSuccessfulModal />
        </BaseAuthPlaneLayout>
      </ResetPasswordSuccessfulProvider>
    </ResetPasswordProvider>
  )
}

export default AuthResetPassword
