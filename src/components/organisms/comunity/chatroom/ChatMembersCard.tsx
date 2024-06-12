import Image from 'next/image';
import React, { FC } from 'react'
import { styled } from 'styled-components'

const CardWrapper = styled.div`
  border-radius: 20px;
  background-color: #261F32;
  width: 100%;
`

const CardHeader = styled.div`
  padding: 21px;

  span {
    font-size: 18px;
    font-weight: 600;
    opacity: 0.8;
  }
`

const CardBody = styled.div`
  padding: 30px 20px;
`;

const CardItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }

  img {
    width: 40px !important;
    border-radius: 40px;
    position: static !important;
  }

  span {
    font-size: 16px;
    color: #D2D2D2;
    font-weight: 400;
    opacity: 0.8;
  }
`


export interface ChatRoomMemberItem {
  _id: string
  fullName: string;
  image: string;
  username: string;
}

interface ChatMemberCardProps {
  chatMembers: any[]
}


const ChatMembersCard: FC<ChatMemberCardProps> = ({ chatMembers }) => {
  return (
    <CardWrapper>
      <CardHeader>
        <span>Chatroom members</span>
      </CardHeader>
      <CardBody>
        <ul>
          {
            chatMembers.map((member, index) => {
              return (
                <CardItem key={index}>
                  <Image layout="fill"  alt='accountIcon' src={member.image} />
                  <span>{member.fullName}</span>
                </CardItem>
              )
            })
          }
        </ul>
      </CardBody>
    </CardWrapper>
  )
}

export default ChatMembersCard