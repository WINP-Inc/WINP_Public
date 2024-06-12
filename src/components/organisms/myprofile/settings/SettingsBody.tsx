import { ProfileItemType } from '@/components/molecules/myprofile/settings/SettingsTitleCard'
import React from 'react'
import styled from 'styled-components'
import SettingsTitleCard from '../../../molecules/myprofile/settings/SettingsTitleCard'
import EditProfileCard from './items/EditProfileCard'
import ConfigChangePassword from './items/ConfigChangePassword'
import ConfigInvalidation from './items/ConfigInvalidation'
import ConfigWalletPrivacy from './items/ConfigWalletPrivacy'
import { useEditProfile } from '../../../../../context/EditProfile'
import ConfigChooseLanguage from './items/ConfigChooseLanguage'

const SettingsBodyWrapper = styled.div`
  width: 100%;
`

const SettingsBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const SettingsFooter = styled.div`
  margin-top: 16px;

  button {
    padding: 12px 16px;
    display: inline-flex;
    gap: 8px;
    border-radius: 4px;
    background: #8043F9;
    color: #FFF;
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`

const SettingBody = () => {
  const { updateUser } = useEditProfile()
  const profileItems: ProfileItemType[] = [
    {
      title: 'Edit Profile',
      children: <EditProfileCard />
    },
    {
      title: 'Preferred Language',
      children: <ConfigChooseLanguage />
    },
    {
      title: 'Change Password',
      children: <ConfigChangePassword />
    },
    {
      title: 'Invitation',
      children: <ConfigInvalidation />
    },
    {
      title: 'Wallet Privacy',
      children: <ConfigWalletPrivacy />
    },
  ]
  return (
    <SettingsBodyWrapper>
      <SettingsBodyContainer>
        {profileItems.map((item, index) => (
          <SettingsTitleCard key={index} item={item} />
        ))}
        <SettingsFooter onClick={updateUser}>
          <button>Save Changes</button>
        </SettingsFooter>
      </SettingsBodyContainer>
    </SettingsBodyWrapper>
  )
}

export default SettingBody
