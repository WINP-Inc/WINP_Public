import ContentNav from '@/components/molecules/posts/navigation/ContentNav';
import React, { FC, useEffect, useRef } from 'react'
import styled from 'styled-components';
import { PostProviders } from './providers/PostProviders';
import PostCard from './PostCard';
import { NavItemType } from '@/components/molecules/posts/navigation/BaseNavItem';
import { useAuth } from '../../../../../context/Auth';
import { HeartActionProvider } from '../../../../../hooks/postActions';
import { SavedActionProvider } from '../../../../../hooks/postActions';
import { useFilteredPost } from '../../../../../hooks/post/useFilteredPost';
import { usePost } from '../../../../../context/Post';
import { useIntersectionObserver } from '../../../../../hooks/intersectionObserver';
import CircleLoader from 'react-spinners/CircleLoader';
import { postType } from '@/types/post/postType';
import Image from 'next/image';
import Link from 'next/link';

export const BaseMiddleContainer = styled.div`
`;


const ContentBody = styled.div`
`;

const LoaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SavedPostCardAreaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px; 
  justify-items: center; 
  align-items: start; 
`

const SavedPostCard = styled.div`
  background-color: #261F32;
  border-radius: 10px;
  width: 100%;
  height: 300px;
`

const SavedPostCardContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
`

const SavedPostCardMedia = styled.div`
  width: 100%;
  height: 214px;
  position: relative;

  img {
    position: static !important;
    border-radius: 10px;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    width: 12px;
    background: url('/icons/saved-label.svg') no-repeat top center / cover ;
    right: 12px;
    left: 12px;
  }
`

const SavedPostCardTitle = styled.div`
  overflow: hidden;

  span {
    line-height: 24px;
    font-size: 15px;
    font-weight: 500;
    color: #fff;
    word-break: break-all;
  }
`

const RenderPostCard = ({ post, user }: { post: postType, user: any }) => {
  return (
    <HeartActionProvider post={post}>
      <SavedActionProvider user={user} post={post}>
        <PostCard post={post} />
      </SavedActionProvider>
    </HeartActionProvider>
  )
}

const RenderSavedPostCard = ({ post }: { post: postType }) => {
  return (
    <SavedPostCard>
      <Link href="">
        <SavedPostCardContent>
          {post.media[0] && (
            <SavedPostCardMedia>
              <Image src={post.media[0].url} alt='media-url' layout='fill' />
            </SavedPostCardMedia>
          )}
          <SavedPostCardTitle>
            <span>{post.title}</span>
          </SavedPostCardTitle>
        </SavedPostCardContent>
      </Link>
    </SavedPostCard>
  )
}

interface BasePostContentProps {
  navItems?: NavItemType[];
}

const BasePostContent: FC<BasePostContentProps> = ({ navItems }) => {
  const { user } = useAuth();
  const { getFilteredPosts } = useFilteredPost();
  const filteringPosts = getFilteredPosts();
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const { getPosts, loading, hasMorePosts, selectedCategory } = usePost();
  const options: IntersectionObserverInit = {
    threshold: 0.5,
  };

  useEffect(() => {
    console.log(filteringPosts)
  }, [filteringPosts])

  const handleIntersectionChange = (entry: IntersectionObserverEntry) => {
    if (loading || !hasMorePosts) return;
    if (entry.isIntersecting) {
      getPosts();
    }
  }
  useIntersectionObserver(loadingRef, options, handleIntersectionChange);

  return (
    <>
      <BaseMiddleContainer>
        <ContentNav navItems={navItems} />
        <ContentBody>
          {
            selectedCategory !== 'my-saved-posts' ? (
              filteringPosts?.map(post => (
                <RenderPostCard post={post} user={user} key={post._id} />
              ))
            ) : (
              <SavedPostCardAreaContainer>
                {filteringPosts?.map(post => (
                  <RenderSavedPostCard post={post} key={post._id} />
                ))}
              </SavedPostCardAreaContainer>
            )
          }
          {hasMorePosts && <LoaderDiv ref={loadingRef}>
            <CircleLoader size={30} color={'#2BF896'} />
          </LoaderDiv>}
        </ContentBody>
      </BaseMiddleContainer>
    </>
  )
}

export default BasePostContent
