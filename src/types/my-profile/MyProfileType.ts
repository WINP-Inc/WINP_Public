import { postType } from "../post/postType";

export interface MyProfileType {
  user: {
    username: string;
    image: string;
  };
  isMyAccount: boolean;
  premiumType?: string
  followersCount?: number
  followingCount?: number
  updatedAt?: string
  wallets?: number
  visualImg?: string
  posts?: postType[]
  isFollow?: boolean;
}

export interface MyProfileContextType extends MyProfileType {
  // setIsFollow: (isFollow: boolean) => void;
  // setFollowersCount: (followersCount: number) => void;
  // setFollowingCount: (followingCount: number) => void;
  // setUpdatedAt: (updatedAt: string) => void;
  // setWallets: (wallets: number) => void;
}

