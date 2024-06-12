import { UserType } from "../user/UserType";

export interface SystemChatMessage {
  content: string;
  time: Date;
  user: 'SYSTEM' | 'USER';
}

export interface SystemChatType {
  messages: SystemChatMessage[];
  roomName: string;
  user: UserType;
  createdAt?: string;
  updatedAt?: string;
}