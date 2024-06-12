import { BasePrimaryButton } from '@/components/atoms/button/Buttons';
import BaseModal from '@/components/atoms/modal/BaseModal';
import BaseRadioItems from '@/components/molecules/home/post/BaseRadioItems';
import BaseVerifiedInput from '@/components/molecules/home/post/BaseVerifiedInput';
import PostMedias from '@/components/molecules/posts/post-content/PostMedias';
import Image from 'next/image';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import media from 'styled-media-query';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { useAuth } from '../../../../../../context/Auth';
import { usePost } from '../../../../../../context/Post';
import { useStampPost } from '../../../../../../hooks/post/useStampPost';
import { useModal } from '../../../../../../hooks/useModal';
import WalletVerificationModal from '../verified/WalletVerificationModal';
import SelectedTransactionModal, { TransactionDataType } from '../verified/transaction/SelectedTransactionModal';
import BasePostInput from '@/components/molecules/posts/modal/BasePostInput';
import SelectNFTsModal from '../../comunity/nfts/SelectNFTsModal';
import AirdropInputs from './inputs/AirdropInputs';
import ArticleInputs from './inputs/ArticleInputs';
import StampInputs from './inputs/StampInputs';
import { useNFTTransaction } from '../../../../../../context/nft/NFTTransaction';
import { useFileUpload } from '../../../../../../context/FileUpload';
import useFileUploader from '../../../../../../hooks/useFileUploader';
import { useWalletServices } from '../../../../../../context/wallet/WalletConnect';
import ConfirmModalWithSelectedWalletsModal from '../../comunity/nfts/ConfirmModalWitSelectWalletsModal';
import { useCoinStamp } from '../../../../../../context/coin/CoinStamp';
import { useAirdrop } from '../../../../../../context/airdrop/AirdropOptions';
import { categoryType } from '@/types/post/postType';
import { useDeviceType } from '../../../../../../hooks/windowSize';

const PostInputForm = styled.form`
  margin-top: 30px;
`

const PostContentFooter = styled.div`
  margin-top: 23px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  width: 100%;

  button {
    margin-left: auto;
  }

  ${media.lessThan('medium')`
    margin-top: 8px;
    margin-bottom: 0;

    button {
      width: 72px;
    }
  `}
`

const PostErrorMessage = styled.span`
  display: block;
  color: #F6465D;
  font-family: Poppins;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`

export const PostInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

interface PostModalProps {
  isOpen: boolean,
  closeModal: () => void
}

const PostModal: FC<PostModalProps> = ({ isOpen, closeModal }) => {
  const [title, setTitle] = useState<string>('');
  const { createPost, error, setSelectedCategory, selectedCategory, setError, cleanupPost } = usePost();
  const { airdropPost } = useAirdrop();
  const { transactionUrl, handleTransactionUrl } = useStampPost();
  const { nftTransaction, initializeNFTConfig, openBySelectedNFT, closeBySelectedNFT } = useNFTTransaction();
  const { mediaList, handleFileChange, removeMedia, uploadFiles, setMediaList, setUploadFiles } = useFileUploader();
  const { uploadFile } = useFileUpload();
  const { closeBySelectedWallets, openBySelectedWallets, isConnected, initConnect, SignUpWithCoinBase, SignUpWithWallet, connectMetamask, openByConnectedConfirmModal } = useWalletServices();
  const { coinStampTransaction, stampPost } = useCoinStamp();
  const [isPost, setIsPost] = useState(false);
  const { isDesktop, isMobile, isTablet } = useDeviceType();

  const modalContentStyle = (): React.CSSProperties => {
    if (isMobile || isTablet) {
      return {
        background: "#261F32",
        borderRadius: "16px",
        width: "90%",
        minHeight: '300px',
        inset: "50% 50%",
        transform: "translate(-50%, -50%)",
        position: "absolute",
        padding: "0 12px",
        border: 'none',
        overflow: 'auto',
      }
    }

    return {
      background: "#261F32",
      borderRadius: "16px",
      width: "740px",
      height: 'auto',
      maxHeight: 'calc(100vh - 100px)',
      inset: "50% 50%",
      transform: "translate(-50%, -50%)",
      position: "relative",
      padding: "20px 36px",
      border: 'none',
      overflow: 'auto'
    }
  }

  useEffect(() => {
    if (!isPost) return;

    if (error) {
      console.log(error)
      return;
    }
    setIsPost(false);
    setTitle('');
    closeModal();
  }, [isPost, error, closeModal])

  useEffect(() => {
    if (selectedCategory !== 'article') return;
    if (isConnected) {
      initConnect();
      openBySelectedNFT()
    } else {
      openByConnectedConfirmModal();
    }
  }, [selectedCategory, isConnected])

  const cleanup = () => {
    setTitle('');
    setUploadFiles([]);
    setMediaList([]);
    cleanupPost();
    initializeNFTConfig();
  }

  const cancelPost = () => {
    cleanupPost();
    initializeNFTConfig();
    closeModal();
  }

  const submitPost = async () => {
    try {
      const tags = title.split(' ').filter(word => word.startsWith('#'))
      const category = selectedCategory.toLocaleLowerCase();
      const media = await uploadFile(uploadFiles);
      if (category === 'stamp') {
        stampPost(title, media, tags, category);
      } else if (category === 'airdrop') {
        airdropPost(title, media, tags, category);
      } else if (category === 'article') {
        createPost(title, media, tags, category, null, nftTransaction, null);
      } else {
        createPost(title, media, tags, category, null, null, null);
      }
      setIsPost(true);
      cleanup();
    } catch (e) {
      setError('Failed to post');
    }
  }

  const afterWalletConnected = () => {
    closeBySelectedWallets();
  }

  const SubContent = useMemo(() => {
    if (selectedCategory === 'airdrop') {
      return (
        <AirdropInputs />
      )
    } else if (selectedCategory === 'article') {
      return (
        <ArticleInputs />
      )
    } else if (selectedCategory === 'stamp') {
      return (
        <StampInputs />
      )
    } else {
      return null
    }
  }, [selectedCategory])

  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={cancelPost}
      css={modalContentStyle()}
      title='Post to community'
      isCloseButton={true}
    >
      <PostInputForm>
        <PostInputWrapper>
          {SubContent}
          <BasePostInput
            title={title}
            handleChangeText={(e) => setTitle(e.target.value)}
            handleFileChange={handleFileChange}
            removeMedia={removeMedia}
            mediaList={mediaList}
          />
        </PostInputWrapper>
        <PostContentFooter>
          {!nftTransaction?.nftItem && isDesktop && <BaseRadioItems
            activeTarget={selectedCategory}
            onRadioChange={(value: categoryType) => setSelectedCategory(value)}
            radioItems={['all', 'airdrop', 'article', 'stamp']}
          />}
          {error && (
            <PostErrorMessage>{error}</PostErrorMessage>
          )}
          <BasePrimaryButton type='button' py={12} width={118} onClick={submitPost}>Post</BasePrimaryButton>
        </PostContentFooter>
      </PostInputForm>
      <SelectNFTsModal />
      <ConfirmModalWithSelectedWalletsModal onAuthenticationComplete={afterWalletConnected}/>
    </BaseModal>
  )
}

export default PostModal;