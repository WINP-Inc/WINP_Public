import moment from 'moment';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import media from 'styled-media-query';
import { useAuth } from '../../../../../context/Auth';
import { usePost } from '../../../../../context/Post';
import { useModal } from '../../../../../hooks/useModal';
import BaseTabMenu, { TabMenuItemType } from '../../home/BaseTabMenu';
import { UserType } from '@/types/user/UserType';
import { commentType, postType } from '@/types/post/postType';
import { CommentType } from '@/components/organisms/home/posts/providers/CommentProviders';
import EditPostModal from '@/components/organisms/modal/home/post/EditPostModal';
import BaseAvatar from '@/components/atoms/avatar/BaseAvatar';

const ContentHeadWrapper = styled.div`
display: flex;
align-items: center;
margin-bottom: 16px;

span {
  display: block;
  margin-left: auto;
  cursor: pointer;
}

`;

const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
`

const AccountUserText = styled.div`
  margin-left: 8px;
`;

const AccountAreaTop = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
`

const AccountImageWrapper = styled.div`
  /* width: 20px;
  height: 20px;

  img {
    position: static !important;
    border-radius: 50%;
    object-fit: contain;
  } */
`;

const AccountName = styled.span`
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 4px;
  line-height: normal;
  word-break: break-all;
`

const PriceText = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #55FF05;
  line-height: normal;
  display: block;
  opacity: 0.7;
`

const PostInfo = styled.div`
  font-weight: 400;
  font-size: 10px;
  opacity: 0.699999988079071;
`;

const HeadLeft = styled.div``;
const VerifiedIconWrapper = styled.div`
  width: 20px;
  height: 20px;

  img {
    position: static !important;
  }
`

const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  margin-right: 26px;

  .circle-avatar {
    &:nth-child(2) {
      position: absolute;
      top: 0;
      left: 30px;

      &:hover {
        & + .article-detail-nft {
          display: block;
        }
      }
    }
  }
`

const DetailArticleWrapper = styled.div`
  position: absolute;
  border-radius: 8px;
  border: 8px solid #d9d9d986;
  backdrop-filter: blur(2px);
  z-index: 10;
  left: 100%;
  top: 50px;
  display: none;

  img {
    width: 200px !important;
    height: 200px !important;
    position: static !important;
    border-radius: 8px;
    object-fit: cover;
  }
`

interface CardUserAreaProps {
  post: postType | commentType;
  fromPost?: postType;
}

interface HeadLeftProps {
  post: postType;
}

interface HeadLeftDefaultProps {
  post: postType | commentType;
}

const HeadLeftFromArticle: FC<HeadLeftProps> = ({ post }) => {
  const isArticleImage = () => {
    return !!post.articleOptions?.nftItem?.metadata?.image;
  }

  const articleUrl = (): string => {
    if (isArticleImage()) {
      return post.articleOptions!.nftItem!.metadata.image;
    }
    return '/images/nft-default-image.png';
  }
  return (
    <AccountWrapper>
      {post.articleOptions?.showNFT ? (
        <AvatarWrapper>
          <BaseAvatar size={44} url={post.user.image} />
          <BaseAvatar border='solid 2px #8043F9' size={44} url={articleUrl()} />
          <DetailArticleWrapper className='article-detail-nft'>
            <Image layout="fill" src={articleUrl()} alt='article-image' />
          </DetailArticleWrapper>
        </AvatarWrapper>
      ): (
          <BaseAvatar size={44} url={post.user.image} />
      )}
      <AccountUserText>
        <AccountAreaTop>
          <AccountName>{post.user.username}</AccountName>
          <VerifiedIconWrapper>
            <Image layout="fill" src="/icons/bold-money-verified-check.svg" alt='verified-icon' />
          </VerifiedIconWrapper>
          <PriceText>{`Bought price : ${post.articleOptions?.boughtPrice.toLocaleString()}ETH`}</PriceText>
        </AccountAreaTop>
        <PostInfo>{moment(post?.createdAt).fromNow()}</PostInfo>
      </AccountUserText>
    </AccountWrapper>
  )
}

