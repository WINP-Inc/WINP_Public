import React, { memo, useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image';
import BaseSettingInput from '@/components/molecules/myprofile/settings/form/BaseSettingInput';
import { useEditProfile } from '../../../../../../context/EditProfile';

const EditProfileCardWrapper = styled.div`
  margin-top: 16px;
`

const EditProfileCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EditProfileCardImageArea = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  label {
    display: inline-block;
    padding: 12px;
    border-radius: 8px;
    background: #302A43;
    border: none;
    cursor: pointer;
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    color: #fff;

    &:hover {
      opacity: 0.8;
    }

    input[type="file"] {
      display: none;
    }
  }
`;

const EditProfileCardImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 8px;

  img {
    position: static !important;
    object-fit: cover;
  }
`;

const EditProfileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EditProfileCard = () => {
  const { uploadProfileImage, imageUrl, setImageUrl, fullName, username, email, handleOnChange } = useEditProfile();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const response = await uploadProfileImage(file);
    setImageUrl(response[0]?.url || '');
  };


  return (
    <EditProfileCardWrapper>
      <EditProfileCardContainer>
        <EditProfileCardImageArea>
          <EditProfileCardImageWrapper>
            <Image layout='fill' alt='user-icon' src={imageUrl} />
          </EditProfileCardImageWrapper>
          <label htmlFor='upload-img'>
            Upload New Picture
            <input type="file" id='upload-img' accept='image/*' onChange={handleFileChange} />
          </label>
        </EditProfileCardImageArea>
        <EditProfileInputWrapper>
          <BaseSettingInput inputType='text' placeholder='Full Name' name='fullName' value={fullName} onChange={handleOnChange} />
          <BaseSettingInput inputType='text' placeholder='Username' name='username' value={username} onChange={handleOnChange} />
          <BaseSettingInput inputType='email' placeholder='Email' value={email} />
        </EditProfileInputWrapper>
      </EditProfileCardContainer>
    </EditProfileCardWrapper>
  )
}

export default memo(EditProfileCard)
