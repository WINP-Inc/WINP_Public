import React from 'react';
import { Bar, Line, Scatter } from 'react-chartjs-2';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { styles } from './Styles';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
)

type ChartProps = {
  chartData: any;
  chartOptions: any;
  chartType: string;
  chartTitle: string;
  chartDescription: string;
  crypto: string;
};

const CryptoChart = ({ crypto, chartData, chartOptions, chartType }: ChartProps) => {
  return (
    <>
      {chartType === 'bar' && (
        <Bar
          data={chartData}
          options={chartOptions}
        />
      )}
      {chartType === 'line' && (
        <Line
          data={chartData}
          options={chartOptions}
        />
      )}
      {chartType === 'scatter' && (
        <Scatter
          data={chartData}
          options={chartOptions}
        />
      )}
    </>
  )
};

export default CryptoChart;