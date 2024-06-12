import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import MobileSuggestedItem from './MobileSuggestedItem'
import { useChatRooms } from '../../../../../hooks/chatRooms/useChatRooms'

const GroupsWrapper = styled.div`
  background-color: #261F32;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-top: 15px;
`

const GroupsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 13px;
    color: #FFF;
    font-weight: 500;
  }

  a {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
  }
`

const GroupsBody = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
`

const GroupsItem = styled.div`
  min-width: 93px;
  a {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
    cursor: pointer;
  }

  span {
    display: block;
  }

  .group-item-title {
    font-size: 14px;
    font-weight: 500;
    display: block;
    color: #fff;
  }

  .group-item-price {
    font-size: 12px;
    font-weight: 400;
    color: #2BF896;
  }
`

const GroupsItemImg = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto;

  img {
    border-radius: 50%;
    object-fit: cover;
    position: static !important;
  }
`

const sampleSuggestedGroups = [
  {
    image: '/icons/bitcoin-logo-svgrepo-com-1.svg',
    title: 'Bitcoin bulls!!',
    price: 'Over 300BTC',
    groupId: '1'
  },
  {
    image: '/icons/bitcoin-logo-svgrepo-com-1.svg',
    title: 'Bitcoin bulls!!',
    price: 'Over 300BTC',
    groupId: '2'
  },
  {
    image: '/icons/bitcoin-logo-svgrepo-com-1.svg',
    title: 'Bitcoin bulls!!',
    price: 'Over 300BTC',
    groupId: '3'
  },
  {
    image: '/icons/bitcoin-logo-svgrepo-com-1.svg',
    title: 'Bitcoin bulls!!',
    price: 'Over 300BTC',
    groupId: '4'
  },
  {
    image: '/icons/bitcoin-logo-svgrepo-com-1.svg',
    title: 'Bitcoin bulls!!',
    price: 'Over 300BTC',
    groupId: '5'
  },
  {
    image: '/icons/bitcoin-logo-svgrepo-com-1.svg',
    title: 'Bitcoin bulls!!',
    price: 'Over 300BTC',
    groupId: '6'
  },
  {
    image: '/icons/bitcoin-logo-svgrepo-com-1.svg',
    title: 'Bitcoin bulls!!',
    price: 'Over 300BTC',
    groupId: '7'
  },
  {
    image: '/icons/bitcoin-logo-svgrepo-com-1.svg',
    title: 'Bitcoin bulls!!',
    price: 'Over 300BTC',
    groupId: '8'
  }
];

const MobileSuggestedGroups = () => {
  const { rooms, getTotalBalance } = useChatRooms();

  return (
    <GroupsWrapper>
      <GroupsContainer>
        <GroupHeader>
          <span>SUGGESTED GROUPS FOR YOU</span>
          <Link href='#'>See All</Link>
        </GroupHeader>
        <GroupsBody>
          {/* {sampleSuggestedGroups.map((group, index) => (
            <MobileSuggestedItem key={group.groupId} image={group.image} title={group.title} price={group.price} groupId={group.groupId} />
          ))} */}
          {rooms && rooms.map((room, index) => (
            <MobileSuggestedItem key={room._id} image={room.groupImage} title={room.title} price={`${getTotalBalance(room)}ETH`} groupId={room._id} />
          ))}
        </GroupsBody>
      </GroupsContainer>
    </GroupsWrapper>
  )
}

export default MobileSuggestedGroups
