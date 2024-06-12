import BaseAuthAccountModal from '@/components/templates/auth/modal/BaseAuthAccountModal'
import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components';
import { useNFTSale } from '../../../../../../context/nft/NFTAuction';
import CircleLoader from 'react-spinners/CircleLoader';
import { CircularProgress } from '@mui/material';

const ModalHeader = styled.div`
  margin-bottom: 20px;
  text-align: left;

  span {
    display: block;
    font-size: 20px;
    line-height: normal;
    font-weight: 600;
  }
`

const ModalBody = styled.div`
  margin-bottom: 32px;
`

const ModalBodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  input[type="number"] {
    width: 295px;
    padding: 16px 16px;
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    color: #FFF;
    outline: none;
    border: none;
    background: #302A43;
    border-radius: 8px;
    
  }

  span {
    display: block;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
  }
`

const ModalFooter = styled.div`
  button {
    width: 100%;
    display: block;
    cursor: pointer;
    background: #8043F9;
    height: 52px;

    &:hover {
      opacity: 0.8;
    }

    &:disabled {
      background: #302A43;
      cursor: not-allowed;

      &:hover {
        opacity: 1;
      }
    }
  }
`

const ButtonText = styled.span`
  line-height: 18px;
  color: #FFF;
  font-weight: 400;
  border-radius: 100px;
`

const ButtonLoader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  span {
    width: 35px;
    height: 35px;
  }
`

const SelectPiceModal: FC = () => {
  const {
    isOpenByPrice,
    closeByPrice,
    isButtonDisabled,
    placeToAuction,
    amountPrice,
    setAmountPrice,
    loading
  } = useNFTSale();

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    placeToAuction();
  }

  return (
    <BaseAuthAccountModal
      isOpen={isOpenByPrice}
      closeModal={closeByPrice}
      width='407px'
    >
      <ModalHeader>
        <span>Set the Max Price</span>
      </ModalHeader>
      <ModalBody>
        <ModalBodyContainer>
          <input
            type="number"
            step="0.0001"
            value={amountPrice}
            onChange={(e) => {
              const inputValue = e.target.value;
              setAmountPrice(parseFloat(inputValue));
            }}
            placeholder="Enter between 0.0001 - 10"
          />
          <span>MATIC</span>
        </ModalBodyContainer>
      </ModalBody>
      <ModalFooter>
        <button onClick={onSubmit} disabled={isButtonDisabled}>
          {loading ? (
            <ButtonLoader>
              <CircularProgress color='info' />
            </ButtonLoader>
          ) : (
            <ButtonText>Place to Auction</ButtonText>
          )}
        </button>
      </ModalFooter>
    </BaseAuthAccountModal>
  )
}

export default SelectPiceModal
