import React from 'react'
import styled from 'styled-components'

const SelectWrapper = styled.div`
  select {
    cursor: pointer;
    width: 90px;
    padding: 4px 8px;
    border-radius: 4px;
    background: #261F32;
    color: #FFF;
    font-family: Poppins;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: none;
  }
`

const MarketTrendingSelector = () => {
  return (
    <SelectWrapper>
      <select>
        <option value="24h">24h</option>
        <option value="1h">1h</option>
      </select>
    </SelectWrapper>
  )
}

export default MarketTrendingSelector
