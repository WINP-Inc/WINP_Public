import BaseLayout from '@/components/templates/BaseLayout'
import { headerHeight, headerNavOptions } from '@/components/templates/header/customHeaderNav'
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Image from 'next/image'
import WidgetLeftGroup from '@/components/organisms/home/widget/left/WidgetLeftGroup'
import { MyProfileType } from '@/components/molecules/myprofile/MyProfileCard'
import MyProfileLeft from '@/components/organisms/myprofile/MyProfileLeft'
import { NavItemType } from '@/components/molecules/posts/navigation/BaseNavItem'
import BasePostContent from '@/components/organisms/home/posts/BasePostContent'
import { useAuth } from '../../../../context/Auth'
import { usePost } from '../../../../context/Post'
import useCategoryNavIcons from '@/components/atoms/nav/CategoryNavIcons'
import { useRouter } from 'next/navigation'

const visualAreaHeight = {
  lg: '240px'
}

const MyProfileWrapper = styled.div`
  margin-top: 23px;
  width: 100%;
`

const MyProfileContainer = styled.div`
  padding-left: 60px;
  padding-right: 60px;
`;

const VisualArea = styled.div`
  width: 100%;

  img {
    position: static !important;
    width: 100% !important;
    height: ${visualAreaHeight.lg} !important;
  }
`;

const MainProfileWrapper = styled.div`
  margin-top: 22px;
  display: flex;
  align-items: start;
  gap: 33px;
`

const ProfileLeftWrapper = styled.div`
  width: 33.33%;
`
const ProfileRightWrapper = styled.div`
  width: 66.66%;
`

// @ts-ignore
const myProfileMetadata: MyProfileType = {
  visualImg: '/images/rectangle-828109.png',
}

const MyProfile = () => {
  const { user } = useAuth();
  const { AllSvgIcon, FaceSvgIcon } = useCategoryNavIcons();
  const router = useRouter();
  const { setSelectedCategory } = usePost();

  useEffect(() => {
    setSelectedCategory('my-posts');
  }, [user, setSelectedCategory])

  const navItems: NavItemType[] = [
    {
      title: 'My Posts',
      isFirst: true,
      iconSvg: <AllSvgIcon />,
      action: () => {
        setSelectedCategory('my-posts');
      }
    },
    {
      title: 'Saved',
      iconSvg: <FaceSvgIcon />,
      action: () => {
        setSelectedCategory('my-saved-posts');
      }
    },
    {
      title: 'settings',
      isRightEnd: true,
      iconSvg: <Image src="/icons/outline-settings-fine-tuning-settings.svg" alt="settings" layout='fill' />,
      action: () => {
        router.push('/myprofile/settings')
      },
      isDisabled: true
    }
  ];

  return (
    <BaseLayout headerNavList={[
      headerNavOptions.home.navItem(),
      headerNavOptions.chart.navItem(),
      headerNavOptions.liveComm.navItem(),
      headerNavOptions.market.navItem(),
    ]}>
      <MyProfileWrapper>
        <MyProfileContainer>
          <VisualArea>
            {/* @ts-ignore */}
            <Image layout="fill" alt='visual-img'  src={myProfileMetadata.visualImg} />
          </VisualArea>
          <MainProfileWrapper>
            <ProfileLeftWrapper>
              <MyProfileLeft myProfile={user}/>
            </ProfileLeftWrapper>
            <ProfileRightWrapper>
              <BasePostContent navItems={navItems} />
            </ProfileRightWrapper>
          </MainProfileWrapper>
        </MyProfileContainer>
      </MyProfileWrapper>
    </BaseLayout>
  )
}

export default MyProfile
