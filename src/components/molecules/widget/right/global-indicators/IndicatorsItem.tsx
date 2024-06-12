import { GlobalIndicatorDataType } from '@/types/global_indicator/cryptoType';
import Image from 'next/image';
import React, { FC, memo } from 'react'
import { styled } from 'styled-components'


const SWidgetTr = styled.tr`
  display: block;
  position: relative;
  width: 100%;
  text-align: left;

  td {
    font-size: 11px;
    /* width: 40px; */

    img {
      position: absolute;
      left: -30px !important;
      top: 50% !important;
      transform: translateY(-50%);
      width: 24px !important;
      height: 24px !important;
      object-fit: contain;
    }
  }
`;

const TrendingRate = styled.td<{ color?: string }>`
  color: ${props => {
    switch (props.color) {
      case 'plus':
        return "#66E792"

      case 'unchanged':
        return "#66D7E7"

      case 'minus':
        return "#DF1414"

      default:
        return "#000"
    }
  }};
`;

const changeTrendingSymbol = (value: string): React.ReactNode => {
  let sign;

  if (value === '0.0') {
    sign = 'unchanged';
  } else if (value.includes('-')) {
    sign = 'minus';
  } else {
    sign = 'plus';
  }

  switch (sign) {
    case 'plus':
      return <TrendingRate color={sign}>+{value}%</TrendingRate>;

    case 'minus':
      return <TrendingRate color={sign}>{value}%</TrendingRate>;

    case 'unchanged':
      return <TrendingRate color={sign}>{value}%</TrendingRate>;

    default:
      throw new Error('The specified code is incorrect.');
  }
}

interface IndicatorItemProps {
  asset: GlobalIndicatorDataType
}

export const IndicatorsItem: FC<IndicatorItemProps> = memo(({ asset }) => {

  return (
    <SWidgetTr>
      <td>
        <Image layout="fill" src={asset.icon} alt='iconURL'  />
        <span>{asset.name}</span>
      </td>
      <td>${asset.USD.price.toLocaleString()}</td>
      {changeTrendingSymbol(asset.USD.percent_change_1h.toLocaleString())}
    </SWidgetTr>
  )
})

IndicatorsItem.displayName = 'IndicatorsItem';
