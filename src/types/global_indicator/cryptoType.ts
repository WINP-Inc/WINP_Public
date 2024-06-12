type CryptoDataUSD = {
  price: number;
  percent_change_1h: number;
  last_updated: string;
};

export interface GlobalIndicatorDataType {
  id: number;
  name: string;
  icon: string;
  USD: CryptoDataUSD;
}

export const globalIndicatorDefaultValues: GlobalIndicatorDataType = {
  id: 0,
  name: '',
  icon: '',
  USD: {
    price: 0,
    percent_change_1h: 0,
    last_updated: '',
  }
}

