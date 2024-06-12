import React, { FC, use, useEffect, useRef, useState } from 'react';
import { AgoraVideoPlayer, ClientConfig, IAgoraRTCClient, IAgoraRTCRemoteUser, ICameraVideoTrack, ILocalAudioTrack, ILocalVideoTrack, IMicrophoneAudioTrack, createClient, createMicrophoneAndCameraTracks, createMicrophoneAudioTrack, createScreenVideoTrack } from "agora-rtc-react";
import styled from 'styled-components';
import ControlButton from '@/components/atoms/video/ControlButton';
import ControlAudioSlider from '@/components/atoms/video/ControlAudioSlider';
import { useAuth } from '../../../../../context/Auth';
import { useLivestream } from '../../../../../context/Livestream';
import Image from 'next/image';
import { useVideoPlayer } from '../../../../../context/community/VideoPlayer';
import { useScreenSharing } from '../../../../../hooks/community/useTracks';
import useAgora from '../../../../../hooks/community/useAgora';
import AgoraRTC from 'agora-rtc-sdk-ng';
import MediaPlayer from './MediaPlayer';

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

const appId: string = process.env.NEXT_PUBLIC_AGORA_APP_ID as string;

const VideoPlayerWrapper = styled.div`
  height: 65vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  position: relative;

  span {
    font-size: 22px;
    font-weight: 700;
    display: block;
  }

  img {
    object-fit: cover;
  }
`;

const VideoPlayerContainer = styled.div`
  /* display: grid; */
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 100%;
  height: 100%;
  grid-column-gap: 32px;
  grid-row-gap: 32px;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* padding: 20px; */

  &.zoom {
    display: block;
  }
`;

const VideoPlayerItem = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;

  .vid {
    div {
      border-radius: 20px;
    }
  }

  &:first-child {
    grid-area: 1 / 1 / 2 / 2;
  }
  &:nth-child(2) {
    grid-area: 1 / 2 / 2 / 3;
  }
  &:nth-child(3) {
    grid-area: 2 / 1 / 3 / 2;
  }
  &:nth-child(4) {
    grid-area: 2 / 2 / 3 / 3;
  }
`

const ControlWrapper = styled.div`
  position: absolute;
  left: 20px;
  bottom: 20px;
`;

const VideoControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;


export const VideoPlayer: FC<{ roomId: string }> = ({ roomId }) => {
  const { isScreenShared } = useVideoPlayer();
  const {
    localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers
  } = useAgora(client);

  return (
    <>
      {isScreenShared ? (
        <ScreenVideo />
      ) : (
        <CameraVideo roomId={roomId} />
      )}
    </>
  )
}

const CameraVideo = ({ roomId }: { roomId: string }) => {
  const { getUserToken } = useVideoPlayer();
  const { setCurrentLiveStreamId } = useLivestream();

  const { localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers } = useAgora(client);

  useEffect(() => {
    (async () => {
      const token = await getUserToken('speaker', roomId);
      setCurrentLiveStreamId(roomId);
      await join(appId, roomId, token);
    }
    )();
  }, [join, roomId, getUserToken])

  return localAudioTrack || localVideoTrack ? (
    <VideoWrapper>
      <MediaPlayer videoTrack={localVideoTrack} audioTrack={localAudioTrack}></MediaPlayer>
      {remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid}>
        <p className='remote-player-text'>{`remoteVideo(${user.uid})`}</p>
        <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer>
      </div>))}
      <Controls ready={true} />
    </VideoWrapper>
  ) : (
    <DisabledVideo ready={true} />
  )
}

const ScreenVideo = () => {
  const { videoTrack, ready, screenShare } = useScreenSharing();


  return ready && videoTrack ? (
    <VideoWrapper>
      <AgoraVideoPlayer style={{ height: '100%', width: '100%' }} className='vid' videoTrack={videoTrack} />
      <Controls ready={ready} />
    </VideoWrapper>
  ) : (
    <DisabledVideo ready={ready} />
  )
}

const DisabledVideo = (props: { ready?: boolean }) => {
  const { ready } = props;
  return (
    <VideoWrapper>
      <Image alt='dummy-img' layout='fill' src={'/images/init-stream-view.png'} />
      <Controls ready={ready} />
    </VideoWrapper>
  )
}

const VideoWrapper = (props: {
  children: React.ReactNode;
}) => {
  const { children } = props;

  return (
    <VideoPlayerWrapper>
      <VideoPlayerContainer id="videos">
        <VideoPlayerItem>
          {children}
        </VideoPlayerItem>
      </VideoPlayerContainer>
    </VideoPlayerWrapper>
  )
}

const Controls = (props: { ready?: boolean }) => {
  const { ready } = props;
  const { isScreenShared, setIsScreenShared, isCameraEnabled, isSpeakerEnabled, setIsSpeakerEnabled } = useVideoPlayer();

  return (
    <ControlWrapper>
      <VideoControlsWrapper>
        <ControlButton
          imgSrc={'/icons/speaker.svg'}
          action={() => { setIsSpeakerEnabled(!isSpeakerEnabled) }}
          isEnabled={isSpeakerEnabled}
          ready={ready}
        >
          {isSpeakerEnabled && (
            <ControlAudioSlider
              min="0"
              max="1000"
              step="0.01"
              baseColor='#5B5762'
              activeColor='#fff'
            />
          )}
        </ControlButton>
        <ControlButton
          imgSrc={'/icons/camera.svg'}
          action={() => { }}
          isEnabled={isCameraEnabled}
          ready={ready}
        />
        <ControlButton
          imgSrc={'/icons/screen-share.svg'}
          action={() => { setIsScreenShared(!isScreenShared) }}
          isEnabled={isScreenShared}
          ready={ready}
        />
      </VideoControlsWrapper>
    </ControlWrapper>
  );
}
