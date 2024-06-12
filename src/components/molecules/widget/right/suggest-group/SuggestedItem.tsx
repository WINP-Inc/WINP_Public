import { HashTagItemType } from '@/types/suggested-groups/suggestedGroupType';
import Image from 'next/image';
import React, { FC } from 'react'
import { styled } from 'styled-components';

const SuggestedItemLink = styled.a`
  display: block;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

const SuggestedItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ItemLeft = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 8px;

  img {
    position: static !important;
    object-fit: cover;
    border-radius: 50%;
  }
`

const ItemRight = styled.div`

  span {
    display: block;
    color: #FFF;
  }
`
const ItemTitle = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 4px;
`;

const MemberText = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
  opacity: 0.699999988079071;
`

const HasTagWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 12px;
    font-weight: 400;
    opacity: 0.699999988079071;
  }
`

const HasTagText = styled.span<{ color?: string }>`
  color: ${props => props.color} !important;

  &:hover {
    text-decoration: underline;
  }
`;

const PriceArea = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    opacity: 0.7;
    color: #2BF896;
    font-family: Poppins;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  img {
    position: static !important;
    width: 25px !important;
    height: 25px !important;
    padding-top: 1px;
  }
`

export interface SuggestItemProps {
  itemTitle: string,
  memberText: string,
  itemImage: string,
  linkUrl: string,
  hashTags: HashTagItemType[] | null,
  itemPrice: number;
}

const SuggestedItem: FC<SuggestItemProps> = ({ itemTitle, memberText, itemImage, linkUrl, hashTags, itemPrice }) => {
  return (
    <SuggestedItemLink href={linkUrl}>
      <SuggestedItemContainer>
        <ItemLeft>
          <Image layout="fill" src={itemImage} alt='group-icon' />
        </ItemLeft>
        <ItemRight>
          <ItemTitle>{itemTitle}</ItemTitle>
          <MemberText>{memberText}</MemberText>
          <HasTagWrapper>
            {
              hashTags && hashTags.map(tag => {
                return <HasTagText key={tag.text} color={tag.textColor}>#{tag.text}</HasTagText>
              })
            }
            <PriceArea onClick={(e) => e.preventDefault()}>
              <Image layout='fill' alt='view-icon' src='/icons/price-view.svg' />
              <span>Over {itemPrice} ETH</span>
            </PriceArea>
          </HasTagWrapper>
        </ItemRight>
      </SuggestedItemContainer>
    </SuggestedItemLink>
  )
}

export default SuggestedItem;
