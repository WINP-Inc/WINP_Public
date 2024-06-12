import BaseAuthAccountModal from '@/components/templates/auth/modal/BaseAuthAccountModal'
import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`

const ModalHeader = styled.div`
  text-align: center;

  span {
    display: block;
    font-size: 24px;
    font-weight: 700;
    line-height: normal;
  }
`

const ModalBody = styled.div``

const ModalDetails = styled.div`
  text-align: center;

  span {
    color: #949494;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.1px;
    text-transform: uppercase;
    line-height: 18px;
  }
`

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  button {
    width: 100%;
    padding: 12px 10px 10px 16px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.1px;
    cursor: pointer;
    color: #FFF;
    
    &:hover {
      opacity: 0.8;
    }
    
    &:first-child {
      background: #302A43;
    }

    &:nth-child(2) {
      background: #8043F9;
    }
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    color: #949494;
    font-weight: 500;
    text-transform: uppercase;
    padding-bottom: 27px;
  }

  td {
    color: #fff;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.1px;
    text-transform: uppercase;
    line-height: 18px;
    padding-top: 11px;
    padding-bottom: 11px;
  }

  tbody tr {
    border: 1px solid transparent;

    &:hover {
      cursor: pointer;
      background-color: #372D47;
      box-shadow: 0 0 0 1px #8043F9 inset;
    }
  }
`

const CustomRadio = styled.div`
  display: inline-block;
  position: relative;

  input[type="radio"] {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + label:after {
      display: block;
    }
  }

  label {
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    user-select: none;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #fff;
      border: 1px solid #ddd;
    }

    &:after {
      content: '';
      position: absolute;
      display: none;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #8043F9;
      border: 1px solid #ddd;
    }
  }
`;

export interface TransactionDataType {
  project: string;
  price: number;
  time: string;
}

interface SelectedWalletModalProps {
  isOpen: boolean;
  closeModal: () => void;
  transactions?: TransactionDataType[];
  transactionCancel?: (e?: any) => void;
  transactionNext?: (e?: any) => void;
}

const SelectedTransactionModal: FC<SelectedWalletModalProps> = ({ isOpen, closeModal, transactions, transactionCancel, transactionNext }) => {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);

  const handleRowClick = (transaction: TransactionDataType, id: number) => {
    setSelectedTransaction(transaction.project + id);
  };

  return (
    <BaseAuthAccountModal
      isOpen={isOpen}
      closeModal={closeModal}
      width='560px'
    >
      <ModalContainer>
        <ModalHeader>
          <span>Your Transactions</span>
        </ModalHeader>
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>NFT PROJECT</th>
                <th>PRICE</th>
                <th>TIME</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction, index) => {
                return (
                  <tr key={index} onClick={() => handleRowClick(transaction, index)}>
                    <td>
                      <CustomRadio>
                        <input
                          type="radio"
                          name="transaction"
                          id={`transaction-${index}`}
                          checked={selectedTransaction === transaction.project + index}
                          onChange={() => handleRowClick(transaction, index)}
                        />
                        <label htmlFor={`transaction-${index}`}></label>
                      </CustomRadio>
                    </td>
                    <td>{transaction.project}</td>
                    <td>${transaction.price}</td>
                    <td>{transaction.time}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </ModalBody>
        <ModalDetails><span>show more transactions</span></ModalDetails>
        <ModalFooter>
          <button onClick={transactionCancel}>Cancel</button>
          <button onClick={transactionNext}>Next</button>
        </ModalFooter>
      </ModalContainer>
    </BaseAuthAccountModal>
  )
}

export default SelectedTransactionModal
