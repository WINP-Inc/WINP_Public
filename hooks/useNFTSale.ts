import axiosInterceptor from './axiosInterceptor';
import { UserType } from '@/types/user/UserType';
import { TransactionResultType } from '../context/nft/NFTAuction';

interface ExhibitedUserType {
    userWalletAddress: string | null;
    userNetworks: string | null;
    account: UserType;
}

interface ExhibitedNFTType {
    nftItem: {
        tokenId: string;
        tokenURI: string;
        image: string;
        title: string;
    };
    amountPrice: number;
    isSold: boolean;
    seller: ExhibitedUserType;
}

export const BASE_TRANSACTION_URL_MATIC = 'https://polygonscan.com/tx/';

export const getTransactionDetail = (transactionHash: string | undefined) => {
    if (!transactionHash) {
        throw new Error(`Transaction hash is not provided`);
    }
    return `${BASE_TRANSACTION_URL_MATIC}${transactionHash}`;
}

export const listNFTForSale = async ({ roomId, exhibitedNFT }: { roomId: string, exhibitedNFT: ExhibitedNFTType }) => {
    try {
        const response = await axiosInterceptor.put(`/liverooms/${roomId}/list-nft-for-sale`, {
            amountPrice: exhibitedNFT.amountPrice,
            nftItem: exhibitedNFT.nftItem,
            seller: exhibitedNFT.seller
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const succeedSale = async ({ roomId, transaction }: { roomId: string, transaction: TransactionResultType }) => {
    try {
        const response = await axiosInterceptor.post(`/liverooms/${roomId}/successful-transaction`, {
            nftItem: transaction.nftItem,
            buyer: transaction.buyer,
            transactionHash: transaction.transactionHash,
            amountPrice: transaction.amountPrice,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}