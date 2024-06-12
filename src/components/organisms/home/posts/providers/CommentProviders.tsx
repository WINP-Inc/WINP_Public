import { UserType, defaultUser } from '@/types/user/UserType';
import React, { FC, ReactNode, createContext, useContext, useEffect } from 'react';

export interface CommentType {
  _id: string,
  content: string,
  user: UserType,
  likesCount: number,
  likes: any[],
  createdAt: string,
  updatedAt: string,
};

const defaultCommentValue: CommentType = {
  _id: '',
  content: '',
  user: defaultUser,
  likesCount: 0,
  likes: [],
  createdAt: '',
  updatedAt: '',
};

const CommentCardContext = createContext<CommentType>(defaultCommentValue);

interface CommentProviderProps {
  comment: CommentType,
  children: ReactNode
}

export const CommentProviders: FC<CommentProviderProps> = ({ comment, children }) => {
  return (
    <CommentCardContext.Provider value={{
      _id: comment._id,
      content: comment.content,
      user: comment.user,
      likesCount: comment.likesCount,
      likes: comment.likes,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt
    }}>
      {children}
    </CommentCardContext.Provider>
  )
}

export const useCommentContext = (): CommentType => useContext(CommentCardContext);
