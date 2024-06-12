import Checkbox from '@/components/atoms/utils/Checkbox';
import React, { FC } from 'react'
import styled from 'styled-components';
import { useSearch } from '../../../../context/search/Search';

const CategoryWithCheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 33px;
  padding: 26px 28px;
`

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const CategoryTitle = styled.span`
  display: block;
  color: #FFF;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const CategoryWithCheckbox: FC = () => {
  const { checks, setSearchChecked } = useSearch();
  return (
    <CategoryWithCheckboxWrapper>
      <CheckboxItem>
        <Checkbox
          checked={checks.people}
          onChange={() => setSearchChecked('people', !checks.people)}
        />
        <CategoryTitle>People</CategoryTitle>
      </CheckboxItem>
      <CheckboxItem>
        <Checkbox
          checked={checks.groups}
          onChange={() => setSearchChecked('groups', !checks.groups)}
        />
        <CategoryTitle>Groups</CategoryTitle>
      </CheckboxItem>
      <CheckboxItem>
        <Checkbox
          checked={checks.posts}
          onChange={() => setSearchChecked('posts', !checks.posts)}
        />
        <CategoryTitle>Posts</CategoryTitle>
      </CheckboxItem>
    </CategoryWithCheckboxWrapper>
  )
}

export default CategoryWithCheckbox
