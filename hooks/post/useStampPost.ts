import { useState } from "react";

export const useStampPost = () => {
  const [transactionUrl, setTransactionUrl] = useState('');

  const handleTransactionUrl = (e: any) => {
    setTransactionUrl(e.target.value);
  }

  return {
    transactionUrl,
    handleTransactionUrl
  }
}