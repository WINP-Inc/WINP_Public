import React, { useCallback, useContext, useEffect, useState } from 'react';
import { PricesContext } from '../../context/prices';
import axiosInterceptor from '../axiosInterceptor';

export const usePrices = () => {
    const { prices, } = useContext(PricesContext);
    const [predictedPrice, setPredictedPrice] = useState<any[]>([]);

    const getPredictedPrice = useCallback(async ({ crypto = 'bitcoin', days = 30 }) => {
        const response = await axiosInterceptor.get(`${process.env.NEXT_PUBLIC_API_URL}price-predict?tokenSymbol=${crypto}&days=${days}`);
        const data = response.data;
        if (data) {
            data.result.forEach((price: any[]) => {
                price[0] = price[0]
                price[2] = price[2]
                price[3] = price[3]
                price[1] = price[1]
            });
            console.log(data.result)
            setPredictedPrice(data.result);
        }
    }, [])

    const chartData = {
        labels: prices.map((price: any) => price[0]),
        datasets: [
            {
                label: 'Bitcoin Price',
                lineTension: 0.2,
                backgroundColor: '#B1B1B1',
                borderColor: '#B1B1B1',
                fill: false,
                borderWidth: 1,
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                // pointBorderColor: '#753FE0',
                // pointBackgroundColor: '#fff',
                // pointBorderWidth: 1,
                // pointHoverRadius: 5,
                // pointHoverBackgroundColor: '#753FE0',
                // pointHoverBorderColor: 'rgba(220,220,220,1)',
                // pointHoverBorderWidth: 2,
                pointRadius: 0,
                // pointHitRadius: 10,
                data: prices.map((price: any) => price[1])
            },
            {
                label: 'Prediction Price',
                lineTension: 0.2,
                backgroundColor: '#753FE0',
                borderColor: '#753FE0',
                fill: false,
                borderWidth: 1,
                // borderCapStyle: 'line',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                // pointBorderColor: '#753FE0',
                // pointBackgroundColor: '#fff',
                // pointBorderWidth: 1,
                // pointHoverRadius: 5,
                // pointHoverBackgroundColor: '#753FE0',
                // pointHoverBorderColor: 'rgba(220,220,220,1)',
                // pointHoverBorderWidth: 2,
                pointRadius: 0,
                // pointHitRadius: 10,
                data: predictedPrice.map((price: any) => price[1])
            },
        ]
    };
    const AIChartData = {
        labels: predictedPrice.map((price: any) => price[0]),
        datasets: [
            {
                label: 'AI Prediction',
                lineTension: 0.4,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#F425F9',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#F425F9',
                pointBackgroundColor: '#F425F9',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#F425F9',
                pointHoverBorderColor: '#F425F9',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: predictedPrice.map((price: any) => price[1])
            }
        ]
    };
    return { chartData, AIChartData, getPredictedPrice, predictedPrice};
};

