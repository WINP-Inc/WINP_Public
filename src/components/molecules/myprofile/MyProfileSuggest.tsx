import React, { FC } from 'react'
import BaseWidget from '../widget/base-layout/BaseWidget'
import SuggestedItem from '../widget/right/suggest-group/SuggestedItem'
import styled from 'styled-components'
import Image from 'next/image'

const MyProfileSuggestContainer = styled.div`
  padding: 23px;
`

const SuggestHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 14px;

  span {
    font-size: 16px;
    display: block;
    font-weight: 400;
  }

  img {
    position: static !important;
    width: 31px !important;
  }
`

interface MyProfileSuggestProps {
  suggestItems: any[]
}

const MyProfileSuggest: FC<MyProfileSuggestProps> = ({ suggestItems }) => {
  return (
    <BaseWidget>
      <MyProfileSuggestContainer>
        <SuggestHeader>
          <span>Joined Groups</span>
        </SuggestHeader>
        {
          suggestItems.map((item, index) => {
            return <SuggestedItem
              key={index}
              itemTitle={item.itemTitle}
              memberText={item.memberText}
              itemImage={item.itemImage}
              linkUrl={item.linkUrl}
              hashTags={item.hashTags}
              itemPrice={item.itemPrice}
            />
          })
        }
      </MyProfileSuggestContainer>
    </BaseWidget>
  )
}

export default MyProfileSuggest
