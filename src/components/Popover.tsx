import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Dispatch, SetStateAction } from 'react';

interface BasicPopoverProps {
  anchorEl: SVGPathElement;
  setAnchorEl: Dispatch<SetStateAction<SVGPathElement | null>>;
}

// eslint-disable-next-line react/function-component-definition
const BasicPopover: React.FC<BasicPopoverProps> = ({
  anchorEl,
  setAnchorEl,
}) => {

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    anchorEl && (
      <div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Typography sx={{ p: 2 }}>{anchorEl.id}</Typography>
        </Popover>
      </div>
    )
  );
};

export default BasicPopover;
