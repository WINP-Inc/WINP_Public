import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'
import styled from 'styled-components'

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

interface Props {
  image: string;
  title: string;
  price: string;
  groupId: string;
}

const MobileSuggestedItem: FC<Props> = ({ image, title, price, groupId }) => {
  return (
    <GroupsItem>
      <Link href={`/community/chat-room/${groupId}`}>
        <GroupsItemImg>
          <Image layout='fill' alt='groups-item-img' src={image} />
        </GroupsItemImg>
        <span className='group-item-title'>{title}</span>
        <span className='group-item-price'>{price}</span>
      </Link>
    </GroupsItem>
  )
}

export default MobileSuggestedItem
