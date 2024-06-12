import BaseLayout from '@/components/templates/BaseLayout'
import { headerNavOptions } from '@/components/templates/header/customHeaderNav'
import React from 'react'
import { CreateUserProvider } from '../../../../../context/modal/useAuthModal'
import CreateUserModal from '@/components/organisms/modal/auth/create-user/CreateUserModal'

const CreateUser = () => {
  return (
    <CreateUserProvider>
      <BaseLayout headerNavList={[
        headerNavOptions.home.navItem(),
        headerNavOptions.chart.navItem(),
        headerNavOptions.liveComm.navItem()
      ]}>
        <CreateUserModal />
      </BaseLayout>
    </CreateUserProvider>
  )
}

export default CreateUser
