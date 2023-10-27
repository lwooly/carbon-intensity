import { Box } from "@mui/material";
import RegionalMap from "../components/RegionalMap";
import ForecastWidget from "../components/ForecastWidget";
import ForecastCarousel from "../components/ForecastCarousel";


const Home = () => {

    return (
        <Box sx={{display:"flex"}}>
            <ForecastWidget />
            <RegionalMap />
            {/* <ForecastCarousel/> */}
        </Box>

    );
};

export default Home;