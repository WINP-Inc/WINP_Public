import HeaderCategoryItem from '@/components/molecules/community/HeaderCategoryItem'
import React, { FC } from 'react'
import { styled } from 'styled-components'
import CreateNewRoomModal from '../../modal/comunity/CreateNewRoomModal'
import { useModal } from '../../../../../hooks/useModal'
import { useCommunityRooms } from '../../../../../context/community/CommunityRoomsProvider'

const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 34px;
`

const HeaderLeft = styled.div`
  span {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.1px;
  }
`

const HeaderMiddle = styled.div`
  ul {
    display: flex;
    align-items: center;
    gap: 40px;
  }
`

const HeaderRight = styled.div`
  button {
    display: inline-block;
    padding: 10px 12px;
    text-align: center;
    border-radius: 4px;
    background: #8043F9;
    color: #fff;
    font-size: 12px;
    cursor: pointer;

    &:hover {
      opacity: .8;
    }
  }
`

const CommunityHomeHeader: FC = () => {
  const { modalIsOpen, closeModal, openModal } = useModal();
  const { title, categories } = useCommunityRooms();

  return (
    <HeadingWrapper>
      <HeaderLeft>
        <span>{ title }</span>
      </HeaderLeft>
      <HeaderMiddle>
        <nav>
          <ul>
            {
              categories?.map((category, index) => {
                return (
                  <li key={index}>
                    <HeaderCategoryItem category={category} />
                  </li>
                )
              })
            }
          </ul>
        </nav>
      </HeaderMiddle>
      <HeaderRight>
        <button onClick={openModal}>Create New</button>
        <CreateNewRoomModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
      </HeaderRight>
    </HeadingWrapper>
  )
}

export default CommunityHomeHeader;

