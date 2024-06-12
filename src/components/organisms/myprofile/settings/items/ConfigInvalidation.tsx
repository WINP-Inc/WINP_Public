import BaseSettingItem from '@/components/molecules/myprofile/settings/form/BaseSettingItem'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../../../../../../context/Auth'

const ConfigInvalidationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;
`

const LinkText = styled.div`
  span {
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
  }
`

const LinkIconButton = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: relative;

  img {
    position: static !important;
    object-fit: cover;
  }

  span {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -14px;
    font-size: 8px;
    overflow: visible;
    display: block;
  }
`

const ConfigInvalidation = () => {
  const [isCopied, setIsCopied] = useState(false);
  const textLinkRef = useRef<HTMLSpanElement>(null);
  const { user } = useAuth();

  const copyText = () => {
    const textLink = textLinkRef.current?.innerText;
    if (textLink) {
      navigator.clipboard.writeText(textLink)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 2000);
        })
        .catch(err => {
          console.error('クリップボードへのコピーに失敗しました：', err);
        });
    }
  }

  return (
    <BaseSettingItem title='My Referral Link'>
      <ConfigInvalidationWrapper>
        <LinkText><span ref={textLinkRef}>{user?.inviteCode}</span></LinkText>
        <LinkIconButton onClick={copyText}>
          <Image layout='fill' alt='copy-icon' src='/icons/bxs-copy.svg' />
          {isCopied && <span>Copied!</span>}
        </LinkIconButton>
      </ConfigInvalidationWrapper>
    </BaseSettingItem>
  )
}

export default ConfigInvalidation
