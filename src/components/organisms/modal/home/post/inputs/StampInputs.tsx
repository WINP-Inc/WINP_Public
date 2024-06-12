import React from 'react'
import { useStampPost } from '../../../../../../../hooks/post/useStampPost';
import BaseVerifiedInput from '@/components/molecules/home/post/BaseVerifiedInput';
import { useCoinStamp } from '../../../../../../../context/coin/CoinStamp';

const StampInputs = () => {
  const { transactionAddress, handleTransactionAddress, currency, handleCurrency } = useCoinStamp();

  const currencyOptions = [
    { label: 'Ethereum', value: 'eth' },
    { label: 'Binance Smart Chain', value: 'bsc' },
    { label: 'Polygon', value: 'matic' },
    { label: 'Bitcoin', value: 'btc' },
    { label: 'Sepolia Eth', value: 'sepolia' },
  ]
  return (
    <>
      <BaseVerifiedInput
        value={transactionAddress}
        icon='/icons/carbon-cics-transaction-server-zos.svg'
        placeholder='Transaction address'
        disabled={false}
        onChange={handleTransactionAddress}
        required={true}
      />
      <BaseVerifiedInput
        type='select'
        placeholder='Currency'
        value={currency}
        icon='/icons/coin-stamp-currency.svg'
        options={currencyOptions}
        onChange={handleCurrency}
        required={true}
      />
    </>
  )
}

export default StampInputs
