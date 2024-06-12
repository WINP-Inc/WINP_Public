import Image from 'next/image'
import React, { FC } from 'react'
import { styled } from 'styled-components'

export interface CommunityHomeCategoryType {
  category?: string;
}

const CategoryItemWrapper = styled.a`
  outline: none;
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    display: inline-block;
    color: #FFF;

    &.is-active {
      color: #8043F9;
    }
  }

  img {
    width: 28px !important;
    position: static !important;
  }
`

const HeaderCategoryItem: FC<CommunityHomeCategoryType> = ({ category }) => {
  function capitalizeFirstLetter(category: string) {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  return (
    <CategoryItemWrapper>
      {category && <span>{capitalizeFirstLetter(category)}</span>}
    </CategoryItemWrapper>
  )
}

export default HeaderCategoryItem
