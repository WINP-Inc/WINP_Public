import { postType } from '@/types/post/postType';
import { defaultUser } from '@/types/user/UserType';
import React, { FC, ReactNode, createContext, useContext, useEffect } from 'react'

const defaultPostValue: postType = {
  _id: '',
  title: '',
  user: defaultUser,
  media: [],
  likesCount: 0,
  commentsCount: 0,
  category: '',
  savedBy: [],
  savedCount: 0,
  likes: [],
  comments: [],
  tags: [],
  createdAt: '',
  updatedAt: '',
};

const PostCardContext = createContext<postType>(defaultPostValue);

interface PostProviderProps {
  post: postType,
  children: ReactNode
}

export const PostProviders: FC<PostProviderProps> = ({ post, children }) => {
  return (
    <PostCardContext.Provider value={{
      _id: post._id,
      title: post.title,
      user: post.user,
      media: post.media,
      likesCount: post.likesCount,
      category: post.category,
      commentsCount: post.commentsCount,
      likes: post.likes,
      savedBy: post.savedBy,
      savedCount: post.savedCount,
      comments: post.comments,
      tags: post.tags,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }}>
      { children }
    </PostCardContext.Provider>
  )
}

export const usePostContext = (): postType => useContext(PostCardContext);

