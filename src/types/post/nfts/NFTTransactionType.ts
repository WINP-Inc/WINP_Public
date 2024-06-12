export interface NFTMetaDataType {
  attributes?: any[];
  description?: string;
  name: string;
  image: string;
  animation_url?: string;
  external_url?: string;
}

export interface NFTItemType {
  tokenId: string;
  tokenURI: string;
  tokenAddress: string;
  contractType: string;
  symbol: string;
  name: string;
  ownerOfAddress: string;
  blockNumber?: string;
  metadata: NFTMetaDataType;
  lastTokenUriSync: Date | string;
  possible_spam: boolean;
  verified_collection: boolean;
}

export interface NFTCollectionDataType {
  tokenAddress: string;
  contractType: string;
  symbol: string;
  name: string;
  verified_collection: boolean;
  possible_spam: boolean;
  metadata: NFTMetaDataType;
}

export interface ArticleOptions {
  nftItem: NFTItemType | null;
  boughtPrice: number;
  blockTimestamp: string;
  showNFT: boolean;
}

