import { ILocalAudioTrack, ILocalVideoTrack, createScreenVideoTrack, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import { useVideoPlayer } from "../../context/community/VideoPlayer"
import { useEffect, useState } from "react";

const useScreenVideoTrack = createScreenVideoTrack(
  {
    encoderConfig: '1080p_2',
    optimizationMode: 'detail',
  },
  'enable'
);

const getVideoTrack = (tracks: ILocalVideoTrack | [ILocalVideoTrack, ILocalAudioTrack]): ILocalVideoTrack | null => {
  if (!tracks) {
    return null;
  }
  return Array.isArray(tracks) ? tracks[0] : tracks;
}

export const useScreenSharing = () => {
  const { userRole } = useVideoPlayer();
  const { tracks: screenTracks, ready } = useScreenVideoTrack();
  const videoTrack = getVideoTrack(screenTracks);

  const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

  const { ready: cameraReady, tracks: cameraTracks } = useMicrophoneAndCameraTracks();

  const [screenShare, setScreenShare] = useState(false);

  return { screenTracks, videoTrack, ready, cameraReady, screenShare, setScreenShare };
}
