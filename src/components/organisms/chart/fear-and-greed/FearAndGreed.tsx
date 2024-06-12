import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const WidgetWrapper = styled.div`
  border-radius: 16px;
  background: #261F32;
  width: 100%;
`;

const WidgetHeader = styled.div`
  display: flex;
  border-bottom: solid 1px #4F4F4F;
  padding: 25px 30px;
  align-items: center;
  justify-content: space-between;
`;

const WidgetHeaderLeft = styled.div`
  span {
    font-size: 16px;
    font-weight: bold;
  }
`;

const WidgetHeaderRight = styled.div`
  width: 20px;
  height: 20px;

  img {
    position: static !important;
  }
`;

const WidgetBody = styled.div`
  padding: 25px 35px;
`;

const FearAndGreedWrapper = styled.div`
  position: relative;
`;

const FearAndGreedIndex = styled.div`
  width: 100%;

  img {
    position: static !important;
  }
`;

const FearAndGreedMeterWrapper = styled.div`
  position: absolute;
  top: 118px;
  left: 60px;
`

const FearAndGreedMeter = styled.div<{ length: number }>`
  position: relative;
  height: 2px; 
  background: #fff; 
  width: ${(props) => props.length}px;
  &:before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4; 
    border-top: 6px solid transparent; 
    border-bottom: 6px solid transparent; 
    border-right: 10px solid #fff; 
  }
  &:after {
    content: '•';
    position: absolute;
    right: -4px;
    bottom: -14px;
    color: #fff;
    font-size: 28px;
  }
`;


const FearAndGreed = () => {
  return (
    <WidgetWrapper>
      <WidgetHeader>
        <WidgetHeaderLeft>
          <span>Fear and Greed Meter</span>
        </WidgetHeaderLeft>
        <WidgetHeaderRight>
          <Image layout='fill' alt='fear-and-greed' src='/icons/fear-and-greed-info.svg' />
        </WidgetHeaderRight>
      </WidgetHeader>
      <WidgetBody>
        <FearAndGreedWrapper>
          <FearAndGreedIndex>
            <Image layout='fill' alt='fear-and-greed' src='/icons/fear-and-greed.svg' />
          </FearAndGreedIndex>
          <FearAndGreedMeterWrapper>
            <FearAndGreedMeter length={68} /> 
          </FearAndGreedMeterWrapper>
        </FearAndGreedWrapper>
      </WidgetBody>
    </WidgetWrapper>
  )
}

export default FearAndGreed;
