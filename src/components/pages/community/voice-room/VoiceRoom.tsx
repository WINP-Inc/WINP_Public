import { VoiceRoomItemListType } from '@/components/organisms/comunity/voiceRoom/VoiceRoomItemList';
import VoiceRooms from '@/components/organisms/comunity/voiceRoom/VoiceRooms';
import BaseLayout from '@/components/templates/BaseLayout'
import { headerHeight, headerNavOptions } from '@/components/templates/header/customHeaderNav'
import React from 'react'
import styled from 'styled-components'

const VoiceRoomWrapper = styled.div`
`;

const VoiceRoomContainer = styled.div`
  width: 100%
`;

const voiceRooms: VoiceRoomItemListType[] = [
  {
    title: 'Host',
    voiceRoomItems: [
      {
        accountIcon: '/icons/ellipse-27.svg',
        accountName: 'Devanshu Bajracharya'
      }
    ],
    acceptItems: [
      {
        accountName: 'Devanshu Bajracharya',
        accountIcon: '/icons/ellipse-27.svg',
      }
    ]
  },
  {
    title: 'Speakers',
    voiceRoomItems: [
      {
        accountIcon: '/icons/ellipse-27.svg',
        accountName: 'Devanshu Bajracharya'
      },
      {
        accountIcon: '/icons/ellipse-27.svg',
        accountName: 'Devanshu Bajracharya'
      },
      {
        accountIcon: '/icons/ellipse-27.svg',
        accountName: 'Devanshu Bajracharya'
      },
      {
        accountIcon: '/icons/ellipse-27.svg',
        accountName: 'Devanshu Bajracharya'
      },
    ],
  },
  {
    title: 'Listeners',
    voiceRoomItems: [
      {
        accountIcon: '/icons/ellipse-27.svg',
        accountName: 'Devanshu Bajracharya'
      },
      {
        accountIcon: '/icons/ellipse-27.svg',
        accountName: 'Devanshu Bajracharya'
      },
      {
        accountIcon: '/icons/ellipse-27.svg',
        accountName: 'Devanshu Bajracharya'
      },
      {
        accountIcon: '/icons/ellipse-27.svg',
        accountName: 'Devanshu Bajracharya'
      },
      {
        accountIcon: '/icons/ellipse-27.svg',
        accountName: 'Devanshu Bajracharya'
      },
      {
        accountIcon: '/icons/ellipse-27.svg',
        accountName: 'Devanshu Bajracharya'
      },
      {
        accountIcon: '/icons/ellipse-27.svg',
        accountName: 'Devanshu Bajracharya'
      },
      {
        accountIcon: '/icons/ellipse-27.svg',
        accountName: 'Devanshu Bajracharya'
      },
    ],
  },
];


const VoiceRoom = () => {
  return (
    <BaseLayout
      headerNavList={[
        headerNavOptions.home.navItem(),
        headerNavOptions.chart.navItem(),
        headerNavOptions.liveCommActive.navItem(),
        headerNavOptions.market.navItem(),
      ]}
    >
      <VoiceRoomWrapper>
        <VoiceRoomContainer>
          <VoiceRooms voiceRooms={voiceRooms} />
        </VoiceRoomContainer>
      </VoiceRoomWrapper>
    </BaseLayout>
  )
}

export default VoiceRoom;
