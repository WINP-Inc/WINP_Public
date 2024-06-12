import { HeartIcon } from "@/components/atoms/home/HeartIcon";
import React, { useEffect, useState, useCallback, useMemo, createContext, useContext, ChangeEvent } from "react";
import { usePost } from "../context/Post";
import { usePostContext } from "@/components/organisms/home/posts/providers/PostProviders";
import { postType } from "@/types/post/postType";
import { useAuth } from "../context/Auth";

export interface ActionItemType {
  itemTitle: 'Heart' | 'Replies' | 'Saved' | 'Comments';
  count: number;
  itemSVG?: React.ReactNode;
}

interface UserType {
  id: string,
  fullName: string,
  image: string,
}

interface HeartActionContextType {
  isLike: boolean;
  likesCount: number;
  heartAction: () => void;
}

const heartActionContextDefaultValues: HeartActionContextType = {
  isLike: false,
  likesCount: 0,
  heartAction: () => { },
}

const HeartActionContext = createContext<HeartActionContextType>(heartActionContextDefaultValues);

export const useHeartAction = () => {
  return useContext(HeartActionContext);
}

interface HeartActionProviderProps {
  post: postType;
  children: React.ReactNode;
}

export const HeartActionProvider = ({ children, post }: HeartActionProviderProps) => {
  const { likePost, unlikePost } = usePost();
  const [isLike, setIsLike] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(post?.likesCount ? post.likesCount : 0);
  const { user } = useAuth();

  useEffect(() => {
    setLikesCount(post.likes ? post.likes.length : 0);

    if (post.likes?.includes(user?._id)) {
      setIsLike(true);
    } else {
      setIsLike(false)
    }
  }, [])

  const heartAction = () => {
    if (!isLike) {
      likePost(post._id);
      setIsLike(true);
      setLikesCount(prevLikesCount => prevLikesCount + 1);
    } else {
      unlikePost(post._id)
      setIsLike(false)
      setLikesCount(prevLikesCount => prevLikesCount - 1);
    }
  };

  return (
    <HeartActionContext.Provider
      value={{
        isLike,
        likesCount,
        heartAction,
      }}>
      {children}
    </HeartActionContext.Provider>
  )
}

interface SavedActionContextType {
  isSaved: boolean;
  savedAction: () => void;
  savedCount: number;
}

const savedActionContextDefaultValues: SavedActionContextType = {
  isSaved: false,
  savedAction: () => { },
  savedCount: 0,
}

const SavedActionContext = createContext<SavedActionContextType>(savedActionContextDefaultValues);

export const useSavedAction = () => {
  return useContext(SavedActionContext);
}

interface SavedActionProviderProps {
  user: UserType;
  post: postType;
  children: React.ReactNode;
}

export const SavedActionProvider = ({ children, post }: SavedActionProviderProps) => {
  const { saveOrUnsavePost } = usePost();
  const [isSaved, setIsSaved] = useState(false);
  const [savedCount, setSavedCount] = useState<number>(post.savedCount);
  const { user } = useAuth();

  useEffect(() => {
    setSavedCount(post.savedBy ? post.savedBy.length : 0);
    if (post.savedBy?.includes(user?._id)) {
      setIsSaved(true);
    } else {
      setIsSaved(false)
    }
  }, [])

  const savedAction = async () => {
    if (!isSaved) {
      await saveOrUnsavePost(post._id);
      setIsSaved(true);
      setSavedCount(prevSavedCount => prevSavedCount + 1);
    } else {
      await saveOrUnsavePost(post._id);
      setIsSaved(false)
      setSavedCount(prevSavedCount => prevSavedCount - 1);
    }
  };

  return (
    <SavedActionContext.Provider
      value={{
        isSaved,
        savedAction,
        savedCount,
      }}>
      {children}
    </SavedActionContext.Provider>
  )
}

export const useCommentAction = (post: postType) => {
  const [openComments, setOpenComments] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const { commentPost } = usePost();
  const handleOpenComments = () => {
    setOpenComments(true)
  }

  const handleReplyContent = (e: ChangeEvent<HTMLInputElement>) => {
    setReplyContent(e.target.value);
  }

  const commentSubmit = async (e: any) => {
    e.preventDefault();
    if (!replyContent) return;
    commentPost(post._id, replyContent);
    setReplyContent('');
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return;
    } else if (e.key === 'Enter' && replyContent) {
      e.preventDefault();
    }
  }

  return {
    openComments,
    setOpenComments,
    handleOpenComments,
    replyContent,
    setReplyContent,
    handleReplyContent,
    commentSubmit,
    handleKeyDown,
  }
}