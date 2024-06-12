import MyProfileCard, { MyProfileType } from '@/components/molecules/myprofile/MyProfileCard'
import React, { FC } from 'react'
import styled from 'styled-components';
import { hashTags } from '../home/widget/right/home/WidgetRightGroup';
import SuggestedItem from '@/components/molecules/widget/right/suggest-group/SuggestedItem';
import MyProfileSuggest from '@/components/molecules/myprofile/MyProfileSuggest';

const MyProfileLeftWrapper = styled.div`

`
const MyProfileContentItem = styled.div`
  margin-bottom: 36px;

  &:last-child {
    margin-bottom: 0;
  }
`

interface MyProfileLeftProps {
  myProfile: MyProfileType;
}

const suggestItems = [
  {
    itemTitle: 'NFT game crush',
    memberText: '125.12k Members',
    itemImage: '/images/nft-game.png',
    linkUrl: '#',
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
    linkUrl: '#',
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

const MyProfileLeft: FC<MyProfileLeftProps> = ({ myProfile }) => {
  return (
    <MyProfileLeftWrapper>
      <MyProfileContentItem>
        <MyProfileCard myProfile={myProfile} />
      </MyProfileContentItem>
      <MyProfileContentItem>
        <MyProfileSuggest suggestItems={suggestItems}/>
      </MyProfileContentItem>
    </MyProfileLeftWrapper>
  )
}

export default MyProfileLeft
