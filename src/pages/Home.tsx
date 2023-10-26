import { useDispatch, useSelector} from "react-redux";
import {fetchRegionalData, selectAllRegionalData} from '../features/regionalSlice'
import { useEffect } from "react";
import RegionalMap from "../components/RegionalMap";
const Home = () => {
    const dispatch = useDispatch()

    const regionalDataStatus = useSelector(state => state.regional.status)

    useEffect(() => {
        if (regionalDataStatus === 'idle') {
            dispatch(fetchRegionalData())
        }
    }, [regionalDataStatus, dispatch])

    const regionalData = useSelector(selectAllRegionalData)
    console.log(regionalData)

    return (
        <div>
            Homepage
            <RegionalMap/>
        </div>
    );
};

export default Home;