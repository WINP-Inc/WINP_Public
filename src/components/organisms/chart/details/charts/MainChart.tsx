import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import CandleStickChart from './CandleStick/CanclestickChart'
import { styles } from './Styles';

import dynamic from 'next/dynamic';
import { PricesContext } from '../../../../../../context/prices';
import CryptoChart from './CryptoChart/CryptoChart';
import { usePrices } from '../../../../../../hooks/chart/price';
import { cryptoChartOptions } from '../../../../../../utils/chart/cryptoChartOptions';
import styled from 'styled-components';

const MainChartWrapper = styled.div`
  background-color: #261F32;
  padding-top: 18px;
`

const ChartHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`

const TimeOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 3px;

  span {
    cursor: pointer;
    color: #848E9C;
    font-family: Arial;
    font-size: 11.976px;
    font-style: normal;
    font-weight: 400;
    line-height: 15.967px;

    &.active {
      color: #F0B90B;
    }
  }
`

const ChartTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-right: 70px;

  span {
    font-family: Arial;
    font-size: 11.976px;
    font-style: normal;
    font-weight: 400;
    line-height: 15.967px; /* 133.333% */
    letter-spacing: 0.319px;

    &:first-child {
      color: #8043F9;
    }

    &:last-child {
      color: #B1B1B1;
    }
  }
`


const MainChartContainer = styled.div`
  /* height: 76vh; */
  margin-top: 56px;
  padding: 40px;
  border-top: solid 1px #4F4F4F;
`

const SMainChart = styled.div`
  height: 500px;
  /* border: solid 1px #4F4F4F; */
`

const MainChart = () => {
  const { crypto, candlestickData, getPrices } = useContext(PricesContext);
  const { chartData, AIChartData, getPredictedPrice } = usePrices();
  const [currentSelected, setCurrentSelected] = useState('1 Month');

  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');

  const convertSelectedTimeToDays = (time: string) => {
    switch (time) {
      case '1 Month':
        return 30;
      case '1 Week':
        return 7;
      case '1 Day':
        return 1;
      default:
        return 30;
    }
  }

  useEffect(() => {
    getPrices(selectedCrypto, convertSelectedTimeToDays(currentSelected));
    getPredictedPrice({
      crypto: selectedCrypto,
      days: convertSelectedTimeToDays(currentSelected)
    });
  }, [selectedCrypto, currentSelected, getPredictedPrice, getPrices]);

  const handleCryptoChange = (crypto: string, currentSelected = '1 Month') => {
    getPrices(selectedCrypto, convertSelectedTimeToDays(currentSelected));
    getPredictedPrice({
      crypto: selectedCrypto,
      days: convertSelectedTimeToDays(currentSelected)
    });
  }

  return (
    <MainChartWrapper>
      <ChartHead>
        <TimeOptions>
          <span>Time</span>
          <span className={currentSelected === '1 Month' ? 'active' : ''} onClick={() => {
            setCurrentSelected('1 Month')
            handleCryptoChange('bitcoin', '1 Month')
          }
          }>
            1 Month
          </span>
          <span className={currentSelected === '1 Week' ? 'active' : ''} onClick={() => {
            setCurrentSelected('1 Week')
            handleCryptoChange('bitcoin', '1 Week')
          }
          }>
            1 Week
          </span>
          <span className={currentSelected === '1 Day' ? 'active' : ''} onClick={() => {
            setCurrentSelected('1 Day')
            handleCryptoChange('bitcoin', '1 Day')
          }}>
            1 Day
          </span>
        </TimeOptions>
        <ChartTitle>
          <span>Prediction Price</span>
          <span>Bitcoin Price</span>
        </ChartTitle>
      </ChartHead>
      <MainChartContainer>
        <SMainChart>
          <CryptoChart
            chartData={chartData}
            crypto={crypto}
            chartOptions={cryptoChartOptions}
            chartType="line"
            chartTitle='Chart Title'
            chartDescription='Chart Description'
          />
        </SMainChart>
      </MainChartContainer>
    </MainChartWrapper>
  )
}

export default MainChart
