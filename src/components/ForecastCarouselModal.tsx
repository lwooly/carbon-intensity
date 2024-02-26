import InfoIcon from '@mui/icons-material/Info';
import BasicModal from './BasicModal';

function ForecastCarouselModal() {
  // modal info
  const modalTitle = 'Carbon Intensity Forcast Information';
  const modalDescriptiveText =
    'The "carbon intensity" of electricity is a measure of how many grams of carbon dioxide (CO2) emissions are produced for every kilowatt-hour of electricity consumed. This number will be higher when a significant amount of coal or gas is being used and lower when more renewables (like wind or solar) or nuclear energy are being used.';

  return (
    <BasicModal
      icon={<InfoIcon />}
      title={modalTitle}
      text={modalDescriptiveText}
    />
  );
}

export default ForecastCarouselModal;
