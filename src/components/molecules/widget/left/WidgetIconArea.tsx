import React, { FC, memo } from 'react'
import BaseWidget from '../base-layout/BaseWidget'
import { styled } from 'styled-components'
import BaseAvatar from '@/components/atoms/avatar/BaseAvatar'
import { useRouter } from 'next/navigation'

const WidgetIconAreaWrapper = styled.div`

`

const IconWrapper = styled.div`
  padding: 11px 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  background: #261F32;
  margin-bottom: 20px;
  border-radius: 16px;

  span {
    color: #FFF;
    font-size: 16px;
    font-weight: 600;
    margin-left: 12px;
    display: block;
  }
`

type WidgetIconAreaProps = {
  userIcon: string,
  userName: string
}

const WidgetIconArea: FC<WidgetIconAreaProps> = memo(({ userIcon, userName }) => {
  const router = useRouter();

  const onClickAccount = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/myprofile');
  }

  return (
    <WidgetIconAreaWrapper>
      <IconWrapper onClick={onClickAccount}>
        <BaseAvatar size={52} url={userIcon} />
        <span>{userName}</span>
      </IconWrapper>
    </WidgetIconAreaWrapper>
  )
});

WidgetIconArea.displayName = 'WidgetIconArea'

export default WidgetIconArea
