
import RegionalMap from "../components/RegionalMap";
import { Box } from "@mui/material";
import ForecastWidget from "../components/ForecastWidget";


const Home = () => {

    return (
        <Box sx={{display:"flex"}}>
            <ForecastWidget />
            <RegionalMap />
        </Box>

    );
};

export default Home;