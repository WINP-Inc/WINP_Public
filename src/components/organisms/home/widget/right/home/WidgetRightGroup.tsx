import BaseWidget from '@/components/molecules/widget/base-layout/BaseWidget';
import { WidgetHeader } from '@/components/molecules/widget/base-layout/WidgetHeader';
import { IndicatorsTable } from '@/components/molecules/widget/right/global-indicators/IndicatorsTable';
import SuggestedItem from '@/components/molecules/widget/right/suggest-group/SuggestedItem';
import axios from 'axios';
import React, { memo, useEffect } from 'react'
import styled from 'styled-components'
import media from 'styled-media-query';
import Image from 'next/image';
import TimeWithReloadButton from '@/components/molecules/home/global-indicator/TimeWithReloadButton';
import useFetchGlobalIndicator from '../../../../../../../hooks/globalindicator/fetchGlobalIndicator';
import { useChatRooms } from '../../../../../../../hooks/chatRooms/useChatRooms';
import { useRouter } from 'next/router';

const WidgetGroupWrapper = styled.div`

  ${media.lessThan('medium')`
    display: none;
  `}
`
const SuggestedItemWrapper = styled.div`
  margin-bottom: 26px;
  padding: 0 16px;
`;


const sampleIndicators = [
  {
    iconUrl: '/icons/bitcoin-logo-svgrepo-com-1.svg',
    name: 'Bitcoin',
    rate: '124,125',
    change: {
      value: "12.1",
      sign: 'plus'
    }
  },
  {
    iconUrl: '/icons/ethereum.svg',
    name: 'Ethereum',
    rate: '124,125',
    change: {
      value: '2.83',
      sign: 'plus'
    }
  },
  {
    iconUrl: '/icons/dogecoin-doge-icon-1.svg',
    name: 'Dogecoin',
    rate: '124,125',
    change: {
      value: '9.0',
      sign: 'minus'
    }
  },
  {
    iconUrl: '/images/image-300.png',
    name: 'TSDT',
    rate: '124,125',
    change: {
      value: '0.0',
      sign: 'unchanged'
    }
  },
]

export const hashTags = [
  {
    textColor: '#F7931A',
    text: 'Bitcoin'
  },
  {
    textColor: '#DFDFDF',
    text: 'NFT'
  },
  {
    textColor: '#2BF896',
    text: 'Stonks'
  }
]

const suggestItems = [
  {
    itemTitle: 'Bitcoin bulls!!',
    memberText: '125.12k Members',
    itemImage: '/images/bitcoin.png',
    linkUrl: '/community/chat-room/room',
    hashTags: [
      {
        textColor: '#F7931A',
        text: 'Bitcoin'
      },
      {
        textColor: '#DFDFDF',
        text: 'crypto'
      },
    ],
    itemPrice: 300
  },
  {
    itemTitle: 'Doggie owners room',
    memberText: '125.12k Members',
    itemImage: '/images/doggie-coin.png',
    linkUrl: '/community/chat-room/room',
    hashTags: [
      {
        textColor: '#F7931A',
        text: 'Doggie'
      },
      {
        textColor: '#DFDFDF',
        text: 'coin'
      },
    ],
    itemPrice: 23
  },
  {
    itemTitle: 'NFT game crush',
    memberText: '125.12k Members',
    itemImage: '/images/nft-game.png',
    linkUrl: '/community/chat-room/room',
    hashTags: [
      {
        textColor: '#F7931A',
        text: 'Game'
      },
      {
        textColor: '#DFDFDF',
        text: 'NFT'
      },
    ],
    itemPrice: 21
  },
  {
    itemTitle: 'NFT Art Owenrs!',
    memberText: '125.12k Members',
    itemImage: '/images/nft-art.png',
    linkUrl: '/community/chat-room/room',
    hashTags: [
      {
        textColor: '#F7931A',
        text: 'Art'
      },
      {
        textColor: '#DFDFDF',
        text: 'NFT'
      },
    ],
    itemPrice: 20
  },
]

export const WidgetRightGroup = memo(() => {
  const { assets } = useFetchGlobalIndicator();
  const { rooms, getAllRooms } = useChatRooms();

  useEffect(() => {
    getAllRooms();
  }, []);

  const getMembersText = (members: string[]) => {
    return `${members.length} Members`;
  };

  return (
    <WidgetGroupWrapper>
      <BaseWidget hasSeeAll={true} transition='/home/global-indicator'>
        <WidgetHeader title='GLOBAL INDICATORS'>
          <TimeWithReloadButton time='14:02:12' />
        </WidgetHeader>
        <IndicatorsTable assets={assets} />
      </BaseWidget>
      <BaseWidget hasSeeAll={true}>
        <WidgetHeader title='SUGGESTED GROUPS FOR YOU' />
        <SuggestedItemWrapper>
          {
            rooms.map((item, index) => {
              return <SuggestedItem
                key={index}
                itemTitle={item.title}
                memberText={getMembersText(item.members)}
                itemImage={item.groupImage}
                linkUrl={`/community/chat-room/${item._id}`}
                hashTags={[]}
                itemPrice={item.totalBalance}
              />
            })
          }
        </SuggestedItemWrapper>
      </BaseWidget>
    </WidgetGroupWrapper>
  )
});

WidgetRightGroup.displayName = 'WidgetRightGroup';

export default WidgetRightGroup;
