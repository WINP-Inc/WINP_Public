import { HeartIcon } from '@/components/atoms/home/HeartIcon';
import { SaveIcon } from '@/components/atoms/home/SaveIcon';
import CardBody from '@/components/molecules/posts/post-content/CardBody';
import CardInputArea from '@/components/molecules/posts/post-content/CardInputArea';
import CardUserArea from '@/components/molecules/posts/post-content/CardUserArea';
import Image from 'next/image';
import { FC, memo, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import media from 'styled-media-query';
import { ActionItemType, useHeartAction, useSavedAction } from '../../../../../hooks/postActions';
import { usePostContext } from './providers/PostProviders';
import { postType } from '@/types/post/postType';
import { useAuth } from '../../../../../context/Auth';
import { useIntersectionObserver } from '../../../../../hooks/intersectionObserver';
import { usePost } from '../../../../../context/Post';

const CardWrapper = styled.article`
  padding: 16px;
  width: 100%;
  background: #261F32;
  border-radius: 20px;
  margin-bottom: 36px;

  img {
    position: static !important;
  }

  ${media.lessThan('medium')`
    padding: 12px;
  `}
`;


interface PostCardProps {
  post: postType;
}

const PostCard: FC<PostCardProps> = memo(({ post }) => {
  const { isLike, likesCount } = useHeartAction();
  const { isSaved, savedCount } = useSavedAction();
  const actionItems: ActionItemType[] = [
    {
      itemTitle: 'Heart',
      count: likesCount,
      itemSVG: <HeartIcon isActive={isLike} />
    },
    {
      itemTitle: 'Comments',
      count: post.comments?.length ? post.comments.length : 0,
      itemSVG: (
        <Image layout="fill" alt="comments" src='/icons/chat-dots.svg' />
      )
    },
    {
      itemTitle: 'Saved',
      count: savedCount,
      itemSVG: <SaveIcon isActive={isSaved} />
    }
  ]

  return (
    <CardWrapper>
      <CardUserArea post={post} />
      <CardBody post={post} actionItems={actionItems} />
      <CardInputArea post={post} />
    </CardWrapper>
  )
});

PostCard.displayName = 'PostCard';

export default memo(PostCard);