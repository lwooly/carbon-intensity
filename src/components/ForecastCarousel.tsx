import { useState } from 'react';
import { Paper, Box, Button, MobileStepper, Typography } from '@mui/material';
import HourForecastCard from './HourForecastCard';




const ForecastCarousel = ({ values, status, location }) => {
    //number of cards to show
    const cardsNum = 6;
    //save state of value indexs to display in the carousel.
    const [cardIndexs, setCardIndexs] = useState(Array.from({length:cardsNum}, (_,i) =>i))

    const cards = values.map((hourData, i) => {
        return <HourForecastCard key={i} values={hourData} status={status} />
    })

    const handleClick = (event) => {
        const action = event.target.getAttribute('data-action')
        let n = 0;
        if (action === 'next') {
            n = 1
        }
        if (action === 'previous') {
            n = -1
        }
        const newCardIndexs = cardIndexs.map(cardIndex => {
            return cardIndex += n
        })
        setCardIndexs(newCardIndexs)
    }


    return (
        <Paper sx={{ p: 2, maxWidth:'100% '}}>
            <Typography variant='h3' component={'h1'}>
                Carbon Intensity Forecast
            </Typography>
            <Typography variant='h6' component={'h2'}>
                Postcode: {location.postcode}
            </Typography>
            <Typography variant='h6' component={'h3'}>
            Area: {location.area}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                {cardIndexs.map(cardIndex => cards[cardIndex])}
            </Box>
            <Box sx={{ display: 'flex' }}>
                <MobileStepper
                    variant="progress"
                    steps={cards.length - cardIndexs.length + 1}
                    position="static"
                    activeStep={cardIndexs[0]}
                    sx={{ flexGrow: 1 }}
                    backButton={<Button variant="outlined" data-action={'previous'} onClick={handleClick} disabled={cardIndexs[0] < 1}>
                        Previous
                    </Button>}
                    nextButton={<Button variant="outlined" data-action={'next'} onClick={handleClick} disabled={cardIndexs[0] > (cards.length - cardIndexs.length -1)}>
                        Next
                    </Button>}
                />
            </Box>
        </Paper>
    );
};

export default ForecastCarousel;