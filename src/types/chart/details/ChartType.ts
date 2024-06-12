export interface ChartHeadDataType {
  title: string;
  price: number;
  change_24h: {
    price: number;
    percentage: number;
  },
  maximumPrice: number;
  minimumPrice: number;
  volumeBTC: number;
  volumeUSDT: number;
}


