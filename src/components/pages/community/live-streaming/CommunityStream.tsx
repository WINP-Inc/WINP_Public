import React, { FC } from 'react'
import { styled } from 'styled-components'
import BaseContainer from '../../../atoms/container/BaseContainer';
import Image from 'next/image';
import BaseLayout  from '../../../templates/BaseLayout';
import LiveStreamChat from '@/components/organisms/comunity/LiveStreamChat';
import { headerNavOptions } from '@/components/templates/header/customHeaderNav';
import { HeaderNavItem } from '@/components/molecules/header/middle/nav/HeaderNav';
import { VideoPlayer } from '@/components/organisms/comunity/video/LiveStreamingVideoPlayer';
import { IAgoraRTCRemoteUser } from 'agora-rtc-react';
import { VideoPlayerProvider } from '../../../../../context/community/VideoPlayer';
import { useProtectedRoute } from '@/routes/protectedRoute';

const headerNavList: HeaderNavItem[] = [
  headerNavOptions.home.navItem(),
  headerNavOptions.chart.navItem(),
  headerNavOptions.liveCommActive.navItem(),
  headerNavOptions.market.navItem(),
]

const CommunityStreamContainer = styled.div`
  margin-top: 28px;
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 30px;
  padding-left: 60px;
  padding-right: 60px;
  width: 100%;

  img {
    position: static !important;
  }
`;

const ContentLeft = styled.div`
  width: 66.6%;
`

const ADSectionArea = styled.div`
  width: 100%;
  height: 147px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    display: block;
    font-size: 14px;
    font-weight: 400;
  }
`

const ContentRight = styled.div`
  text-align: center;
`


interface CommunityStreamProps {
  roomId: string;
}
const CommunityStream: FC<CommunityStreamProps> = ({ roomId }) => {

  return (
    <VideoPlayerProvider roomId={roomId}>
      <BaseLayout headerNavList={headerNavList}>
        <CommunityStreamContainer>
          <ContentLeft>
            <BaseContainer width='100%' mb='20px'>
              <VideoPlayer roomId={roomId} />
            </BaseContainer>
            <BaseContainer width='100%' mb='20px'>
              <ADSectionArea><span>ad section</span></ADSectionArea>
            </BaseContainer>
          </ContentLeft>
          <ContentRight>
            <LiveStreamChat />
          </ContentRight>
        </CommunityStreamContainer>
      </BaseLayout>
    </VideoPlayerProvider>
  )
}

export default CommunityStream
