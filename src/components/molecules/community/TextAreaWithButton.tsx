import Image from 'next/image'
import React, { FC, useEffect } from 'react'
import styled from 'styled-components'

const InputSubmitWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  textarea {
    font-family: Poppins;
    resize: none;
    padding: 10px 50px 10px 10px;
    border-radius: 8px;
    background: #3C3551;
    width: 100%;
    height: 60px;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    border: none;
    outline: none;

    &::-webkit-scrollbar {
      display: none;
    }

    &::placeholder {
      color: #7A738F;
    }
  }

  button {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #8043F9;
    text-align: center;
  }
`

const ButtonIcon = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  img {
    position: absolute;
    width: 14px;
    height: 12px;
    top: 50%;
    left: calc(50% + 2px);
    transform: translate(-50%, -50%);
  }
`;

interface TextAreaWithButtonProps {
  handleChangeInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick: (e?: any) => void;
  message: string
}

const TextAreaWithButton: FC<TextAreaWithButtonProps> = ({ handleChangeInput, message, onClick }) => {
  const [isTextAvailable, setIsTextAvailable] = React.useState<boolean>(false);
  
  useEffect(() => {
    if (!message.trim()) {
      setIsTextAvailable(false);
    } else {
      setIsTextAvailable(true);
    }
  }, [message])

  return (
    <InputSubmitWrapper>
      <textarea placeholder='type your message' onChange={handleChangeInput} value={message}></textarea>
      {isTextAvailable && (
        <button onClick={onClick}>
          <ButtonIcon>
            <Image src='/icons/comment-submit.svg' alt='send' width={14} height={12} />
          </ButtonIcon>
        </button>
      )}
    </InputSubmitWrapper>
  )
}

export default TextAreaWithButton
