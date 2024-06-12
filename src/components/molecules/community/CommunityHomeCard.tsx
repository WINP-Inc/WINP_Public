import Image from 'next/image'
import React, { FC } from 'react'
import { styled } from 'styled-components'
import { LiveStreamType } from '@/types/community/LiveStreamType'
import { useRouter } from 'next/navigation'

export interface CommunityHomeItemCardType {
  room: LiveStreamType;
}

const VoiceItemWrapper = styled.a`
  display: block;
  border-radius: 12px;

  &:hover {
    opacity: .8;
  }
`;

const ItemViewArea = styled.div`
  width: 100%;
  margin-bottom: 12px;
  height: 231px;

  img {
    width: 100% !important;
    position: static !important;
    object-fit: cover;
    border-radius: 12px;
  }
`

const ItemFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ItemTitleWithIcon = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 36px !important;
    position: static !important;
    border-radius: 50%;
  }
`

const ItemTitleArea = styled.div`
  span {
    color: #fff;
    line-height: normal;
    display: block;
    margin-left: 8px;

    &:first-child {
      font-size: 16px;
      font-weight: 500;
    }

    &:last-child {
      opacity: .8;
      font-size: 12px;
      font-weight: 400;
    }
  }
`;

const ViewIconArea = styled.div`
  display: flex;
  align-items: center;

  span {
    display: block;
    font-size: 12px;
    color: #fff;
    opacity: .8;
    font-weight: 400;
    margin-left: 5px;
  }

  img {
    width: 16px !important;
    position: static !important;
  }
`

const CommunityHomeItemCard: FC<CommunityHomeItemCardType> = ({
  room
}) => {
  const router = useRouter();

  const getViewers = (viewers: number): string => {
    if (viewers >= 1000) {
      return viewers / 1000 + 'k';
    } else {
      return viewers.toString();
    }
  }

  const handleOnClick = () => {
    if (room.streamType === 'chatroom') {
      router.push(`/community/chat-room/${room._id}`);
    } else if (room.streamType === 'audioroom') {
      router.push(`/community/voice-room/${room.id}`);
    } else {
      router.push(`/community/live-streams/${room.id}`);
    }
  }

  return (
    <VoiceItemWrapper onClick={handleOnClick}>
      <ItemViewArea>
        <Image layout="fill" src='/images/rectangle-828109.png' alt="thumbnail-img" />
      </ItemViewArea>
      <ItemFooter>
        <ItemTitleWithIcon>
          <Image layout="fill" src={room.admin.image || room.groupImage} alt='user-icon' />
          <ItemTitleArea>
            <span>{room.title}</span>
            <span>{room.admin.username}</span>
          </ItemTitleArea>
        </ItemTitleWithIcon>
        <ViewIconArea>
          <Image layout="fill" alt='view-icon' src='/icons/eye.svg' />
          <span>{getViewers(room.members ? room.members.length : 0)}</span>
        </ViewIconArea>
      </ItemFooter>
    </VoiceItemWrapper>
  )
}

export default CommunityHomeItemCard