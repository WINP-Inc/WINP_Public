import Image from "next/image";
import React, { FC, useEffect, useMemo } from "react";
import { styled } from "styled-components";
import PostMedias from "./PostMedias";
import media from "styled-media-query";
import CardActionItem from "./CardActionItem";
// import { usePostContext } from "@/components/organisms/home/posts/providers/PostProviders";
import { ActionItemType } from "../../../../../hooks/postActions";
// import { HeartIcon } from "@/components/atoms/home/HeartIcon";
import Link from "next/link";
import { commentType, mediaType, postType } from "@/types/post/postType";
import useFormattedContent from "../../../../../hooks/post/useFormatContent";
import ToolTip from "../../tools/ToolTip";
import SubContentWithToolTip from "../sub-content/SubContentWithToolTip";
import { formatDate } from "../../../../../utils/formatter/formatDate";
import { useAuth } from "../../../../../context/Auth";

const TextContainer = styled.div`
`
const CardText = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;

  .url,.hash-tag {
    color: #8043F9;
    display: inline;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 32px;

  ${media.lessThan('medium')`
    margin-top: 12px;
  `}
`;

const SubContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const AirDropLink = styled.div`
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;

  a {
    cursor: pointer;
    display: block;
    color: #8043F9;
    line-height: normal;
    font-size: 15.85px;
    font-weight: 600;
    word-break: break-all;

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    position: static !important;
    width: 24px !important;
    height: 24px !important;
  }
`

const SubContentItemList = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`

const CardBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${media.lessThan('medium')`
    margin-left: 5px;
  `}
`

const CardTranslationRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 400;
  color: #BB9D43;
  cursor: pointer;
`

const ImageWrapper = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
`

interface CardBodyProps {
  post: any;
  actionItems: ActionItemType[];
}

interface SubContentProps {
  post: postType;
}

const SubContentFromAirdrop: FC<SubContentProps> = ({ post }) => {
  return (
    <>
      <AirDropLink>
        <Image layout="fill" alt="airdrop" src='/icons/solar-link-bold.svg' />
        <Link href={`${post?.airdropOptions!?.airdropUrl}`}>{post?.airdropOptions?.airdropUrl}</Link>
      </AirDropLink>
      <SubContentItemList>
        <SubContentWithToolTip
          description="Distribution Quantity"
          icon='/icons/solar-money-bag-linear.svg'
          title={'$ ' + post?.airdropOptions!?.distributionQuantity?.toLocaleString()}
        />
        {!post?.airdropOptions!?.cost?.isFree && post?.airdropOptions!?.cost?.value && (
          <SubContentWithToolTip
            description="Minting fee"
            icon='/icons/ion-ticket-outline.svg'
            title={'$ ' + post?.airdropOptions!?.cost?.value?.toLocaleString()}
          />
        )}
        <SubContentWithToolTip
          description="Date"
          icon='/icons/solar-calendar-linear.svg'
          title={formatDate(post?.airdropOptions!?.eventDate) ?? 'null'}
        />
        {post?.airdropOptions!?.referralCode && (
          <SubContentWithToolTip
            description="Reffral"
            icon='/icons/prime-users.svg'
            title={post?.airdropOptions!?.referralCode}
          />
        )}
      </SubContentItemList>
    </>
  )
}

const SubContentFromArticle: FC<SubContentProps> = ({ post }) => {
  return (
    <SubContentItemList>
      <SubContentWithToolTip
        description="Lowest Price"
        icon='/icons/solar-money-bag-linear.svg'
        title={`${post?.articleOptions?.boughtPrice.toLocaleString()} ETH`}
      />
      <SubContentWithToolTip
        description="Date"
        icon='/icons/solar-calendar-linear.svg'
        title={post.articleOptions?.blockTimestamp ?? 'null'}
      />
      <SubContentWithToolTip
        description="Project Name"
        icon='/icons/prime-users.svg'
        title={post.articleOptions?.nftItem?.name ?? 'null'}
      />
    </SubContentItemList>
  )
}

const SubContentFromCoinStamp: FC<SubContentProps> = ({ post }) => {

  return (
    <SubContentItemList>
      <SubContentWithToolTip
        description="BoughtPrice"
        icon='/icons/solar-money-bag-linear.svg'
        title={`${post?.coinStampOptions?.boughtPrice.toLocaleString()} ${post.coinStampOptions?.currency.toLocaleUpperCase()}`}
      />
      <SubContentWithToolTip
        description="Date"
        icon='/icons/solar-calendar-linear.svg'
        title={post.coinStampOptions?.timeStamp ?? 'null'}
      />
    </SubContentItemList>
  )
}

const CardBody: FC<CardBodyProps> = ({ post, actionItems }) => {
  const [isTranslated, setIsTranslated] = React.useState(true);
  const formattedTitle = useFormattedContent(post.title ?? '');
  const formattedContent = useFormattedContent(post.content ?? '');
  const { user } = useAuth();

  const displayContent = 'title' in post ? formattedTitle : formattedContent;

  const SubContent = useMemo(() => {
    if ('category' in post) {
      if (post.category === 'airdrop') {
        return <SubContentFromAirdrop post={post} />
      }
      if (post.category === 'article') {
        return <SubContentFromArticle post={post} />
      } else if (post.category === 'stamp') {
        return <SubContentFromCoinStamp post={post} />
      }
      return null;
    }
  }, [post])

  const formatLanguage = (language: string) => {
    if (language === 'en') {
      return 'English';
    }
    if (language === 'ko') {
      return 'Korean';
    }
    if (language === 'ja') {
      return 'Japanese';
    }
    return 'English';
  };

  const translatedFrom = () => {
    const language = isTranslated ? formatLanguage(post.translatedFrom) : user?.preferredLanguage;
    if (post.translatedFrom) {
      return (
        <CardTranslationRow onClick={() => setIsTranslated(!isTranslated)}>
          <ImageWrapper>
            <Image layout="fill" alt="translate" src='/icons/Translate.svg' />
          </ImageWrapper>
          <span>Post translated from {language}</span>
        </CardTranslationRow>
      )
    }
  };

  return (
    <CardBodyWrapper>
      {SubContent && (
        <SubContentWrapper>
          {SubContent}
        </SubContentWrapper>
      )}
      <TextContainer>
        <CardText>
          {post?.translatedFrom && isTranslated ? (
            post.caption
          ) : (
            displayContent
          )}
        </CardText>
      </TextContainer>
      {translatedFrom()}
      {'media' in post && post?.media && post?.media?.length > 0 && <PostMedias mediaList={post.media} />}
      {'title' in post && (
        <ActionsWrapper>
          {actionItems.map((item, index) => (
            <CardActionItem post={post} key={index} item={item} />
          ))}
        </ActionsWrapper>
      )}
    </CardBodyWrapper>
  )
}

export default CardBody;
