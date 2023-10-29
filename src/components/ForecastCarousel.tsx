import { useState } from 'react';
import { Paper, Card, Box, Button, MobileStepper, Typography, List } from '@mui/material';
import HourForecastCard from './HourForecastCard';
import { useTheme } from '@mui/material/styles'
import BasicModal from './BasicModal';
import InfoIcon from '@mui/icons-material/Info';
import { LocalConvenienceStoreOutlined } from '@mui/icons-material';


const ForecastCarousel = ({ values, status, location }) => {
    const theme = useTheme()

    //number of cards to show
    const cardsNum = 6;
    //save state of value indexs to display in the carousel.
    const [cardIndexs, setCardIndexs] = useState(Array.from({length:cardsNum}, (_,i) =>i))

    //create card data

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
    const modalTitle = 'Carbon Intensity Forcast Information'
    const modalDescriptiveText = 'The "carbon intensity" of electricity is a measure of how many grams of carbon dioxide (CO2) emissions are produced for every kilowatt-hour of electricity consumed. This number will be higher when a significant amount of coal or gas is being used and lower when more renewables (like wind or solar) or nuclear energy are being used.'


    return (
        <Card sx={{ p: 2, width:'100%'}}>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:"space-between"}}>
                <Typography variant='h3' component={'h1'}>
                    Carbon Intensity Forecast
                </Typography>
                <BasicModal icon={<InfoIcon/>} title={modalTitle} text={modalDescriptiveText}/>
            </Box>
            <Typography variant='h6' component={'h3'}>
            Area: {location}
            </Typography>
            
            <List sx={{ display: 'flex', flexDirection:'column', gap:1, padding:2, borderRadius:0.5, border:'solid 1px black', md:{flexDirection:'row'}}}>
                {cardIndexs.map(cardIndex => cards[cardIndex])}
            </List>
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
        </Card>
    );
};

export default ForecastCarousel;