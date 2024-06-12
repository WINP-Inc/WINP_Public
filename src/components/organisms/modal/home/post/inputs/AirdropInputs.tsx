import React from 'react'
import { PostInputWrapper } from '../PostModal'
import BaseVerifiedInput from '@/components/molecules/home/post/BaseVerifiedInput';
import styled from 'styled-components';
import BaseRadioItems from '@/components/molecules/home/post/BaseRadioItems';
import { useAirdrop } from '../../../../../../../context/airdrop/AirdropOptions';
import media from 'styled-media-query';

const AirdropSelectArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${media.lessThan('medium')`
    display: block;
  `}
`

const AirdropSelectItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  background: #302A43;
  width: 50%;
  height: 50px;

  ${media.lessThan('medium')`
    width: 100%;
    margin-bottom: 16px;
  `}
`

const AmountPriceArea = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  color: #FFF;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  span {
    display: block;
  }

  input[type="number"] {
    width: 90px;
    height: 30px;
    color: #FFF;
    font-size: 14px;
    line-height: 30px;
    background: #413A56;
    border-radius: 3px;
    outline: none;
    border: none;
    padding-left: 12px;

    ${media.lessThan('medium')`
      width: 100%;
  `}
  }
`

const InputCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`

const AirdropInputs = () => {
  const {
    airdropUrl,
    setAirdropUrl,
    isFree,
    setIsFree,
    costValue,
    setCostValue,
    referralCode,
    setReferralCode,
    distributionQuantity,
    setDistributionQuantity,
    setEventDate,
    eventDate
  } = useAirdrop();

  

  return (
    <PostInputWrapper>
      <BaseVerifiedInput
        icon='/icons/solar-link-bold.svg'
        placeholder='URL of Airdrop'
        disabled={false}
        onChange={e => setAirdropUrl(e.target.value)}
        value={airdropUrl}
      />
      <AirdropSelectArea>
        <AirdropSelectItem>
          <BaseRadioItems
            activeTarget={isFree ? 'Free' : 'Not Free'}
            onRadioChange={() => setIsFree(!isFree)}
            radioItems={['Free', 'Not Free']}
          />
          {!isFree && (
            <AmountPriceArea>
              <span>$</span>
              <input type="number" onChange={(e) => setCostValue(parseInt(e.target.value))} value={costValue} />
            </AmountPriceArea>
          )}
        </AirdropSelectItem>
        <BaseVerifiedInput
          icon='/icons/prime-users.svg'
          placeholder='Referral Code or Link '
          disabled={false}
          onChange={(e) => setReferralCode(e.target.value)}
          value={referralCode}
        />
      </AirdropSelectArea>
      <InputCategoryWrapper>
        <BaseVerifiedInput
          type='number'
          icon='/icons/solar-money-bag-linear.svg'
          placeholder='Distribution Quantity'
          disabled={false}
          onChange={(e) => setDistributionQuantity(parseInt(e.target.value))}
          value={distributionQuantity}
        />
        <BaseVerifiedInput
          type='date'
          icon='/icons/solar-calendar-linear.svg'
          placeholder='Airdrop date'
          disabled={false}
          onChange={(date: any) => setEventDate(date)}
          value={eventDate}
        />
      </InputCategoryWrapper>
    </PostInputWrapper>
  )
}

export default AirdropInputs
