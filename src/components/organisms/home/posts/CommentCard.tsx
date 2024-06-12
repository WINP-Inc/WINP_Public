import CardBody from '@/components/molecules/posts/post-content/CardBody';
import CardUserArea from '@/components/molecules/posts/post-content/CardUserArea';
import React, { FC, useState } from 'react'
import { styled } from 'styled-components';
import media from 'styled-media-query';
import { ActionItemType, useHeartAction } from '../../../../../hooks/postActions';
import Image from 'next/image';
import { useCommentContext } from './providers/CommentProviders';
import { HeartIcon } from '@/components/atoms/home/HeartIcon';
import { commentType, postType } from '@/types/post/postType';

const CardWrapper = styled.article`
  padding: 20px 32px;
  width: 100%;
  background: #302A43;
  border-radius: 12px;
  margin-bottom: 20px;

  img {
    position: static !important;
  }

  ${media.lessThan('medium')`
    padding: 12px;
  `}
`;

interface CommentCardProps {
  comment: commentType;
  fromPost: postType;
}

const CommentCard: FC<CommentCardProps> = ({ comment, fromPost }) => {
  const actionItems: ActionItemType[] = []

  return (
    <CardWrapper>
      <CardUserArea post={comment} fromPost={fromPost} />
      <CardBody post={comment} actionItems={actionItems}/>
    </CardWrapper>
  )
}

export default CommentCard
