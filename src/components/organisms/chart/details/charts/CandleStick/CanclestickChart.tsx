import React from 'react';
import { styles } from './Styles';
import Chart from "react-apexcharts";

type ChartProps = {
  chartData: any;
  chartOptions: any;
  chartType: string;
  chartTitle: string;
  chartDescription: string;
  chartButton: string;
  chartButtonLink: string;
  chartButtonIcon: any;
  crypto: string;
};

const CandleStickChart = ({ chartData, chartOptions }: ChartProps) => {
  return (
    <div>
      <div>
        <div>
          <div id="chart">
            <Chart
              options={chartOptions}
              series={chartData}
              type="candlestick"
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandleStickChart;