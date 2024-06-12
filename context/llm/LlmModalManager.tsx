import { FC, createContext, useContext } from "react";
import { useModal } from "../../hooks/useModal";

interface LlmModalManagerContextType {
  isOpenBySystemChatModal: boolean;
  closeBySystemChatModal: () => void;
  openBySystemChatModal: () => void;
  isOpenByHistoryModal: boolean;
  closeByHistoryModal: () => void;
  openByHistoryModal: () => void;
}

const LlmModalManagerContext = createContext<LlmModalManagerContextType>({
  isOpenBySystemChatModal: false,
  closeBySystemChatModal: () => {},
  openBySystemChatModal: () => {},
  isOpenByHistoryModal: false,
  closeByHistoryModal: () => {},
  openByHistoryModal: () => {},
});

export const useLlmModalManager = () => {
  return useContext(LlmModalManagerContext);
}

interface Props {
  children: React.ReactNode;
}

export const LlmModalManagerProvider: FC<Props> = ({ children }) => {
  const { modalIsOpen: isOpenBySystemChatModal, closeModal: isCloseBySystemChatModal, openModal: openBySystemChatModal } = useModal();
  const { modalIsOpen: isOpenByHistoryModal, closeModal: isCloseByHistoryModal, openModal: openByHistoryModal } = useModal();

  return (
    <LlmModalManagerContext.Provider
      value={{
        isOpenBySystemChatModal,
        closeBySystemChatModal: isCloseBySystemChatModal,
        openBySystemChatModal,
        isOpenByHistoryModal,
        closeByHistoryModal: isCloseByHistoryModal,
        openByHistoryModal,
      }}
    >
      {children}
    </LlmModalManagerContext.Provider>
  )
}
