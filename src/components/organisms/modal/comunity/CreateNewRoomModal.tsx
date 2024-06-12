// @ts-nocheck
import React, { FC, useEffect, useState } from 'react'
import Modal from 'react-modal';
import { useModal } from '../../../../../hooks/useModal';
import styled from 'styled-components';
import Image from 'next/image';
import AuthFormInput, { AuthFormSelector } from '@/components/atoms/auth/AuthFormInput';
import AuthFormSubmitButton from '@/components/atoms/auth/AuthFormSubmitButton';
import { modalStyle } from '@/components/atoms/modal/BaseModal';
import { useLivestream } from '../../../../../context/Livestream';
import { useRouter } from 'next/navigation';
import { useCommunityRooms } from '../../../../../context/community/CommunityRoomsProvider';
import { useDeviceType } from '../../../../../hooks/windowSize';
import media from 'styled-media-query';

const ModalContainer = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 36px;

  ${media.lessThan('medium')`
    padding: 0;
    gap: 20px;
  `}
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 20px;
    font-weight: 600;
    line-height: normal;

    ${media.lessThan('medium')`
      font-size: 16px;
    `}
  }
`;

const ModalCloseButton = styled.div`
  width: 44px;
  height: 44px;
  cursor: pointer;

  ${media.lessThan('medium')`
    width: 36px;
    height: 36px;
  `}

  img {
    position: static !important;
  }
`;

const ModalBody = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ModalFooter = styled.div``;

const categoriesArray = [
  '',
  'general',
  'sport',
  'news',
  'music',
  'games',
  'movies',
  'science',
  'technology',
  'nft',
  'web3',
  'coins',
  'health',
  'business',
  'education',
  'art',
  'cars',
  'dating',
  'shopping',
  'lifestyle',
  'hobbies',
  'family',
  'home',
  'garden',
  'design',
  'architecture',
  'comics',
  'anime',
  'manga',
  'adult',
  'other',
];

const categories = categoriesArray.map((category) => {
  return {
    label: category.toUpperCase(),
    value: category,
  };
});


interface CommunityHomeItemProps {
  modalIsOpen: boolean;
  closeModal: () => void;
}

const CreateNewRoomModal: FC<CommunityHomeItemProps> = ({ modalIsOpen, closeModal }) => {
  const [roomName, setRoomName] = useState('');
  const [category, setCategory] = useState('');
  const [isValueEmpty, setIsValueEmpty] = useState(true);
  const { loading } = useLivestream();
  const router = useRouter();
  const { title, createRoom } = useCommunityRooms();
  const { isMobile } = useDeviceType();

  const customStyles = () => {
    if (isMobile) {
      return {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#261F32',
        border: 'none',
        borderRadius: '16px',
        width: '80%',
        padding: '20px'
      }
    } else {
      return {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#261F32',
        border: 'none',
        borderRadius: '16px',
        width: '500px'
      }
    }
  }

  useEffect(() => {
    if (!category) {
      return;
    }

    setIsValueEmpty(false);
  }, [category])

  const handleFormSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCategory(value);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={modalStyle(customStyles())}
    >
      <ModalContainer>
        <ModalHeader>
          <span>New {title}</span>
          <ModalCloseButton onClick={closeModal}>
            <Image layout='fill' alt='close button' src='/icons/basil-cross-solid.svg' />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <AuthFormInput
            type='text'
            placeholder='room name'
            value={roomName}
            onChange={(event) => setRoomName(event.target.value)}
            required
          />
          <AuthFormSelector
            options={categories}
            onChange={handleFormSelectChange}
            isValueEmpty={isValueEmpty}
            placeholder='Category'
          />
        </ModalBody>
        <ModalFooter>
          <AuthFormSubmitButton disabled={loading} title={loading ? 'Loading...' : 'Start Streaming'} action={() => { createRoom(roomName, category) }} />
        </ModalFooter>
      </ModalContainer>
    </Modal>
  )
}

export default CreateNewRoomModal
