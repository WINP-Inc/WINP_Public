import React, { FC } from 'react'
import BaseLlmModal from '../chat/BaseLlmModal'
import styled from 'styled-components';
import { styleModalType } from '@/types/modal/styleModalType';
import { Styles } from 'react-modal';

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 28px;
`

const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h3 {
    font-size: 22px;
    font-weight: 500;
    font-feature-settings: 'clig' off, 'liga' off;
    line-height: 28px;
    color: #FFFFFF;
  }

  span {
    color: #9591A4;
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
  }

  &:hover {
    cursor: pointer;

    h3 {
      text-decoration: underline;
    }
  }
`

interface LlmHistoryModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const StyleModal: styleModalType = {
  lg: {
    width: '100%',
    height: '253px',
    position: 'relative',
    borderRadius: '12px',
    backgroundColor: '#302A43',
    border: 'none',
    padding: '0',
    top: 'calc(100% - 420px + 20px)',
    left: 'calc(100% - (420px + 60px))',
  },
  md: {
    width: '700px',
    height: 'auto',
    position: 'absolute',
    borderRadius: '12px',
    backgroundColor: '#302A43',
    border: 'none',
    padding: '0',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
}

const LlmHistoryModal: FC<LlmHistoryModalProps> = ({ isOpen, closeModal }) => {
  const llmModalStyle: Styles = {
    overlay: {
      background: "rgba(0, 0, 0, 0.40)",
      zIndex: 50
    },
    content: {
      width: '700px',
      height: 'auto',
      position: 'absolute',
      borderRadius: '12px',
      backgroundColor: '#302A43',
      border: 'none',
      padding: '0',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }
  }
  return (
    <BaseLlmModal
      isOpen={isOpen}
      closeModal={closeModal}
      title='history'
      styles={llmModalStyle}
    >
      <HistoryContainer>
        <HistoryItem>
          <h3>Will Ethereum take over Bitcoin?</h3>
          <span>22 Aug, 2023</span>
        </HistoryItem>
        <HistoryItem>
          <h3>Will Ethereum take over Bitcoin?</h3>
          <span>22 Aug, 2023</span>
        </HistoryItem>
        <HistoryItem>
          <h3>Will Ethereum take over Bitcoin?</h3>
          <span>22 Aug, 2023</span>
        </HistoryItem>
        <HistoryItem>
          <h3>Will Ethereum take over Bitcoin?</h3>
          <span>22 Aug, 2023</span>
        </HistoryItem>
      </HistoryContainer>
    </BaseLlmModal>
  )
}

export default LlmHistoryModal
