import CategoryWithCheckbox from '@/components/molecules/search/CategoryWithCheckbox'
import BaseLayout from '@/components/templates/BaseLayout'
import { headerNavOptions } from '@/components/templates/header/customHeaderNav'
import React, { FC, useEffect } from 'react'
import styled from 'styled-components'
import { useSearch } from '../../../../context/search/Search'
import { SearchResultDataType } from '@/types/search/searchType'
import { postType } from '@/types/post/postType'
import { SuggestedGroupItemType } from '@/types/suggested-groups/suggestedGroupType'
import { UserType } from '@/types/user/UserType'
import PostCard from '@/components/organisms/home/posts/PostCard'
import SuggestedItem from '@/components/molecules/widget/right/suggest-group/SuggestedItem'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

const SearchResultWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 30px;
  margin-top: 22px;
`

const SearchResultItem = styled.div`
  border-radius: 16px;
  background: #1f192d;
`

const LeftItem = styled.div`
  width: 307px;
  height: 343px;
`

const LeftItemContainer = styled.div`
  
`

const RightItem = styled.div`
  width: 646px;
  height: auto;
`

const RightItemContainer = styled.div`
  padding: 35px 45px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const RightItemTitle = styled.span`
  display: block;
  color: #FFF;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const SearchContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ResultItemByUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    font-size: 18px;
    font-weight: 400;
    line-height: normal;
    color: #FFF;
  }

  img {
    position: static !important;
    width: 72px !important;
    height: 72px !important;
    object-fit: cover;
  }
`

const LeftItemTitle = styled.div`
  padding: 20px 0;
  margin: 0 25px;
  border-bottom: 1px solid #3F3756;

  span {
    padding-left: 6px;
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    display: block;
  }
`


const SearchResult: FC = () => {
  const searchParams = useSearchParams();
  const { searchResults } = useSearch();

  useEffect(() => {
    console.log(searchResults)
  }, [searchResults])

  const renderSearchContents = (result: SearchResultDataType) => {
    if (!result.data) return;

    if (result.type === 'post') {
      const data = result.data as postType[];
      return data.map((post) => (
        <PostCard post={post} key={post._id} />
      ))
    }
    if (result.type === 'group') {
      const data = result.data as SuggestedGroupItemType[];
      return data.map((group, index) => (
        <SuggestedItem
          key={index}
          itemTitle={group.title}
          memberText={group.members?.toString() || '0' + 'k Members'}
          itemImage={group.image}
          linkUrl={`/chatroom/${group.roomId}`}
          hashTags={group.hashTags}
          itemPrice={group.overPrice || 0}
        />
      ))
    }
    if (result.type === 'user') {
      const data = result.data as UserType[];
      return data.map((user, index) => (
        <ResultItemByUser key={index}>
          <span>{user.username}</span>
          <Image src={user.image} layout='fill' alt='user-icon' />
        </ResultItemByUser>
      ))
    }
  }

  return (
    <BaseLayout
      headerNavList={[
        headerNavOptions.home.navItem(),
        headerNavOptions.liveComm.navItem(),
        headerNavOptions.chart.navItem(),
        headerNavOptions.market.navItem(),
      ]}
    >
      <SearchResultWrapper>
        <SearchResultItem>
          <LeftItem>
            <LeftItemContainer>
              <LeftItemTitle>
                <span>Filter</span>
              </LeftItemTitle>
              <CategoryWithCheckbox />
            </LeftItemContainer>
          </LeftItem>
        </SearchResultItem>
        <SearchResultItem>
          <RightItem>
            <RightItemContainer>
              <RightItemTitle>Search results for “{searchParams.get('result')}”</RightItemTitle>
              <SearchContents>
                {searchResults?.map((result: SearchResultDataType, index: number) => (
                  <>
                    {renderSearchContents(result)}
                  </>
                ))}
              </SearchContents>
            </RightItemContainer>
          </RightItem>
        </SearchResultItem>
      </SearchResultWrapper>
    </BaseLayout>
  )
}

export default SearchResult
