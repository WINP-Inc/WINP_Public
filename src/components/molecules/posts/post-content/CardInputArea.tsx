import Image from 'next/image';
import React, { FC, useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components';
import media from 'styled-media-query';
import { useAuth } from '../../../../../context/Auth';
import { useCommentAction } from '../../../../../hooks/postActions';
import { usePostContext } from '@/components/organisms/home/posts/providers/PostProviders';
import { postType } from '@/types/post/postType';

const SCardInputArea = styled.div`
    display: flex;
    align-items: center;
    margin-top: 24px;
    position: relative;

    ${media.lessThan('medium')`
      margin-top: 16px;
    `}

    img {
      width: 44px !important;
      height: 44px !important;
      border-radius: 50%;
      margin-right: 12px;
      position: static !important;

      ${media.lessThan('medium')`
        width: 36px;
      `}
    }
  `

const CommentInput = styled.input`
    width: 100%;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 24px;
    padding-right: 64px;
    border-radius: 46px;
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
    color: #fff;
    background: #302A43;
    border: none;
    outline: none;
  `;

const UploadItems = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    gap: 16px;
    right: 24px;

    label {
      display: inline-block;
      width: 22px;
      height: 22px;
    }

    span {
      cursor: pointer;
      width: 22px;
      height: 22px;
      background: transparent url('/icons/vector-submit.svg') no-repeat center center / cover;
      display: none;

      &.active {
        display: block;
      }
    }

    input[type='file'] {
      display: none;
    }
  `;

const CardInputArea = ({ post }: { post: postType }) => {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLSpanElement>(null);
  const { replyContent, setReplyContent, commentSubmit, handleKeyDown } = useCommentAction(post);

  useEffect(() => {
    if (!inputRef.current || !submitRef.current) {
      return;
    }

    if (replyContent) {
      submitRef.current.classList.add('active');
    } else {
      submitRef.current.classList.remove('active');
    }
  }, [replyContent])

  return (
    <SCardInputArea>
      <Image
        layout="fill"
        alt='user-icon'
        src={user?.image}
      />
      <CommentInput ref={inputRef} type='text' placeholder='What do you think about this?' value={replyContent} onChange={e => setReplyContent(e.target.value)} onKeyDown={handleKeyDown} />
      <UploadItems>
        <span ref={submitRef} onClick={commentSubmit}></span>
      </UploadItems>
    </SCardInputArea>
  )
}

export default CardInputArea;