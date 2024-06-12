import { useState } from "react";
import { useModal } from "./useModal"
import { footerHeight } from "@/components/templates/footer/MobileFooter";

interface TabModalOption {
  type: 'header' | 'footer'
}

const useTabModal = (option?: TabModalOption) => {
  const { modalIsOpen, closeModal, openModal } = useModal();
  const [triggerPosition, setTriggerPosition] = useState<{ left?: number, top?: number, right?: number, bottom?: number }>({ left: 0, top: 0, right: 0, bottom: 0});

  const getTabMenuPosition = (e: React.MouseEvent<any>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (option?.type === 'footer') {
      setTriggerPosition({ left: rect.right, top: rect.top - (54 * 2)});
    } else {
      setTriggerPosition({ left: rect.left, top: rect.top });
    }
  };

  const openTabModal = (e: React.MouseEvent<any>) => {
    getTabMenuPosition(e);
    openModal();
  }

  return { triggerPosition, openTabModal, modalIsOpen, closeModal }
}

export default useTabModal;