import React, { FC, useCallback, useState } from 'react'
import { styled } from 'styled-components';
import media from 'styled-media-query';
import { ActionItemType, useCommentAction, useHeartAction, useSavedAction } from '../../../../../hooks/postActions';
import { useAuth } from '../../../../../context/Auth';
import { usePostContext } from '@/components/organisms/home/posts/providers/PostProviders';
import PostCommentsModal from '@/components/organisms/modal/home/post/PostCommentsModal';
import { postType } from '@/types/post/postType';

const ActionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  img {
    cursor: pointer;
  }

  span {
    display: inline-block;
    font-size: 14px;
    font-weight: 400;

    &:last-child {
      text-align: center;
      padding: 2px 10px;
      background: #8043F9;
      border-radius: 4px;
      line-height: normal;
    }
  }

  ${media.lessThan('medium')`
    span {
      &:last-child {
        background: transparent;
      }
      &:nth-child(2) {
        display: none;
      }
    }
  `}
`

interface CardActionItemProps {
  item: ActionItemType;
  post: postType;
}

const CardActionItem: FC<CardActionItemProps> = ({ item, post }) => {
  const [commentText, setCommentText] = useState('');
  const {openComments, handleOpenComments, setOpenComments} = useCommentAction(post);
  const { heartAction } = useHeartAction();
  const { savedAction } = useSavedAction();

  const handleItemClick = useCallback(() => {
    if (item.itemTitle === 'Heart') {
      heartAction();
    } else if (item.itemTitle === 'Comments') {
      handleOpenComments();
    } else if (item.itemTitle === 'Saved') {
      savedAction();
    }
  }, [item.itemTitle, heartAction, handleOpenComments, savedAction]);

  return (
    <>
      <ActionItem onClick={handleItemClick}>
        <span>{item.itemSVG}</span>
        <span>{item.itemTitle}</span>
        <span>{item.count}</span>
      </ActionItem>
      <PostCommentsModal
        modalIsOpen={openComments}
        textContent={commentText}
        setModalIsOpen={setOpenComments}
        setTextContent={setCommentText}
        post={post}
      />
    </>
  );
};

export default CardActionItem;