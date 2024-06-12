import BaseSettingInput from '@/components/molecules/myprofile/settings/form/BaseSettingInput'
import React from 'react'
import styled from 'styled-components'

const ConfigChangePasswordWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ConfigChangePassword = () => {
  return (
    <ConfigChangePasswordWrapper>
      <BaseSettingInput autoComplete='new-password' inputType='password' placeholder='Old Password' />
      <BaseSettingInput autoComplete='new-password' inputType='password' placeholder='New Password' />
      <BaseSettingInput autoComplete='new-password' inputType='password' placeholder='Confirm Password' />
    </ConfigChangePasswordWrapper>
  )
}

export default ConfigChangePassword
