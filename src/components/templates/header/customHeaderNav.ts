import { HeaderNavItem } from "@/components/molecules/header/middle/nav/HeaderNav";
import { TabMenuItemType } from "@/components/molecules/header/middle/nav/TabMenu";

export const headerHeight = {
  lg: '78px',
  md: '78px',
  sm: '60px',
}

export class CustomHeaderNav {
  private imgSrc: string;
  private href: string;
  private isActive: boolean;
  private navType: 'link' | 'tab';
  private tabMenuList?: TabMenuItemType[];

  constructor({ imgSrc, href, tabMenuList = [], isActive = false, navType = 'link' }: HeaderNavItem) {
    this.imgSrc = imgSrc;
    this.href = href;
    this.isActive = isActive;
    this.navType = navType;
    this.tabMenuList = tabMenuList;
  }

  public navItem(): HeaderNavItem {
    return {
      imgSrc: this.imgSrc,
      href: this.href,
      isActive: this.isActive,
      navType: this.navType,
      tabMenuList: this.tabMenuList
    }
  }
}

export const headerNavOptions = {
  home: new CustomHeaderNav({
    imgSrc: '/icons/home.svg',
    href: '/home',
    navType: 'link',
  }),
  homeActive: new CustomHeaderNav({
    imgSrc: '/icons/home-active.svg',
    href: '/home',
    isActive: true,
    navType: 'link',
  }),
  liveComm: new CustomHeaderNav({
    imgSrc: '/icons/live-comm.svg',
    href: '/community/streaming',
    navType: 'tab',
    tabMenuList: [
      {
        title: 'Voice Room',
        href: '/community/voice-room'
      },
      {
        title: 'Chat Room',
        href: '/community/chat-room'
      },
      {
        title: 'Live streams',
        href: '/community/live-streams'
      },
    ]
  }),
  liveCommActive: new CustomHeaderNav({
    imgSrc: '/icons/live-comm-active.svg',
    href: '/community/streaming',
    isActive: true,
    navType: 'tab',
    tabMenuList: [
      {
        title: 'Voice Room',
        href: '/community/voice-room'
      },
      {
        title: 'Chat Room',
        href: '/community/chat-room'
      },
      {
        title: 'Live streams',
        href: '/community/live-streams'
      },
    ]
  }),
  chart: new CustomHeaderNav({
    imgSrc: '/icons/on-chain.svg',
    href: '/chart',
    navType: 'link',
  }),
  chartActive: new CustomHeaderNav({
    imgSrc: '/icons/on-chain-active.svg',
    href: '/chart',
    isActive: true,
    navType: 'link',
  }),
  market: new CustomHeaderNav({
    imgSrc: '/icons/market.svg',
    href: '/market',
    isActive: false,
    navType: 'link',
  }),
  marketActive: new CustomHeaderNav({
    imgSrc: '/icons/market-active.svg',
    href: '/market',
    isActive: true,
    navType: 'link',
  }),
};



