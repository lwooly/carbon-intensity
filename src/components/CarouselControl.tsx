import { Box, Button, MobileStepper } from '@mui/material';
import { Dispatch, MouseEvent, SetStateAction } from 'react';

function CarouselControl({
  cardIndexs,
  setCardIndexs,
  cardNumber,
  showCardChartIndex,
}: {
  cardIndexs: number[];
  setCardIndexs: Dispatch<SetStateAction<number[]>>;
  cardNumber: number;
  showCardChartIndex: number | null;
}) {
  // handle click on buttons to show the correct cards in the carousel.
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    const action = event.currentTarget.getAttribute('data-action');
    let n = 0;
    if (action === 'next') {
      n = 1;
    }
    if (action === 'previous') {
      n = -1;
    }
    const newCardIndexs = cardIndexs.map((cardIndex) => {
      return cardIndex + n;
    });
    setCardIndexs(newCardIndexs);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <MobileStepper
        variant="progress"
        steps={cardNumber - cardIndexs.length + 1}
        position="static"
        activeStep={cardIndexs[0]}
        sx={{ flexGrow: 1 }}
        backButton={
          <Button
            variant="outlined"
            data-action="previous"
            onClick={handleClick}
            disabled={cardIndexs[0] < 1 || showCardChartIndex !== null}
          >
            Previous
          </Button>
        }
        nextButton={
          <Button
            variant="outlined"
            data-action="next"
            onClick={handleClick}
            disabled={
              cardIndexs[0] > cardNumber - cardIndexs.length - 1 ||
              showCardChartIndex !== null
            }
          >
            Next
          </Button>
        }
      />
    </Box>
  );
}

export default CarouselControl;
