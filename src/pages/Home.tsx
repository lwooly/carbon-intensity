import { Box, Grid} from "@mui/material";
import RegionalMap from "../components/RegionalMap";
import ForecastWidget from "../components/ForecastWidget";
import ForecastCarousel from "../components/ForecastCarousel";
import HomeTitle from "../components/HomeTitle";
import { useSelector } from "react-redux";
import { selectAllStyles } from "../features/slices/stylesSlice";

const Home = () => {
    const {padding, margin} = useSelector(selectAllStyles)

    return (
        <>
            <Grid container spacing={2} sx={{p:1, maxWidth:'100%', overflow:'hidden'}}>
                <Grid item md={8}>
                    <Box sx={{mb:{xs: 1, md:0}}}>
                        <HomeTitle/>
                    </Box>
                    <ForecastWidget/>
                </Grid>
                <Grid item md={4}> 
                <RegionalMap />
                </Grid>
            </Grid>
        </>

    );
};

export default Home;