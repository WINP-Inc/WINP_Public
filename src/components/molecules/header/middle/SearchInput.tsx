import styled from "styled-components"
import React, { FC, useEffect, useRef, useState } from 'react'
import media from "styled-media-query";
import SearchModal from "@/components/organisms/modal/home/search/SearchModal";

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
`

const SearchElementsWrapper = styled.div<{width?: string}>`
  width: ${props => props.width ? props.width : '450px'};
  position: relative;

  ${media.lessThan('medium')`
    width: 100%;
  `}
`;

const SearchInputElement = styled.input<{radius?: string}>`
  width: 100%;
  padding: 12px 0;
  padding-left: calc(30px + 24px);
  border-radius: ${props => props.radius ? props.radius : '26px'};
  background-color: #27203D;
  border: none;
  color: #fff;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: #726C86
  }

  ${media.lessThan('medium')`
    font-size: 12px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 40px;
  `}
`;

const SearchButton = styled.button`
  cursor: pointer;
  width: 24px;
  height: 24px;
  position: absolute;
  left: 22px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent url('/icons/MagnifyingGlass.svg') center center;
  background-size: 24px 24px;

  ${media.lessThan('medium')`
    background-size: 20px 20px;
    left: 12px;
  `}
`;

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  radius?: string;
  width?: string;
  onChange?: (e?: any) => void;
  onClick?: (e?: any) => void;
}


const SearchInput: FC<SearchInputProps> = ({ placeholder = 'Search...', value, onChange, radius, width, onClick }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputStyleWithPosition, setInputStyleWithPosition] = useState<{ width: string, left: string, top: string } | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      setInputStyleWithPosition({
        width: `${inputRect.width}px`,
        left: `${inputRect.left}px`,
        top: `${inputRect.top + inputRect.height + 13}px`
      })
    }
  }, [])

  return (
    <SearchInputContainer>
      <SearchElementsWrapper width={width}>
        <SearchInputElement ref={inputRef} type="text" placeholder={placeholder} value={value} onChange={onChange} radius={radius} />
        <SearchButton onClick={onClick} />
      </SearchElementsWrapper>
      <SearchModal inputStyleWithPosition={inputStyleWithPosition} />
    </SearchInputContainer>
  )
}

export default SearchInput

