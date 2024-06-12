import WidgetIconArea from '@/components/molecules/widget/left/WidgetIconArea'
import WidgetUpdateArea from '@/components/molecules/widget/left/WidgetUpdateArea'
import React, { memo } from 'react'
import { styled } from 'styled-components'
import WidgetSavedArea from './WidgetSavedArea'
import media from 'styled-media-query'

const WidgetLeftContainer = styled.div`
  ${media.lessThan('medium')`
    display: none;
  `}
`

const WidgetLeftGroup = memo(({ user }: any) => {
  return (
    <WidgetLeftContainer>
      <WidgetIconArea userName={user?.fullName} userIcon={user?.image} />
      <WidgetSavedArea savedItems={user?.savedPosts} />
      <WidgetUpdateArea />
    </WidgetLeftContainer>
  )
});

WidgetLeftGroup.displayName = 'WidgetLeftGroup'

export default WidgetLeftGroup
