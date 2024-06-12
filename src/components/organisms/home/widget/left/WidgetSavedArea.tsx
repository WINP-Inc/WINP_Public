import React, { memo } from 'react'
import { styled } from 'styled-components'
import BaseWidget from '@/components/molecules/widget/base-layout/BaseWidget'
import BookMarkItemList from '@/components/molecules/widget/left/BookMarkItemList';

const WidgetContainer = styled.div`
  padding: 16px 12px;
`

const HeadingWrapper = styled.div`
  margin-bottom: 18px;
  padding-left: 28px;
  position: relative;

  h2 {
    color: #FFF;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.2px;
  }

  &::after {
    content: '';
    background-image: url('/icons/BookmarkSimple.svg');
    width: 24px;
    height: 24px;
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

interface SavedItem {
  _id: string
  title: string
  media: any[]
}

interface WidgetSavedAreaProps {
  savedItems: any[]
}

const WidgetSavedArea = memo(({ savedItems }: WidgetSavedAreaProps) => {
  return (
    <BaseWidget hasSeeAll={true} transition='/myprofile'>
      <WidgetContainer>
        <HeadingWrapper><h2>SAVED</h2></HeadingWrapper>
        <BookMarkItemList bookMarkItems={savedItems} />
      </WidgetContainer>
    </BaseWidget>
  )
})

WidgetSavedArea.displayName = 'WidgetSavedArea'

export default WidgetSavedArea