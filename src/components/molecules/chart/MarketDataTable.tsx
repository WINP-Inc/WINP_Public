import { FC } from "react";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Row = styled.tr`
  display: flex;
  align-items: center;
  gap: 26px;
`;

const HeaderCell = styled.th`
  text-align: left;
  color: #848E9C;
  font-family: Arial;
  font-size: 10.978px;
  font-style: normal;
  font-weight: 400;
  line-height: 15.967px; /* 145.455% */
  width: 16%;
`;

const DataCell = styled.td`
  width: 16%;
  text-align: left;
  color: #EAECEF;
  font-family: Arial;
  font-size: 10.978px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:first-child {
    color: #F6465D;
  }
`;

interface MarketDataTableProps {
  priceChange: {
    price: number;
    percentage: number;
  },
  minPrice: number;
  maxPrice: number;
  volumeBTC: number;
  VolumeUSDT: number;
}

const MarketDataTable: FC<MarketDataTableProps> = ({
  priceChange,
  minPrice,
  maxPrice,
  volumeBTC,
  VolumeUSDT
}) => {
  return (
    <Table>
      <thead>
        <Row>
          <HeaderCell>24h Change</HeaderCell>
          <HeaderCell>24h High</HeaderCell>
          <HeaderCell>24h Low</HeaderCell>
          <HeaderCell>24h Volume(BTC)</HeaderCell>
          <HeaderCell>24h Volume(USDT)</HeaderCell>
        </Row>
      </thead>
      <tbody>
        <Row>
          <DataCell>{priceChange.price.toLocaleString()}　{priceChange.percentage}%</DataCell>
          <DataCell>{minPrice.toLocaleString()}</DataCell>
          <DataCell>{maxPrice.toLocaleString()}</DataCell>
          <DataCell>{volumeBTC.toLocaleString()}</DataCell>
          <DataCell>{VolumeUSDT.toLocaleString()}</DataCell>
        </Row>
      </tbody>
    </Table>
  );
};

export default MarketDataTable;