import { useState } from 'react';
import { Paper, Box, Button } from '@mui/material';
import HourForecastCard from './HourForecastCard';




const ForecastCarousel = ({ values, status }) => {

    //save state of value indexs to display in the carousel.
    const [cardIndexs, setCardIndexs] = useState([0, 1, 2, 3])

    const cards = values.map((hourData, i) => {
        return <HourForecastCard key={i} values={hourData} status={status} />
    })


    const handleClick = (event) => {
        const action = event.target.getAttribute('data-action')
        console.log(action)
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
        <Paper sx={{ p: 2, flex:1 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
                {cardIndexs.map(cardIndex => cards[cardIndex])}

            </Box>
            <Box sx={{ display: 'flex' }}>
                {cardIndexs[0] > 1 &&<Button variant="outlined" data-action={'previous'} onClick={handleClick}>
                    Previous
                </Button>}
                <Box sx={{ flex:1, justifySelf:'center' }}>{/*this is a spacer*/}

                </Box>
                {cardIndexs[3]< cards.length -1 && <Button variant="outlined" data-action={'next'} onClick={handleClick}>
                    Next
                </Button>}
            </Box>
        </Paper>
    );
};

export default ForecastCarousel;