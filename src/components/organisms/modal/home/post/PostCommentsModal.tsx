import BaseModal from '@/components/atoms/modal/BaseModal'
import React, { FC, useState } from 'react'
import { styled } from 'styled-components';
import CardInputArea from '@/components/molecules/posts/post-content/CardInputArea';
import CommentCard from '@/components/organisms/home/posts/CommentCard';
import { postType } from '@/types/post/postType';


const CommentsWrapper = styled.div``

const CommentsInputArea = styled.div`
  margin-bottom: 20px;
`

const CommentsArea = styled.div``

const modalContentStyle = (): React.CSSProperties => {
  if (window.visualViewport?.width && window.visualViewport.width <= 768) {
    return {
      background: "#261F32",
      borderRadius: "16px",
      width: "90%",
      height: "70%",
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
    height: '80%',
    inset: "50% 50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    padding: "36px",
    border: 'none',
    overflow: 'scroll'
  }
}

interface CommentsModalProps {
  post: postType;
  textContent: string;
  setTextContent(value: string): void;
  modalIsOpen: boolean;
  setModalIsOpen(flag: boolean): void
}

const PostCommentsModal: FC<CommentsModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
  post
}) => {
  const closeCommentsModal = (): void => setModalIsOpen(false);

  return (
    <BaseModal isCloseButton={true} title='comments' isOpen={modalIsOpen} css={modalContentStyle()} closeModal={closeCommentsModal}>
      <CommentsWrapper>
        <CommentsInputArea>
          <CardInputArea post={post} />
        </CommentsInputArea>
        <CommentsArea>
          <ul>
            {
              post.comments?.map((comment) => {
                return (
                  <li key={comment._id}>
                    <CommentCard comment={comment} fromPost={post}/>
                  </li>
                )
              })
            }
          </ul>
        </CommentsArea>
      </CommentsWrapper>
    </BaseModal>
  )
}

export default PostCommentsModal