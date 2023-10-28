import { Box, Grid} from "@mui/material";
import RegionalMap from "../components/RegionalMap";
import ForecastWidget from "../components/ForecastWidget";
import ForecastCarousel from "../components/ForecastCarousel";
import HomeTitle from "../components/HomeTitle";

const Home = () => {

    return (
        <>
            {/* <Grid container spacing={2}>
                <Grid item md={8}> */}
                    <HomeTitle/>
                    <ForecastWidget/>
                {/* </Grid>
                <Grid item md={4}> */}
                <RegionalMap />
                {/* </Grid> */}
            {/* // </Grid> */}
        </>

    );
};

export default Home;