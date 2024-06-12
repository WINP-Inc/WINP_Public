import { ClientConfig, IAgoraRTCClient, ILocalAudioTrack, ILocalTrack, ILocalVideoTrack, createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';
import React, { FC, createContext, useContext, useEffect, useState } from 'react'
import { useLivestream } from '../Livestream';
import { getAudienceToken, getSpeakerToken } from '../../utils/getLiveToken';
import { useAuth } from '../Auth';

const config: ClientConfig = { mode: "rtc", codec: "vp8" };
const appId: string = process.env.NEXT_PUBLIC_AGORA_APP_ID as string;

export interface VideoPlayerContextType {
  client: IAgoraRTCClient | null;
  videoTrack: ILocalVideoTrack | null;
  audioTrack: ILocalAudioTrack | null;
  isScreenShared: boolean;
  isCameraEnabled: boolean;
  isSpeakerEnabled: boolean;
  roomId: string;
  userRole: string;
  setIsScreenShared: (enabled: boolean) => void;
  setIsCameraEnabled: (enabled: boolean) => void;
  setIsSpeakerEnabled: (enabled: boolean) => void;
  setClient: (client: IAgoraRTCClient) => void;
  setVideoTrack: (videoTrack: ILocalVideoTrack) => void;
  setAudioTrack: (audioTrack: ILocalAudioTrack) => void;
  // joinClient: () => void;
  // publishTracks: (track: ILocalTrack | ILocalTrack[]) => void;
  // leaveClient: () => void;
  getUserToken: (userRole: string, roomId: string) => Promise<string>;
}

const defaultVideoPlayerContext: VideoPlayerContextType = {
  userRole: '',
  isScreenShared: false,
  isCameraEnabled: false,
  isSpeakerEnabled: false,
  setIsScreenShared: () => { },
  setIsCameraEnabled: () => { },
  setIsSpeakerEnabled: () => { },
  client: null,
  setClient: () => { },
  videoTrack: null,
  setVideoTrack: () => { },
  audioTrack: null,
  setAudioTrack: () => { },
  roomId: '',
  // joinClient: () => { },
  // publishTracks: () => { },
  // leaveClient: () => { },
  getUserToken: () => Promise.resolve('')
}

const VideoPlayerContext = createContext(defaultVideoPlayerContext);

export function useVideoPlayer() {
  return useContext(VideoPlayerContext);
}

interface VideoPlayerProviderProps {
  roomId: string;
  children: React.ReactNode;
}

export const VideoPlayerProvider: FC<VideoPlayerProviderProps> = ({ children, roomId }) => {
  const [client, setClient] = useState<IAgoraRTCClient | null>(null);
  const [videoTrack, setVideoTrack] = useState<ILocalVideoTrack | null>(null);
  const [audioTrack, setAudioTrack] = useState<ILocalAudioTrack | null>(null);
  const [userRole, setUserRole] = useState<string>('')
  const [isScreenShared, setIsScreenShared] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(false);
  const { speakers, audiences, getLivestreamById, joinLivestream, leaveLivestream } = useLivestream();
  const { user } = useAuth();
  const speakerUid = speakers ? speakers.length + 1 : 0;
  const audienceUid = audiences && speakers ? audiences.length + speakers.length + 1 : 0;
  const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    const init = async () => {
      await getLivestreamById(roomId);
      await joinLivestream(roomId);
    }
    init();
    // window.addEventListener('beforeunload', () => unloadLeaveClient());
    return () => {
      // window.removeEventListener('beforeunload', () => unloadLeaveClient());
    }
  }, []);

  useEffect(() => {
    const useClient = createClient(config);
    const useSetClient = useClient();
    setClient(useSetClient);
  }, []);

  const getUserToken = async (userRole: string, roomId: string) => {
    if (userRole === 'audience') {
      const token = await getAudienceToken(audienceUid, roomId);
      return token;
    } else if (userRole === 'speaker') {
      const token = await getSpeakerToken(speakerUid, roomId);
      return token;
    } else {
      throw new Error('User role is not configured')
    }
  }


  return (
    <VideoPlayerContext.Provider value={{
      roomId: roomId,
      userRole: userRole,
      client: client,
      isScreenShared: isScreenShared,
      setIsScreenShared: setIsScreenShared,
      isCameraEnabled: isCameraEnabled,
      setIsCameraEnabled: setIsCameraEnabled,
      isSpeakerEnabled: isSpeakerEnabled,
      setIsSpeakerEnabled: setIsSpeakerEnabled,
      setClient: setClient,
      videoTrack: videoTrack,
      setVideoTrack: setVideoTrack,
      audioTrack,
      setAudioTrack,
      // joinClient: (userRole?: string) => Promise<void>,
      // publishTracks: publishTracks,
      // leaveClient: leaveClient,
      getUserToken: getUserToken,
    }}>
      {children}
    </VideoPlayerContext.Provider>
  )
}
