import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ForecastData } from '../types/RegionalForecast.types';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface EnergyMixChartProps {
  svgPath: SVGPathElement;
}

// eslint-disable-next-line react/function-component-definition
const EnergyMixChart: React.FC<EnergyMixChartProps> = ({ svgPath }) => {
  // fetch energy mix from state for the current time as shown on the map. - this could get updated to include the time etc.
  console.log(svgPath?.id);

  const regionEnergyMix = useSelector((state: RootState) => {
    const currentForecast = state.regionalForecast.regionData.data[0];
    console.log(currentForecast, `current forecast`);
  });

  console.log(regionEnergyMix, `regionalEnergyMix`);

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
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

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default EnergyMixChart;
