import { CommunityHomeItemCardType } from '@/components/molecules/community/CommunityHomeCard';
import { CommunityHomeCategoryType } from '@/components/molecules/community/HeaderCategoryItem';
import CommunityHomeHeader from '@/components/organisms/comunity/home/CommunityHomeHeader';
import CommunityHomeItem from '@/components/organisms/comunity/home/CommunityHomeItem';
import BaseLayout from '@/components/templates/BaseLayout'
import { headerHeight, headerNavOptions } from '@/components/templates/header/customHeaderNav'
import { LiveStreamType } from '@/types/community/LiveStreamType';
import React, { FC, useContext } from 'react'
import { styled } from 'styled-components'
import { useCommunityRooms } from '../../../../../context/community/CommunityRoomsProvider';

const CommunityHomeWrapper = styled.div`
  margin-top: 32px;
  margin-bottom: 120px;
`;

const CommunityHomeContainer = styled.div`
`

const BaseCommunityHome: FC = () => {
  const { rooms } = useCommunityRooms();
  return (
    <BaseLayout headerNavList={[
      headerNavOptions.home.navItem(),
      headerNavOptions.chart.navItem(),
      headerNavOptions.liveCommActive.navItem(),
      headerNavOptions.market.navItem(),
    ]}>
      <CommunityHomeWrapper>
        <CommunityHomeContainer>
          <CommunityHomeHeader />
          <CommunityHomeItem rooms={rooms} />
        </CommunityHomeContainer>
      </CommunityHomeWrapper>
    </BaseLayout>
  )
}

export default BaseCommunityHome
