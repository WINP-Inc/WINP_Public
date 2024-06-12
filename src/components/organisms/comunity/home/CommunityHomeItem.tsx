import CommunityHomeItemCard from '@/components/molecules/community/CommunityHomeCard';
import Link from 'next/link';
import React, { FC } from 'react'
import { styled } from 'styled-components'
import { LiveStreamType } from '@/types/community/LiveStreamType';
import media from 'styled-media-query';

const VoiceRoomItemContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  gap: 40px;

  ${media.lessThan('medium')`
    display: flex;
    flex-direction: column;
  `}
`

interface CommunityHomeItemProps {
  rooms?: LiveStreamType[] | null;
}

const CommunityHomeItem: FC<CommunityHomeItemProps> = ({ rooms }) => {
  return (
    <VoiceRoomItemContainer>
      {
        rooms?.map((room) => {
          return (
            <li key={room.id}>
              <CommunityHomeItemCard
                room={room}
              />
            </li>
          )
        })
      }
    </VoiceRoomItemContainer>
  )
}

export default CommunityHomeItem