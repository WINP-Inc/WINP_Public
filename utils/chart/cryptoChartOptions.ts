export const cryptoChartOptions = {
  showLine: true,
  bezierCurve: true,
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: { display: true },
      grid: { drawBorder: false, display: false },
    },
    y: {
      position: 'right',
      ticks: { display: true, beginAtZero: true },
      grid: { drawBorder: true, display: true, color: '#4F4F4F' },
    },
  },
  plugins: {
    legend: { display: false },
    zoom: {
      zoom: { wheel: { enabled: true }, mode: "xy", speed: 100 },
      pan: { enabled: true, mode: "xy", speed: 100 },
    },
  },
}