import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';
import { ForecastDataItem } from '../lib/utils/structureForcecastFn';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// eslint-disable-next-line react/function-component-definition
function EnergyMixChart({ mixData }: { mixData: ForecastDataItem | null }) {
  // check if forecast data has been provided. If not return empty.
  if (!mixData) {
    return null;
  }
  // set chart data
  const generationMix = mixData.forecast.generationmix;
  const labels = generationMix.map((fuel) => fuel.fuel);
  const fuelPerc = generationMix.map((fuel) => fuel.perc);

  // configure chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      datalabels: {
        formatter: (value: number, context: Context) => {
          const fuel = context.chart.data.labels
            ? context.chart.data.labels[context.dataIndex]
            : null;
          if (value < 3) {
            return '';
          }
          return `${fuel}:\n${value}%`;
        },
        color: 'black',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: '# of Votes',
        data: fuelPerc,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} options={options} />;
}

export default EnergyMixChart;
