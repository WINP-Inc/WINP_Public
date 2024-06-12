import { CommunityHomeItemCardType } from '@/components/molecules/community/CommunityHomeCard'
import { CommunityHomeCategoryType } from '@/components/molecules/community/HeaderCategoryItem'

import React from 'react'
import BaseCommunityHome from '../home/BaseCommunityHome'
import CommunityRoomsProvider from '../../../../../context/community/CommunityRoomsProvider'

// const categoryItems: CommunityHomeCategoryType[] = [
//   {
//     iconSrc: '/icons/wall-active.svg',
//     href: '#',
//     categoryName: 'Category1',
//     isActive: true
//   },
//   {
//     iconSrc: '/icons/image-square.svg',
//     href: '#',
//     categoryName: 'Category2',
//   },
//   {
//     iconSrc: '/icons/streaming.svg',
//     href: '#',
//     categoryName: 'Category3',
//   },
//   {
//     iconSrc: '/icons/voiceroom.svg',
//     href: '#',
//     categoryName: 'Category4',
//   },
//   {
//     iconSrc: '/icons/message.svg',
//     href: '#',
//     categoryName: 'Category5',
//   },
// ]

// const communityHomeItems: CommunityHomeItemCardType[] = [
//   {
//     thumbnail: '/images/rectangle-828099.svg',
//     href: '/community/voice-room/user-view',
//     title: 'Can I win this time?',
//     userName: 'Karl Joseph',
//     userIcon: '/icons/ellipse-26.svg',
//     views: '4.2k'
//   },
//   {
//     thumbnail: '/images/rectangle-828099.svg',
//     href: '#',
//     title: 'Can I win this time?',
//     userName: 'Karl Joseph',
//     userIcon: '/icons/ellipse-26.svg',
//     views: '4.2k'
//   },
//   {
//     thumbnail: '/images/rectangle-828099.svg',
//     href: '#',
//     title: 'Can I win this time?',
//     userName: 'Karl Joseph',
//     userIcon: '/icons/ellipse-26.svg',
//     views: '4.2k'
//   },
//   {
//     thumbnail: '/images/rectangle-828099.svg',
//     href: '#',
//     title: 'Can I win this time?',
//     userName: 'Karl Joseph',
//     userIcon: '/icons/ellipse-26.svg',
//     views: '4.2k'
//   },
//   {
//     thumbnail: '/images/rectangle-828099.svg',
//     href: '#',
//     title: 'Can I win this time?',
//     userName: 'Karl Joseph',
//     userIcon: '/icons/ellipse-26.svg',
//     views: '4.2k'
//   },
//   {
//     thumbnail: '/images/rectangle-828099.svg',
//     href: '#',
//     title: 'Can I win this time?',
//     userName: 'Karl Joseph',
//     userIcon: '/icons/ellipse-26.svg',
//     views: '4.2k'
//   },
//   {
//     thumbnail: '/images/rectangle-828099.svg',
//     href: '#',
//     title: 'Can I win this time?',
//     userName: 'Karl Joseph',
//     userIcon: '/icons/ellipse-26.svg',
//     views: '4.2k'
//   },
//   {
//     thumbnail: '/images/rectangle-828099.svg',
//     href: '#',
//     title: 'Can I win this time?',
//     userName: 'Karl Joseph',
//     userIcon: '/icons/ellipse-26.svg',
//     views: '4.2k'
//   },
//   {
//     thumbnail: '/images/rectangle-828099.svg',
//     href: '#',
//     title: 'Can I win this time?',
//     userName: 'Karl Joseph',
//     userIcon: '/icons/ellipse-26.svg',
//     views: '4.2k'
//   },
// ]

const CommunityHomeByVoice = () => {
  return (
    <CommunityRoomsProvider type='audioroom' rooms={null}>
      <BaseCommunityHome  />
    </CommunityRoomsProvider>
  )
}

export default CommunityHomeByVoice
