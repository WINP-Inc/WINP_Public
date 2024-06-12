import React, { FC } from 'react'
import { styled } from 'styled-components'
import { HeaderNavListType, HeaderNav } from './nav/HeaderNav'
import SearchInput from './SearchInput'
import media from 'styled-media-query'
import { useSearch } from '../../../../../context/search/Search'
import { useRouter } from 'next/navigation'

const HeaderMiddleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  ${media.lessThan('medium')`
    height: auto;
    display: block;
    width: 100%;
  `}
`

const SearchInputContainer = styled.div`
  margin-left: 106px;

  ${media.lessThan('large')`
    margin-left: 0;
  `}
`

const HeaderMiddle: FC<HeaderNavListType> = React.memo(({ headerNavList }) => {
  const { handleSearch, searchValue } = useSearch();
  return (
    <HeaderMiddleContainer>
      <HeaderNav headerNavList={headerNavList} />
      <SearchInputContainer>
        <SearchInput
          value={searchValue}
          onChange={handleSearch}
        />
      </SearchInputContainer>
    </HeaderMiddleContainer>
  )
})

HeaderMiddle.displayName = 'HeaderMiddle';

export default HeaderMiddle
