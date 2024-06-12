import React, { FC, useState } from 'react'
import styled from 'styled-components';
import BaseWidget from '../widget/base-layout/BaseWidget';
import Image from 'next/image';
import moment from 'moment';

const MyProfileCardContainer = styled.div`
  padding-bottom: 28px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 119px;
  position: relative;
`;

const MyProfileAvatarArea = styled.div`
  width: 191px;
  height: 191px;
  position: absolute;
  top: calc(-119px + 24px);
  left: 50%;
  transform: translateX(-50%);

  img {
    position: static !important;
    border-radius: 191px;
    object-fit: cover;
  }
`;

const MyProfileTitleArea = styled.div`
  text-align: center;
`;

const MyProfileName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  gap: 3px;

  span {
    display: block;
    font-size: 20px;
    color: #FFF;
    font-weight: 700;
  }

  img {
    width: 24px !important;
    position: static !important;
    display: block;
  }
`;

const PremiumBox = styled.div`
  border-radius: 4px;
  background: #302A43;
  padding: 0px 4px;
  display: inline-block;
`;

const PremiumBoxContent = styled.div`
  display: flex;
  align-items: center;

  span {
    color: #FFF;
    display: block;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  
  img {
    width: 24px !important;
    position: static !important;
    display: block;
  }
`;

const FollowersWrapper = styled.div`
  margin-top: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 43px;
`

const FollowersItem = styled.div`
  text-align: center;

  a {
    color: #FFF;
    font-weight: 700;
    font-size: 28px;
    display: block;
    margin-bottom: 8px;
    
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  span {
    opacity: 0.8;
    font-size: 14px;
    font-weight: 400;
    display: block;
  }
`

const CardFooterArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 42px;
`

const WalletArea = styled.div`
  display: block;
  margin: 0 auto;
`

const WalletButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  color: #FFF;
  cursor: pointer;
  padding: 4px 12px;
  gap: 8px;
  line-height: normal;
  border-radius: 8px;
  background: #8043F9;

  &:hover {
    opacity: 0.8;
  }

  img {
    display: block;
    position: static !important;
    width: 28px !important;
  }
`;

const CardUpdateArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  border-radius: 4px;
  background: #342C42;
  margin-top: 8px;
  justify-content: center;

  span {
    color: #FFF;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    padding-bottom: 4px;
    line-height: normal;
    display: block;
    opacity: 0.8;
    padding-top: 4px;
  }

  img {
    position: static !important;
    width: 20px !important;
  }
`

const ButtonWrapper = styled.div`
  text-align: center;
  width: 100%;
`

const BaseFollowButton = styled.button`
  display: inline-block;
  height: 36px;
  padding: 4px 12px;
  border-radius: 4px;
  color: #FFF;
  font-weight: 400;
  font-size: 18px;
  line-height: normal;
  cursor: pointer;
`

const FollowButton = styled(BaseFollowButton)`
  background: #8043F9; 
`

const UnFollowButton = styled(BaseFollowButton)`
  background: #302A43;
`

export interface MyProfileType {
  image?: string
  username?: string
  premiumType?: string
  followersCount?: number
  followingCount?: number
  updatedAt?: string
  wallets?: string
  visualImg?: string
}

interface MyProfileCardProps {
  myProfile: MyProfileType
}

const MyProfileCard: FC<MyProfileCardProps> = ({ myProfile }) => {
  const [isMyAccount, setIsMyAccount] = useState(true);
  const [follow, setIsFollow] = useState(false);

  const handleFollow = () => {
    setIsFollow(!follow);
  }

  return (
    <BaseWidget>
      <MyProfileCardContainer>
        <MyProfileAvatarArea>
          {myProfile?.image && <Image layout="fill" alt='avatar' src={myProfile.image} />}
        </MyProfileAvatarArea>
        <MyProfileTitleArea>
          <MyProfileName>
            <span>{myProfile?.username}</span>
            {<Image layout="fill" alt='check-icon' src='/icons/bold-money-verified-check.svg' />}
          </MyProfileName>
          {myProfile?.premiumType !== 'FREE' && (
            <PremiumBox>
              <PremiumBoxContent>
                <Image layout="fill" alt='star-icon' src='/icons/ic-round-star.svg' />
                <span>Premium</span>
              </PremiumBoxContent>
            </PremiumBox>
          )}
        </MyProfileTitleArea>
        <FollowersWrapper>
          <FollowersItem>
            <a href="#">{myProfile?.followersCount}</a>
            <span>Followers</span>
          </FollowersItem>
          <FollowersItem>
            <a href="#">{myProfile?.followingCount}</a>
            <span>Following</span>
          </FollowersItem>
        </FollowersWrapper>
        <CardFooterArea>
          {isMyAccount ? (
            <WalletArea>
              <WalletButton>
                <Image layout="fill" alt='wallet' src='/icons/linear-money-wallet.svg' />
                <span>0.0338 MATIC</span>
                {/* <span>{myProfile?.wallets}</span> */}
              </WalletButton>
              <CardUpdateArea>
                <span>{moment(myProfile?.updatedAt).fromNow()}</span>
                <Image layout="fill" alt='reload-icon' src='/icons/uiw-reload.svg' />
              </CardUpdateArea>
            </WalletArea>
          ) : (
            <ButtonWrapper>
              {follow ? (
                <UnFollowButton onClick={handleFollow}>Unfollow</UnFollowButton>
              ) : (
                <FollowButton onClick={handleFollow}>Follow</FollowButton>
              )}
            </ButtonWrapper>
          )}
        </CardFooterArea>
      </MyProfileCardContainer>
    </BaseWidget>
  )
}

export default MyProfileCard
