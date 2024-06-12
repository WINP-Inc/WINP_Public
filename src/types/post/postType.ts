import { UserType } from "../user/UserType";
import { ArticleOptions } from "./nfts/NFTTransactionType";
import { CoinStampTransactionType } from "./coin/coinStamp";
import { AirdropOptionsType } from "./airdrop/airdropType";

export type categoryType = 'all' | 'article' | 'airdrop' | 'stamp' | 'my-posts' | 'my-saved-posts';

export interface mediaType {
  type: string;
  url: string;
  duration?: number;
  size?: number;
  width?: number;
  height?: number;
  thumbnail?: string;
}

export interface postType {
  _id: string;
  title: string;
  user: UserType;
  media: mediaType[];
  likesCount: number;
  commentsCount: number;
  category: string;
  likes?: any[];
  savedBy?: any[];
  savedCount: number;
  comments?: commentType[];
  tags?: string[];
  isVerified?: boolean;
  coinStampOptions?: CoinStampTransactionType | null;
  articleOptions?: ArticleOptions | null;
  airdropOptions?: AirdropOptionsType | null;
  createdAt: string;
  updatedAt: string;
}

export interface commentType {
  _id: string;
  user: UserType;
  content: string;
  createdAt: string;
  updatedAt: string;
}