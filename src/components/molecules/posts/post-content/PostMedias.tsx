import { mediaType } from '@/types/post/postType';
import Image from 'next/image';
import React, { FC, useRef, useState } from 'react'
import { styled } from 'styled-components';
import media from 'styled-media-query';

const MediaBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 13px;
  grid-row-gap: 13px;
  height: auto;

  img {
    position: static !important;
    object-fit: cover;
    border-radius: 16px;
  }
`;

const BaseMediaWrapper = styled.a`
  width: 100%;
  height: 100%;
  max-height: 300px;
  border-radius: 16px;
  display: flex;
  position: relative;

  ${media.lessThan('medium')`
    max-height: 250px !important;
  `}

  img {
    height: 300px !important;

    ${media.lessThan('medium')`
      height: 200px !important;
    `}
  }
`

const MediaWrapper1 = styled(BaseMediaWrapper)`
  &:first-child {
    grid-area: 1 / 1 / 3 / 5;
  }
`;

const MediaWrapper2 = styled(BaseMediaWrapper)`
  &:first-child {
    grid-area: 1 / 1 / 3 / 3;
  }

  &:nth-child(2) {
    grid-area: 1 / 3 / 3 / 5;
  }
`;

const MediaWrapper3 = styled(BaseMediaWrapper)`

  &:first-child {
    grid-area: 1 / 1 / 3 / 3;
  }

  &:nth-child(2) {
    grid-area: 1 / 3 / 2 / 5;
    img {
      height: 142.742px !important;
    }
  }

  &:nth-child(3) {
    grid-area: 2 / 3 / 3 / 5;

    img {
      height: 142.742px !important;
    }
  }
`;

const MediaWrapper4 = styled(BaseMediaWrapper)`

  &:first-child {
    grid-area: 1 / 1 / 3 / 3;

    ${media.lessThan('medium')`
      height: 100%;
    `}
  }

  &:nth-child(2) {
    grid-area: 1 / 3 / 2 / 5;

    img {
      height: 142.742px !important;

      ${media.lessThan('medium')`
        height: auto !important;
      `}
    }
  }

  &:nth-child(3) {
    grid-area: 2 / 3 / 3 / 4;
    img {
      height: 142.742px !important;

      ${media.lessThan('medium')`
        height: 100% !important;
      `}
    }
  }

  &:nth-child(4) {
    grid-area: 2 / 4 / 3 / 5;
    img {
      height: 142.742px !important;

      ${media.lessThan('medium')`
        height: 100% !important;
      `}
    }
  }
`;

const SMediaWithIconButton = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  span {
    z-index: 1000;
    display: block;
    position: absolute;
    right: 3px;
    top: 3px;
    width: 24px;
    height: 24px;
    background: url('/icons/group-163006.svg') no-repeat center center /cover;

    &:hover {
      opacity: .5;
    }
  }
`

const PostVideo = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
`

const VideoButton = styled.button`
  background-color: transparent;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;

  img {
    width: 94px !important;
    height: 94px !important;
  }
`

type typePostMedias = {
  mediaList: mediaType[],
  deleteIcon?: boolean,
  deleteAction?: (mediaUrl: string) => void
}

const PostMedias: FC<typePostMedias> = ({ mediaList, deleteIcon = false, deleteAction }) => {
  const [showVideoButton, setShowVideoButton] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const deleteDefaultPrev = (e: React.MouseEvent<HTMLElement>, url: string) => {
    e.preventDefault();
    if (!deleteAction) return;
    deleteAction(url)
  }

  const handleVideoButton = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowVideoButton(!showVideoButton);

    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }

  const renderMediaByImage = (media: mediaType) => {
    if (deleteIcon) {
      return (
        <SMediaWithIconButton>
          <Image layout="fill" alt="attachment-file" src={media.url} />
          <span onClick={(e) => deleteDefaultPrev(e, media.url)}></span>
        </SMediaWithIconButton>
      )
    }
    return <Image layout="fill" alt="attachment-file" src={media.url} />
  }

  const renderMediaByVideo = (media: mediaType) => {
    return (
      <PostVideo>
        <video
          ref={videoRef}
          width="100%"
          height="100%"
          onClick={handleVideoButton}
          onPlay={() => { setShowVideoButton(false) }}
          onPause={() => { setShowVideoButton(true) }}
          playsInline
          controls
        >
          <source src={media.url} type="video/mp4" />
        </video>
        {showVideoButton && (
          <VideoButton onClick={handleVideoButton}>
            <Image layout="fill"  alt='video-button' src='/icons/octicon-play-16.svg' />
          </VideoButton>
        )}
      </PostVideo>
    )
  }

  const renderMediaWithDeleteButton = (media: mediaType): React.JSX.Element => {
    if (media.type === 'image') {
      return renderMediaByImage(media);
    } else if (media.type === 'video') {
      return renderMediaByVideo(media)
    } else {
      throw new Error('The specified media type does not exist')
    }
  }

  const renderSwitchingStyleMediaWrapper = (media: mediaType, key: number) => {
    const MediaWrappers = [MediaWrapper1, MediaWrapper2, MediaWrapper3, MediaWrapper4];
    const MediaWrapper = MediaWrappers[mediaList.length - 1] || null;

    if (!MediaWrapper) return;

    return (
      <MediaWrapper key={key} href={media.url}>
        { renderMediaWithDeleteButton(media) }
      </MediaWrapper>
    )
  }

  return (
    <MediaBox>
      {
        mediaList.map((content, index) => {
          return (
            renderSwitchingStyleMediaWrapper(content, index)
          )
        })
      }
    </MediaBox>
  )
}

export default PostMedias