const HeadLeftFromStamp: FC<HeadLeftProps> = ({ post }) => {
  return (
    <AccountWrapper>
      <BaseAvatar size={40} url={post.user.image} />
      <AccountUserText>
        <AccountAreaTop>
          <AccountName>{post.user.username}</AccountName>
          <VerifiedIconWrapper>
            <Image layout="fill" src="/icons/coin-stamp-verification.svg" alt='stamp-icon' />
          </VerifiedIconWrapper>
        </AccountAreaTop>
        <PostInfo>{moment(post?.createdAt).fromNow()}</PostInfo>
      </AccountUserText>
    </AccountWrapper>
  )
}

const HeadLeftFromDefault: FC<HeadLeftDefaultProps> = ({ post }) => {
  return (
    <AccountWrapper>
      <BaseAvatar size={40} url={post.user.image} />
      <AccountUserText>
        <AccountAreaTop>
          <AccountName>{post.user.username}</AccountName>
        </AccountAreaTop>
        <PostInfo>{moment(post?.createdAt).fromNow()}</PostInfo>
      </AccountUserText>
    </AccountWrapper>
  )
}

const CardUserArea: FC<CardUserAreaProps> = ({ post, fromPost }) => {
  const [triggerPosition, setTriggerPosition] = useState<{ left: number, top: number }>({ left: 0, top: 0 });
  const { deletePost, deleteComment } = usePost();
  const { user } = useAuth();
  const { modalIsOpen: isOpenByTabMenu, closeModal: closeByTabMenu, openModal: openByTabMenu } = useModal();
  const { modalIsOpen: isOpenByEdit, closeModal: closeByEdit, openModal: openByEdit } = useModal();


  const getTabMenuPosition = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTriggerPosition({ left: rect.left, top: rect.top })
  }


  const openPostTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    getTabMenuPosition(e);
    openByTabMenu();
  }

  const postTabItems: TabMenuItemType[] = [
    {
      title: 'Edit Post',
      isDanger: false,
      action: () => {
        if ('title' in post) {
          openByEdit();
        }
        closeByTabMenu();
      }
    },
    {
      title: 'Delete Post',
      isDanger: true,
      action: () => {
        if (!post) return;
        deletePost(post._id);
        closeByTabMenu();
      }
    }
  ]

  const commentTabItems: TabMenuItemType[] = [
    {
      title: 'Delete Comment',
      isDanger: true,
      action: () => {
        if (!post) return;
        fromPost && deleteComment(fromPost._id, post._id);
        closeByTabMenu();
      }
    }
  ]

  const tabItems = () => {
    if ('title' in post) {
      return postTabItems;
    } else {
      return commentTabItems;
    }
  }

  const headLeftContent = () => {
    if (post && 'articleOptions' in post) {
      if (post?.category === 'article') {
        return <HeadLeftFromArticle post={post} />
      } else if (post?.category === 'stamp') {
        return <HeadLeftFromStamp post={post} />
      } else {
        return <HeadLeftFromDefault post={post} />
      }
    } else {
      return <HeadLeftFromDefault post={post} />
    }
  }

  return (
    <ContentHeadWrapper>
      <HeadLeft>
        {headLeftContent()}
      </HeadLeft>
      {user && user.username === post?.user.username && (
        <>
          <span onClick={openPostTab}><Image layout="fill" alt='dot-icon' src="/icons/dots-three.svg" /></span>
          <BaseTabMenu isOverlay={true} isOpen={isOpenByTabMenu} closeModal={closeByTabMenu} position={triggerPosition} items={tabItems()} />
        </>
      )}
      <EditPostModal isOpen={isOpenByEdit} closeModal={closeByEdit} post={post} />
    </ContentHeadWrapper>
  )
}

export default CardUserArea;