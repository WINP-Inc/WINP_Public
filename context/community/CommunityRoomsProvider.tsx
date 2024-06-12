import { LiveStreamType } from '@/types/community/LiveStreamType';
import React, { FC, createContext, useContext } from 'react'
import { useLivestream } from '../Livestream';
import { useRouter } from 'next/navigation';
import { useChatRooms } from '../../hooks/chatRooms/useChatRooms';


export interface CommunityRoomsType {
  type: 'livestream' | 'chatroom' | 'audioroom';
  title: string;
  categories: string[] | null;
  rooms: LiveStreamType[] | null;
  createRoom: (roomName: string, category: string) => void;
}

const defaultCommunityRoomsValue: CommunityRoomsType = {
  type: 'livestream',
  title: '',
  categories: [],
  rooms: [],
  createRoom: () => {}
}

const CommunityRoomsContext = createContext<CommunityRoomsType>(defaultCommunityRoomsValue)

export function useCommunityRooms() {
  return useContext(CommunityRoomsContext)
}

interface CommunityRoomProviderProps {
  type: 'livestream' | 'chatroom' | 'audioroom';
  rooms: LiveStreamType[] | null;
  children: React.ReactNode;
}

const CommunityRoomsProvider: FC<CommunityRoomProviderProps> = ({ type, children, rooms }) => {
  const router = useRouter();
  const { createLivestream, error: livestreamError } = useLivestream();
  const { createRoom: createChatRoom } = useChatRooms();

  const roomTitle = (type: string) => {
    switch (type) {
      case 'livestream':
        return 'LiveStream';
    
      case 'chatroom':
        return 'Chat room';
      
      case 'audioroom':
        return 'Voice room';

      default:
        throw new Error('Unknown')
    }
  }

  const createRoom = async (roomName: string, category: string) => {
    if (type === 'livestream') {
      const roomId = await createLivestream(roomName, category);
      if (roomId && !livestreamError) {
        router.push(`/community/live-streams/${roomId}`);
      } else {
        console.log(livestreamError, 'Livestream Error')
      }
    } else if (type === 'audioroom') {
      // const roomId = await createAudioRoom(roomName, category);
      // if (roomId && !audioRoomError) {
      //   router.push(`/community/audio-rooms/${roomId}`);
      // }
      router.push(`/community/voice-room/${1}`);
    } else if (type === 'chatroom') {
      const response = await createChatRoom(roomName, category);
      router.push(`/community/chat-room/${response.chatRoomId}`);
    } else {
      throw new Error('Unknown')
    }
  }

  return (
    <CommunityRoomsContext.Provider value={{
      type: type,
      title: roomTitle(type),
      rooms: rooms,
      categories: rooms ? rooms.map(room => room.category) : null,
      createRoom: createRoom
    }}>
      { children }
    </CommunityRoomsContext.Provider>
  )
}

export default CommunityRoomsProvider

