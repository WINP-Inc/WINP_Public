import React, { FC, createContext, useContext } from 'react';
import { UseModalType, defaultModalValues, useModal } from '../../hooks/useModal';

const HeaderTabMenuModalContext = createContext<UseModalType>(defaultModalValues);
export const useHeaderTabMenuModal = () => useContext(HeaderTabMenuModalContext);

interface HeaderTabMenuModalProviderProps {
  children: React.ReactNode
}

export const HeaderTabMenuModalProvider: FC<HeaderTabMenuModalProviderProps> = ({ children }) => {
  const modalControls = useModal();

  return (
    <HeaderTabMenuModalContext.Provider value={modalControls}>
      { children }
    </HeaderTabMenuModalContext.Provider>
  )
}

