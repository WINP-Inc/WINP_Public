import React, { FC } from 'react'
import { styled } from 'styled-components'
import Image from 'next/image'

const BookMarkItemListWrapper = styled.ul`
  li {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      opacity: .8;
    }

    a {
      display: flex;
      align-items: center;
      gap: 12px;
      
      span {
        display: block;
        color: #fff;
        font-size: 14px;
        line-height: 26px;
        word-break: break-all;
        max-width: 190px;
        max-height: 52px;
        overflow: hidden;
      }
    }

    img {
      position: static !important;
      width: 48px;
      height: 48px;
    }
  }
`;

type BookMarkItem = {
  linkUrl: string,
  media: any,
  title: string
}

type BookMarkItemListProps = {
  bookMarkItems: BookMarkItem[]
}

const BookMarkItemList: FC<BookMarkItemListProps> = ({ bookMarkItems }) => {
  const getBookMarkImage = (mediaItem: any) => {
    if (!mediaItem) {
      return "/images/init-stream-view.png"
    }

    if (mediaItem.type === 'image') {
      return mediaItem.url;
    } else {
      return mediaItem.thumbnail;
    }
  }

  return (
    <BookMarkItemListWrapper>
      {
        bookMarkItems?.map((item, index) => {
          return (
            <li key={index}>
              <a href={item?.linkUrl}>
                <Image
                  width={48}
                  height={48}
                  src={getBookMarkImage(item?.media[0])}
                  alt="book mark image" />
                <span>{item.title} </span>
              </a>
            </li>
          )
        })
      }
    </BookMarkItemListWrapper>
  )
}

export default BookMarkItemList
