'use client'
import React, { createContext, useEffect, useState, useCallback } from 'react';
import axiosInterceptor from "../hooks/axiosInterceptor";

export const PricesContext = createContext();

export const PricesProvider = ({ children }) => {
    const [prices, setPrices] = useState([
        {
            "date": "2021-01-01",
            "price": "29374.00",
            "month": "January",
            "predicted": false
        }
    ]);
    const [predictedPrice, setPredictedPrice] = useState([
        {
            "date": "2021-01-01",
            "price": "29374.00",
            "month": "January",
            "predicted": true,
        }
    ]);
    const [candlestickData, setCandlestickData] = useState([
        [1612137600000, 29374.00, 29374.00, 29374.00, 29374.00],
        [1612224000000, 32127.00, 32127.00, 32127.00, 32127.00],
        [1612310400000, 33425.00, 33425.00, 33425.00, 33425.00],
    ]);

    const getPrices = useCallback(async ({ crypto = 'bitcoin', days = 30 }) => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=${days}days&interval=daily`);
            const data = await response.json();
            data.prices.sort((a, b) => a[0] - b[0]);
            data.prices.forEach((price) => {
                const date = new Date(price[0]);
                const month = date.toLocaleString('default', { month: 'long' });
                price[0] = date.toLocaleDateString();
                price[2] = month;
                price[3] = false;
            });
            setPrices(data.prices);
        } catch (error) { 
            console.error(error);
        }
    }, [crypto]);

    const getCandleStickData = useCallback(async () => {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}/ohlc?vs_currency=usd&days=365`);
        const data = await response.json();
        console.log(data)
        let series = [];
        const candlestickData = data.map((price) => {
            console.log(price)
            const chartData = [price[0], price[1], price[2], price[3], price[4]];
            return chartData;
        });
        series.push({ data: candlestickData });
        setCandlestickData(series);
    }, [])

    // useEffect(() => {
    //     getPrices();
    //     // getCandleStickData();
    //     const interval = setInterval(() => {
    //         getPrices();
    //         // getCandleStickData();
    //     }, 5000);
    //     return () => clearInterval(interval);
    // }, [getPrices, getCandleStickData]);

    return (
        <PricesContext.Provider value={{
            prices,
            setPrices,
            predictedPrice,
            setPredictedPrice,
            candlestickData,
            getPrices,
        }}>
            {children}
        </PricesContext.Provider>
    )
};