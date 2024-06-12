import { IAgoraRTCRemoteUser } from "agora-rtc-react";
import { UserType } from "../user/UserType";

export type MessageType = {
  content: string;
  time: Date;
  user: UserType;
}

export interface LiveStreamType {
  id: string;
  _id?: string;
  admin: UserType;
  title: string;
  groupImage: string;
  audience: LiveStreamUser[] | null;
  members?: LiveStreamUser[] | null;
  speakers: LiveStreamUser[] | null;
  moderators: LiveStreamUser[] | null;
  category: string;
  description: string;
  liveStreamImage: string;
  status: 'live' | 'ended';
  type: 'audio' | 'video';
  messages: MessageType[];
  banned?: LiveStreamUser[] | null;
  streamType: 'livestream' | 'audioroom' | 'chatroom';
  createdAt: string;
  updatedAt: string;
}

export type LiveStreamUser = {
  id: string;
  username: string;
  fullName: string;
  image: string;
}

export type LiveStreamRemoteUser = LiveStreamUser & IAgoraRTCRemoteUser;
