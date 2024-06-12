import React, { FC, memo, useEffect } from 'react'
import { styled } from 'styled-components'
import { IndicatorsItem } from './IndicatorsItem';
import { GlobalIndicatorDataType } from '@/types/global_indicator/cryptoType';


const SWidgetTable = styled.table`
  margin-bottom: 21px;
  margin-right: 0;
  width: 100%;
  line-height: normal;
  text-align: left;

  td {
    width: 26%;
  }

  tr {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-left: 40px;
  }
`;


const SWidgetThead = styled.thead`
  border-bottom: solid 1px #4E4360;
  display: block;
  padding-bottom: 12px;
  margin-bottom: 12px;
  width: 100%;

  td {
    font-size: 12px;
    font-weight: 400;
  }
`

const SWidgetTbody = styled.tbody`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;

  tr {
    display: flex;
    align-items: center;
    line-height: 24px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }

`

const SWidgetTr = styled.tr`
  display: block;
  position: relative;
  width: 100%;
  text-align: left;

  td {
    font-size: 11px;
  }
`;


interface IndicatorTableProps {
  assets: GlobalIndicatorDataType[] | null;
}

export const IndicatorsTable: FC<IndicatorTableProps> = memo(({ assets }) => {
  return (
    <>
      <SWidgetTable>
        <SWidgetThead>
          <SWidgetTr>
            <td>Name</td>
            <td>Rate</td>
            <td>Change</td>
          </SWidgetTr>
        </SWidgetThead>

        <SWidgetTbody>
          {
            assets?.map((asset, index) => {
              return (
                <IndicatorsItem asset={asset} key={index} />
              )
            })
          }
        </SWidgetTbody>
      </SWidgetTable>
    </>
  )
})

IndicatorsTable.displayName = 'IndicatorsTable';
