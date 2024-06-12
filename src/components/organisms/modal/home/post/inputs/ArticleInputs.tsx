import SubContentTitleWithIcon from '@/components/molecules/posts/sub-content/SubContentTitleWithIcon'
import React, { memo } from 'react'
import styled from 'styled-components'
import { useNFTTransaction } from '../../../../../../../context/nft/NFTTransaction'

const ArticleInputsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const ArticleInputItem = styled.div`
  padding: 10px 16px;
`

const ArticleInputs = memo(() => {
  const { nftTransaction } = useNFTTransaction();

  return (
    nftTransaction && (
      <ArticleInputsWrapper>
        <ArticleInputItem>
          <SubContentTitleWithIcon
            icon='/icons/solar-money-bag-linear.svg'
            title={`${nftTransaction.boughtPrice.toLocaleString()} ETH`}
          />
        </ArticleInputItem>
        <ArticleInputItem>
          <SubContentTitleWithIcon
            icon='/icons/solar-calendar-linear.svg'
            title={nftTransaction.blockTimestamp}
          />
        </ArticleInputItem>
        <ArticleInputItem>
          <SubContentTitleWithIcon
            icon='/icons/prime-users.svg'
            title={nftTransaction.nftItem ? nftTransaction.nftItem.name : 'no name'}
          />
        </ArticleInputItem>
      </ArticleInputsWrapper>
    )
  )
});

ArticleInputs.displayName = 'ArticleInputs'

export default ArticleInputs
