import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';
import { useMediaQuery, useTheme } from '@mui/material';
import { ForecastDataItem } from '../lib/utils/structureForcecastFn';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// eslint-disable-next-line react/function-component-definition
function EnergyMixChart({ mixData }: { mixData: ForecastDataItem | null }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  // check if forecast data has been provided. If not return empty.
  if (!mixData) {
    return null;
  }
  // set chart data
  const generationMix = mixData.forecast.generationmix;
  const labels = generationMix.map(
    (fuel) => fuel.fuel.charAt(0).toUpperCase() + fuel.fuel.slice(1)
  );

  const fuelPerc = generationMix.map((fuel) => fuel.perc);

  // set labels below on mobile
  const position: 'right' | 'bottom' = matches ? 'right' : 'bottom';

  // configure chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position,
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
        label: '% of Energy Mix',
        data: fuelPerc,
        backgroundColor: [
          'rgba(255, 206, 86, 0.5)', // Biomass: Yellow
          'rgba(165, 42, 42, 0.5)', // Coal: Brown (Assumed)
          'rgba(255, 99, 132, 0.5)', // Imports: Light red
          'rgba(255, 159, 64, 0.5)', // Gas: Orange
          'rgba(153, 102, 255, 0.5)', // Nuclear: Light purple
          'rgba(255, 99, 132, 0.5)', // Other: Light red
          'rgba(54, 162, 235, 0.5)', // Hydro: Blue
          'rgba(54, 162, 235, 0.5)', // Solar: Lighter green-blue
          'rgba(75, 192, 192, 0.5)', // Wind: Green
        ],

        borderColor: [
          'rgba(255, 206, 86, 1)', // Biomass: Yellow
          'rgba(165, 42, 42, 1)', // Coal: Brown (Assumed)
          'rgba(255, 99, 132, 1)', // Imports: Light red
          'rgba(255, 159, 64, 1)', // Gas: Orange
          'rgba(153, 102, 255, 1)', // Nuclear: Light purple
          'rgba(255, 99, 132, 1)', // Other: Light red
          'rgba(54, 162, 235, 1)', // Hydro: Blue
          'rgba(54, 162, 235, 1)', // Solar: Lighter green-blue
          'rgba(75, 192, 192, 1)', // Wind: Green
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} options={options} />;
}

export default EnergyMixChart;
