import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { GlobalIndicatorDataType } from '@/types/global_indicator/cryptoType';

const getIconPath = (symbol: string): string => {
  const icons: { [key: string]: string } = {
    BTC: '/icons/bitcoin-logo-svgrepo-com-1.svg',
    ETH: '/icons/ethereum.svg',
    DOGE: '/icons/dogecoin-doge-icon-1.svg',
    USDT: '/images/image-300.png',
    BNB: '/icons/bnb_28_2.png',
    USDC: '/icons/centre-usdc_28.png',
  };
  return icons[symbol] || '';
};

const fetchData = async (url: string, params: any): Promise<any> => {
  try {
    const response = await axios.get(url, { params });
    if (response.data) {
      return response.data;
    }
    throw new Error('No data returned from fetch.');
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const useFetchGlobalIndicator = () => {
  const [mapAssets, setMapAssets] = useState<Map<string, GlobalIndicatorDataType>>(new Map());
  const [searchText, setSearchText] = useState('');
  const [filteredAssetsMap, setFilteredAssetsMap] = useState<Map<string, GlobalIndicatorDataType>>(new Map());
  const assets = Array.from(mapAssets.values());
  const filteredAssets = Array.from(filteredAssetsMap.values());

  useEffect(() => {
    getDefaultAssets();
  }, []);

  useEffect(() => {
    getFilteredAssets();
  }, [searchText, mapAssets]);

  const getDefaultAssets = useCallback(async () => {
    try {
      const cryptoResponse = await fetchData('/api/indicator/crypts', { symbols: 'BTC,ETH,DOGE,BNB' });
      const metalResponse = await fetchData('/api/indicator/metal', { symbol: 'XAUROX=X' });
      const oilResponse = await fetchData('/api/indicator/oil', { symbol: '3OIL.L' });

      const newMap = new Map<string, GlobalIndicatorDataType>();

      Object.values(cryptoResponse?.data.data).forEach((crypto: any) => {
        newMap.set(crypto.symbol, {
          id: crypto.id,
          name: crypto.name,
          icon: getIconPath(crypto.symbol),
          USD: {
            price: crypto.quote.USD.price,
            percent_change_1h: crypto.quote.USD.percent_change_1h,
            last_updated: crypto.quote.USD.last_updated,
          },
        });
      });

      if (metalResponse) {
        newMap.set('XAUROX=X', {
          id: metalResponse.data.id,
          name: 'Gold',
          icon: '/icons/gold.png',
          USD: {
            price: metalResponse.data.regularMarketPrice,
            percent_change_1h: metalResponse.data.regularMarketChangePercent,
            last_updated: metalResponse.data.regularMarketTime,
          },
        });
      }

      if (oilResponse) {
        newMap.set('3OIL.L', {
          id: oilResponse.data.id,
          name: 'Oil',
          icon: '/icons/oil.png',
          USD: {
            price: oilResponse.data.regularMarketPrice,
            percent_change_1h: oilResponse.data.regularMarketChangePercent,
            last_updated: oilResponse.data.regularMarketTime,
          },
        });
      }

      setMapAssets(newMap);
      setFilteredAssetsMap(newMap);
    } catch (error) {
      console.error('Error setting assets:', error);
    }
  }, []);

  const getFilteredAssets = () => {
    const filtered = new Map(
      [...mapAssets].filter(([key, value]) =>
        value.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredAssetsMap(filtered);
  }

  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);
  };

  return { assets, handleSearchChange, searchText, filteredAssets, getFilteredAssets };
};

export default useFetchGlobalIndicator;
