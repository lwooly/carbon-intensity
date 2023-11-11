import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EnergyMixChart from './EnergyMixChart';
import { Dispatch, SetStateAction } from 'react';

interface BasicPopoverProps {
    anchorEl: SVGPathElement,
    setAnchorEl: Dispatch<SetStateAction<SVGPathElement>>
}


const BasicPopover:React.FC<BasicPopoverProps> = ({anchorEl, setAnchorEl}) => {

//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

console.log(anchorEl?.id)

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography sx={{ p: 2 }}>Energy Generation Mix</Typography>
        <EnergyMixChart svgPath={anchorEl}/>
      </Popover>
    </div>
  );
}

export default BasicPopover