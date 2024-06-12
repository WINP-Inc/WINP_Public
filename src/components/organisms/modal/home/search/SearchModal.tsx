import BaseModal from '@/components/atoms/modal/BaseModal'
import { SuggestedGroupItemType } from '@/types/suggested-groups/suggestedGroupType';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'
import styled from 'styled-components';
import { useSearch } from '../../../../../../context/search/Search';
import { UserType } from '@/types/user/UserType';
import { SearchResultDataType } from '@/types/search/searchType';
import { postType } from '@/types/post/postType';
import { useSearchParams } from 'next/navigation';

const ModalContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const SuggestedItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px;

  &:hover {
    background-color: #372D47;
  }
`

const SuggestedItemLeft = styled.div`
  width: 36px;
  height: 36px;

  img {
    position: static !important;
    object-fit: cover;
  }
`

const SuggestedItemRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 50px;
  max-width: 350px;
  overflow: hidden;
`

const SuggestedItemTitle = styled.span`
  display: block;
  color: #FFF;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const SuggestedItemMembers = styled.span`
  display: block;
  color: #FFF;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  opacity: 0.5;
`

const ResultsLinkWrapper = styled.div`
  padding: 10px;
  cursor: pointer;

  span {
    color: #726C86;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`

interface SearchModalProps {
  inputStyleWithPosition?: {
    width: string;
    left: string;
    top: string;
  } | null
}

const SearchModal: FC<SearchModalProps> = ({ inputStyleWithPosition }) => {
  const { searchModalIsOpen, closeSearchModal, instantSearchResults, handleSearchSubmit } = useSearch();

  const modalStyle: React.CSSProperties = {
    position: "absolute",
    width: inputStyleWithPosition?.width,
    borderRadius: '8px',
    backgroundColor: '#27203D',
    height: 'auto',
    top: inputStyleWithPosition?.top,
    left: inputStyleWithPosition?.left,
  }

  const renderSearchItemByGroup= (item: SuggestedGroupItemType) => {
    return (
      <SuggestedItem key={item.roomId}>
        <SuggestedItemLeft>
          <Image layout='fill' src={item.image} alt={item.title} />
        </SuggestedItemLeft>
        <SuggestedItemRight>
          <SuggestedItemTitle>{item.title}</SuggestedItemTitle>
          <SuggestedItemMembers>{item.members && (
            `${item.members?.toLocaleString()}k Members`
          )}</SuggestedItemMembers>
        </SuggestedItemRight>
      </SuggestedItem>
    )
  }

  const renderSearchItemByUser = (item: any) => {
    return (
      <SuggestedItem key={item._id}>
        <SuggestedItemLeft>
          <Image layout='fill' src={item.image} alt={item.username} />
        </SuggestedItemLeft>
        <SuggestedItemRight>
          <SuggestedItemTitle>{item.username}</SuggestedItemTitle>
          <SuggestedItemMembers>{item.email}</SuggestedItemMembers>
        </SuggestedItemRight>
      </SuggestedItem>
    )
  }

  const renderSearchItemByPost = (item: postType) => {
    return (
      <SuggestedItem key={item._id}>
        <SuggestedItemLeft>
          <Image layout='fill' src={item?.media[0] ? item?.media[0].url : '/images/nft-default-image.png'} alt={item.title} />
        </SuggestedItemLeft>
        <SuggestedItemRight>
          <SuggestedItemTitle>{item.title}</SuggestedItemTitle>
        </SuggestedItemRight>
      </SuggestedItem>
    )
  }

  return (
    <BaseModal
      isOpen={searchModalIsOpen}
      closeModal={closeSearchModal}
      css={modalStyle}
    >
      <ModalContainer>
        {instantSearchResults?.map((result: SearchResultDataType) => {
          return (
            <>
              {result.data?.map((item: any) => {
                if (result.type === 'group') {
                  return renderSearchItemByGroup(item as SuggestedGroupItemType)
                } else if (result.type === 'user'){
                  return renderSearchItemByUser(item as UserType)
                } else if (result.type === 'post') {
                  return renderSearchItemByPost(item as postType);
                }
              } )}
            </>
          )
        } )}
        <ResultsLinkWrapper onClick={handleSearchSubmit}>
          <span>See all results</span>
        </ResultsLinkWrapper>
      </ModalContainer>
    </BaseModal>
  )
}

export default SearchModal
