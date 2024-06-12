import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent, FC } from 'react';

export interface UseModalType {
  modalIsOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const defaultModalValues: UseModalType = {
  modalIsOpen: false,
  openModal: () => { },
  closeModal: () => { },
  setIsOpen: () => {}
}

export const useModal = (defaultOpen: boolean = false) => {
  const [modalIsOpen, setIsOpen] = useState(defaultOpen);

  const openModal = () => setIsOpen(true);
  const closeModal = (e?: any) => setIsOpen(false);

  return {
    modalIsOpen,
    openModal,
    closeModal,
    setIsOpen
  };
};
