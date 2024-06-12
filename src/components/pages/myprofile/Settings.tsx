import SettingBody from '@/components/organisms/myprofile/settings/SettingsBody'
import BaseLayout from '@/components/templates/BaseLayout'
import { headerNavOptions } from '@/components/templates/header/customHeaderNav'
import React from 'react'
import styled from 'styled-components'

const SettingsWrapper = styled.div`
  margin-top: 54px;
  margin-bottom: 140px;
`

const SettingsContainer = styled.div`
  margin: 0 auto;
  max-width: 645px;
`;

const SettingsTitle = styled.div`
  margin-bottom: 36px;

  span {
    display: block;
    font-size: 20px;
    font-weight: 700;
    line-height: normal;
  }
`;

const SettingBodyWrapper = styled.div`

`

const Settings = () => {
  return (
    <BaseLayout
      headerNavList={[
        headerNavOptions.home.navItem(),
        headerNavOptions.chart.navItem(),
        headerNavOptions.liveComm.navItem(),
        headerNavOptions.market.navItem(),
      ]}
    >
      <SettingsWrapper>
        <SettingsContainer>
          <SettingsTitle>
            <span>Settings</span>
          </SettingsTitle>
          <SettingBodyWrapper>
            <SettingBody />
          </SettingBodyWrapper>
        </SettingsContainer>
      </SettingsWrapper>
    </BaseLayout>
  )
}

export default Settings
