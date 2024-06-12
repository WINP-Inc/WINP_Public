import styled from "styled-components"
import { FC, useEffect, useState } from "react";
import { NavItemType } from "@/components/molecules/posts/navigation/BaseNavItem";
import BasePostContent from "./posts/BasePostContent";
import useCategoryNavIcons from "@/components/atoms/nav/CategoryNavIcons";
import { usePost } from "../../../../context/Post";
import PostModal from "../modal/home/post/PostModal";

const HomeMainAreaWrapper = styled.div``

export const HomeMainArea = () => {
  const [isOpenPostModal, setIsOpenPostModal] = useState(false);
  const { setSelectedCategory, selectedCategory } = usePost();
  const { AllSvgIcon, FaceSvgIcon, ImageSvgIcon } = useCategoryNavIcons();
  useEffect(() => {
  }, [selectedCategory])
  
  const createNavItems = (primaryAction: (e?: any) => void): NavItemType[] => [
    {
      title: 'All',
      isFirst: true,
      iconSvg: <AllSvgIcon />,
      action: () => setSelectedCategory('all'),
    },
    {
      title: 'Airdrop',
      action: () => setSelectedCategory('airdrop'),
      iconSvg: <FaceSvgIcon />,
      description: 'You can get information about AirDrop.',
    },
    {
      title: 'NFT Article',
      action: () => setSelectedCategory('article'),
      iconSvg: <ImageSvgIcon />,
      description: 'Only investors who directly bought the NFT can post',
    },
    {
      title: 'Stamp Post',
      action: () => setSelectedCategory('stamp'),
      iconSvg: <AllSvgIcon />,
      description: 'This tab specifies coin purchase timing and offers profit-related information for that specific moment.',
    },
    {
      title: 'Post',
      isPrimary: true,
      action: primaryAction,
      isRightEnd: true,
    },
  ]

  const closeModal = () => {
    setIsOpenPostModal(!isOpenPostModal);
  }

  const openModal = () => {
    setIsOpenPostModal(!isOpenPostModal);
  }

  const navItems: NavItemType[] = createNavItems(openModal);


  return (
    <HomeMainAreaWrapper>
      <PostModal isOpen={isOpenPostModal} closeModal={closeModal} />
      <BasePostContent navItems={navItems} />
    </HomeMainAreaWrapper>
  )
}

