import BaseSettingSelector from '@/components/molecules/myprofile/settings/form/BaseSettingSelector'
import React from 'react'
import styled from 'styled-components'
import { useEditProfile } from '../../../../../../context/EditProfile'

const ConfigChooseLanguageWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ConfigChooseLanguage = () => {
    const { preferredLanguage, setPreferredLanguage } = useEditProfile()
    const handleLanguageChange = (language: string) => {
        setPreferredLanguage(language)
    }
    return (
        <ConfigChooseLanguageWrapper>
            <BaseSettingSelector
                flag='English'
                title='English'
                isSelected={preferredLanguage === 'English'}
                handleLanguageChange={handleLanguageChange}
            />
            <BaseSettingSelector
                flag='Korean'
                title='Korean'
                isSelected={preferredLanguage === 'Korean'}
                handleLanguageChange={handleLanguageChange}
            />
            <BaseSettingSelector
                flag='Japanese'
                title='Japanese'
                isSelected={preferredLanguage === 'Japanese'}
                handleLanguageChange={handleLanguageChange}
            />
        </ConfigChooseLanguageWrapper>
    )
}

export default ConfigChooseLanguage;
