import React from 'react'
import { useNFTSale } from '../../../../../context/nft/NFTAuction';
import { useNFTTransaction } from '../../../../../context/nft/NFTTransaction';
import { BaseBidLeftFromBidTitleArea, BaseBidRightFromBidButton, BaseBidTab, BaseBidTabLeftFromNFTImageWithBidTitleArea } from '@/components/molecules/community/streaming/chat/BaseBidTab';
import { useRouter } from 'next/navigation';
import { getTransactionDetail } from '../../../../../hooks/useNFTSale';

const BidTabBuyer = () => {
  const { isSold, exhibitedNFT, transactionResult, buyNft } = useNFTSale();
  const router = useRouter();

  const LeftAreaJsx = isSold ? (
    <BaseBidLeftFromBidTitleArea
      topText={`${exhibitedNFT?.nftItem.title} has been sold to ${transactionResult?.buyer.account.username} for ${exhibitedNFT?.amountPrice} ETH`}
    />
  ) : (
    <BaseBidTabLeftFromNFTImageWithBidTitleArea
      productImage={exhibitedNFT?.nftItem?.image}
      topText={`NFT name: ${exhibitedNFT?.nftItem.title}`}
      bottomText={`exhibit price: ${exhibitedNFT?.amountPrice} ETH`}
    />
  );

  const RightAreaJsx = isSold ? (
    <BaseBidRightFromBidButton
      bidAction={() => { router.push(getTransactionDetail(transactionResult?.transactionHash)) }}
      text='Details'
    />
  ) : (
    <BaseBidRightFromBidButton
      bidAction={buyNft}
      text='Purchase'
    />
  );

  return <BaseBidTab leftJsx={LeftAreaJsx} rightJsx={RightAreaJsx} />;
}

export default BidTabBuyer
