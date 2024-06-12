import { useState } from "react";
import { useModal } from "./useModal";
import { useAuth } from "../context/Auth";
import { useRouter } from "next/navigation";
import { TabMenuItemType } from "@/components/molecules/home/BaseTabMenu";

export const useTabMenu = () => {
  const { modalIsOpen: isOpenByCareDown, closeModal: closeByCareDown, openModal: openByCareDown } = useModal();
  const { modalIsOpen: isOpenByQuest, closeModal: closeByQuest, openModal: openByQuest } = useModal();
  const [triggerPosition, setTriggerPosition] = useState<{ left: number, top: number }>({ left: 0, top: 0 });
  const { logout } = useAuth();
  const router = useRouter();

  const getTabMenuPosition = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTriggerPosition({ left: rect.left, top: rect.top })
  }

  const openQuestTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    getTabMenuPosition(e);
    openByQuest();
  }

  const openCareDownTab = (e: React.MouseEvent<any>) => {
    getTabMenuPosition(e);
    openByCareDown();
  }

  const careDownMenuItems: TabMenuItemType[] = [
    {
      title: 'My Profile',
      isDanger: false,
      action: () => {
        router.push('/myprofile');
      }
    },
    {
      title: 'Settings',
      isDanger: false,
      action: () => {
        router.push('/myprofile/settings');
      }
    },
    {
      title: 'Logout',
      isDanger: true,
      action: () => {
        logout();
      }
    }
  ]

  return {
    isOpenByCareDown,
    closeByCareDown,
    openByCareDown,
    isOpenByQuest,
    closeByQuest,
    openByQuest,
    triggerPosition,
    setTriggerPosition,
    getTabMenuPosition,
    openQuestTab,
    openCareDownTab,
    careDownMenuItems
  }
}