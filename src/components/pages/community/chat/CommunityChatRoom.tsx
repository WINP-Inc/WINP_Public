import React, { useEffect } from 'react'
import BaseLayout from '@/components/templates/BaseLayout';
import { headerNavOptions } from '@/components/templates/header/customHeaderNav';
import { styled } from 'styled-components';
import BaseCommunityChat from '@/components/templates/community/BaseCommunityChat';
import ChatMembersCard, { ChatRoomMemberItem } from '@/components/organisms/comunity/chatroom/ChatMembersCard';
import BaseSideWidget from '@/components/organisms/comunity/nft-sales/BaseSideWidget';
import { useChatRooms } from '../../../../../hooks/chatRooms/useChatRooms';
import { useAuth } from '../../../../../context/Auth';
import media from 'styled-media-query';

const ChartRoomWrapper = styled.div`
  margin-top: 22px;
  display: flex;
  align-items: center;
  gap: 30px;
  width: 100%;
`

const ChartRoomContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: top;
  gap: 30px;

  ${media.lessThan('medium')`
    display: block;
    margin-bottom: 120px;
  `}
`

const ChartRoomLeft = styled.div`
  width: 66%;
  max-width: 867px;

  ${media.lessThan('medium')`
    width: 100%;
    height: 100%;
  `}
`
const ChartRoomRight = styled.div`
  width: 32%;

  ${media.lessThan('medium')`
    display: none;
  `}
`

type CommunityChatRoomProps = {
  roomId: string;
};

const CommunityChatRoom: React.FC<CommunityChatRoomProps> = ({ roomId }) => {
  const { room, chatHistory, addMemberToRoom } = useChatRooms(roomId);
  const { user } = useAuth();

  useEffect(() => {
    if (room) {
      addMemberToRoom(user._id);
    }
  }, [room])

  return (
    <BaseLayout headerNavList={[
      headerNavOptions.home.navItem(),
      headerNavOptions.chart.navItem(),
      headerNavOptions.liveCommActive.navItem(),
      headerNavOptions.market.navItem(),
    ]}>
      <ChartRoomWrapper>
        <ChartRoomContainer>
          <ChartRoomLeft>
            {room && (
              <BaseCommunityChat defaultValues={chatHistory} chatContainerWidth='100%'
                myAccountPrimary={true}
                roomId={room._id}
              />
            )}
          </ChartRoomLeft>
          <ChartRoomRight>
            {room &&
              <BaseSideWidget>
                <ChatMembersCard chatMembers={room.members.length > 0 ? room.members : [] as ChatRoomMemberItem[]} />
              </BaseSideWidget>
            }
          </ChartRoomRight>
        </ChartRoomContainer>
      </ChartRoomWrapper>
    </BaseLayout>
  )
}

export default CommunityChatRoom