import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllRegionalData, fetchRegionalData } from '../features/slices/regionalForecastSlice';
import { lightIntensityColors, svgIntensityColors } from '../features/regionalData/regionalDataFns';
import { Box, Paper, Typography, colors } from '@mui/material';
import CircularIndeterminate from './CircularIndeterminate';
import { addSearchArea } from '../features/slices/regionalForecastSlice';

const lightenIntensityColors = (svgColors) => {
    const lightColors = {}
    for (const [key, originalColor] of Object.entries(svgColors)) {
        const lightColor = `${originalColor.slice(0, -6)}, 0.5)`
        lightColors[key] = lightColor
    }

    return lightColors
}

const RegionalMap = () => {
    const dispatch = useDispatch()
    // use regional intensity data to colour map svg
    const regionalDataState = useSelector(state => state.regionalForecast.status)

    //get regional data from redux store
    const regionalData24hr = useSelector(selectAllRegionalData)

    // console.log(selectAllRegionalData, `select all`)

    let currentRegionalData;
    if (regionalDataState === 'loaded') {
        currentRegionalData = regionalData24hr?.data[0]
    }

    //update which version of the data reaches the user based on time etc.
    const regionalData = currentRegionalData;

    //loaded error state from redux store
    const regionalErrorState = useSelector(state => state.regionalForecast.error)

    // ref svg file to get path elements
    const svgRef = useRef(null)

    //rerender on change in store data
    useEffect(() => {
        //use ref to get paths from rendered svg element to save editing svg by hand
        const svg = svgRef.current
        if (svg) {
            const paths = Array.from(svg.querySelectorAll('path'))

            if (regionalData?.regions) {
                // get colors to represent each regions intensity data
                const svgColors = svgIntensityColors(regionalData)
                const lightSvgColors = lightenIntensityColors(svgColors)
                console.log(lightSvgColors)

                //edit svg path styles
                paths.map((path) => {
                    const regionId = path.id
                    const originalFillColour = svgColors[regionId]
                    path.style.fill = originalFillColour
                    path.onclick = () => dispatch(addSearchArea(regionId))
                    path.onmouseover = () => path.style.fill = lightSvgColors[regionId]
                    path.onmouseleave = () => path.style.fill = originalFillColour
                })
            }
        }
    }, [svgRef, regionalData])


    return (
        <section className='regional-map'>
            <Paper sx={{ position: 'relative', p: 5, width: "100%" }}>
                {(regionalDataState === 'loading' &&
                    <Box sx={{ position: 'absolute', top: "50%", left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <CircularIndeterminate />
                    </Box>
                )}

                <svg ref={svgRef} width="100%" viewBox="0 0 114.01477 189.52116" version="1.1" id="svg1" xmlns="http://www.w3.org/2000/svg">
                    <g id="layer1" transform="translate(-25.64553,-62.442739)">
                        <path
                            d="m 79.554901,110.89095 c -0.02548,10e-4 -0.05102,0.003 -0.07648,0.005 -0.113443,0.0103 -0.226845,0.0233 -0.337964,0.0491 -0.103846,0.0256 -0.204352,0.0621 -0.305925,0.0951 -0.07186,0.0258 -0.122068,0.0433 -0.195336,0.0801 0.0046,-0.004 0.0682,-0.0768 -0.07442,0.0543 -0.0077,0.005 -0.02099,0.0151 -0.02687,0.0186 -0.04023,0.0285 -0.03548,0.008 -0.171566,0.0847 -0.03357,0.0189 0.155387,-0.0735 0.105937,-0.0455 -0.02567,0.0151 -0.05145,0.0302 -0.077,0.0455 -0.07188,0.0433 -0.147831,0.074 -0.225309,0.10439 -0.06224,0.019 -0.124306,0.0341 -0.186036,0.0537 -0.111392,0.0363 -0.223745,0.0648 -0.33848,0.0884 -0.159887,0.0367 -0.321704,0.0644 -0.484208,0.0868 -0.139067,0.0126 -0.278462,0.0264 -0.418063,0.0294 -0.321202,0.27366 -1.023402,0.57559 -1.718758,0.71417 -0.79296,0.15813 -1.819336,0.5525 -2.280481,0.87643 -0.461143,0.32393 -1.247126,0.67792 -1.746663,0.786 -0.499536,0.10811 -2.655043,0.68901 -4.789889,1.2914 -3.881534,1.09527 -3.881063,1.09555 -6.227527,0.19482 -2.279766,-0.87512 -6.387207,1.55641 -6.387207,3.78116 0,0.27367 -0.174605,0.49764 -0.38809,0.49764 -1.119523,0 -0.364689,3.00919 0.970484,3.86902 0.747196,0.4812 1.358573,1.14213 1.358573,1.46864 0,0.87012 1.159419,0.72634 1.191659,-0.14779 0.01504,-0.40778 0.273005,-0.01 0.573608,0.8847 0.300601,0.89459 0.987194,2.00489 1.525488,2.46703 1.089278,0.93522 1.320146,2.78032 0.396359,3.16725 -0.320227,0.13412 -0.581877,0.48503 -0.581877,0.77928 0,0.29424 -0.698939,1.9913 -1.552877,3.77135 -0.853937,1.78004 -1.55236,3.61591 -1.55236,4.07985 0,0.56107 -0.260325,0.84336 -0.776697,0.84336 -1.109124,0 -1.030012,2.14328 0.135393,3.67471 0.501242,0.65865 1.028234,1.72186 1.171504,2.36265 0.473151,2.11607 1.556243,1.48682 1.276408,-0.74156 -0.131675,-1.04856 -0.09417,-1.90634 0.0832,-1.90634 0.415266,0 3.38678,2.34533 3.722254,2.9378 0.140656,0.24841 0.682431,0.45166 1.203544,0.45166 1.002987,0 1.455669,-2.57282 0.559139,-3.17759 -0.213485,-0.14401 -0.38809,-0.54546 -0.38809,-0.89245 0,-0.40151 0.506789,-0.0937 1.39423,0.84698 1.032183,1.09414 1.662634,1.43884 2.426208,1.32756 1.584026,-0.23099 2.390035,-0.67872 2.390035,-1.32756 0,-0.40886 0.490824,-0.59015 1.597836,-0.59015 1.515581,0 1.587857,-0.0572 1.403015,-1.11259 -0.194877,-1.11269 -0.195073,-1.11255 2.322855,-0.83096 2.701275,0.30205 3.603915,-0.0731 3.603915,-1.49758 0,-0.62681 0.287914,-0.7953 1.359607,-0.7953 1.283905,0 1.386257,-0.10659 1.827278,-1.90635 0.256942,-1.04856 0.649204,-1.91178 0.871782,-1.91978 1.489758,-0.0493 2.631635,-2.15893 2.45153,-4.52943 -0.199248,-2.62246 -0.04242,-2.96668 2.594157,-5.6963 1.720953,-1.78167 1.601389,-2.70201 -0.165882,-1.27589 -1.457117,1.17576 -2.007763,1.21415 -0.645955,0.045 1.480457,-1.27106 1.337916,-2.3522 -0.356051,-2.69906 -0.758416,-0.1553 -1.48385,-0.58132 -1.612304,-0.94671 -0.727886,-2.07036 -5.547982,-2.9337 -5.547982,-0.99374 0,1.18458 -2.404224,1.72316 -3.722254,0.83406 -1.286734,-0.86798 -1.327488,-0.96024 -0.625284,-1.40612 1.524103,-0.96774 2.99709,-2.16594 3.292305,-2.67787 0.191768,-0.3327 0.734453,-0.43246 1.472778,-0.2713 2.223842,0.48546 4.265179,-2.90525 2.105298,-3.49695 -0.533711,-0.1462 -0.970483,-0.55783 -0.970483,-0.91467 0,-0.27693 -0.181129,-0.6549 -0.432015,-0.94775 z"
                            id="South Scotland" />
                        <path
                            d="m 56.434348,65.398114 c -1.015829,-0.01341 -2.600886,2.459663 -1.872237,3.119706 0.489209,0.443155 0.488201,0.588655 -0.0098,1.132231 -0.779462,0.85076 -0.719817,2.544864 0.108003,3.07113 0.522676,0.332274 0.195284,0.434934 -1.419034,0.444934 -1.96108,0.01204 -2.059964,0.06144 -1.514637,0.754476 1.049966,1.334362 1.168425,2.280869 0.315227,2.524394 -1.165236,0.33259 -0.96366,0.944285 1.065568,3.230294 1.021872,1.151188 1.464253,1.864776 0.992187,1.600936 -0.468449,-0.26182 -0.959146,-0.665343 -1.090373,-0.897103 -0.131231,-0.23176 -0.500911,-0.42168 -0.821138,-0.42168 -0.320233,0 -0.486424,0.169167 -0.369487,0.375688 0.11694,0.206524 -0.174544,0.486007 -0.648022,0.621151 -0.547186,0.156181 -0.978553,0.01604 -1.183907,-0.384473 -0.177694,-0.346567 -0.48745,-0.519633 -0.687813,-0.384473 -0.636521,0.429378 -0.395763,1.641822 0.67076,3.380672 0.787008,1.283133 0.846896,1.507593 0.250114,0.935861 -0.43156,-0.413447 -1.112243,-1.415893 -1.51257,-2.227255 -0.400325,-0.811363 -0.90587,-1.410234 -1.123445,-1.331184 -0.69188,0.25138 -0.681703,1.590375 0.0186,2.434993 0.597811,0.721009 0.60434,0.815971 0.05684,0.815971 -0.933791,0 -1.257126,0.907601 -0.5302,1.487764 0.352842,0.281606 0.641305,0.700205 0.641305,0.930176 0,0.229972 0.392992,0.642548 0.873331,0.917257 0.999332,0.571521 -0.02432,0.443129 -1.4118,-0.17725 -0.678251,-0.30326 -0.719042,-0.150078 -0.550354,2.070158 0.192881,2.538637 -0.482325,3.269327 -1.628324,1.762166 -0.265764,-0.34952 -0.708598,-0.63562 -0.983919,-0.63562 -0.661052,0 -1.079506,-2.840333 -0.760677,-5.160926 0.207483,-1.510167 0.102438,-2.051305 -0.581877,-3.00085 -1.470251,-2.040106 -2.512814,-1.192564 -2.353345,1.913062 0.09976,1.942789 -0.637777,2.120727 -1.265556,0.305407 -0.271519,-0.785138 -0.672599,-1.231017 -1.033528,-1.148767 -0.623286,0.142036 -0.6641,0.643282 -0.205672,2.53783 0.192481,0.795472 0.134073,1.164787 -0.184485,1.164787 -0.256615,0 -0.559915,-0.388993 -0.673861,-0.864547 -0.113938,-0.475555 -0.40318,-0.794007 -0.642855,-0.707967 -0.568469,0.204058 -0.809725,1.99626 -0.268717,1.99626 0.228331,0 0.414961,0.262955 0.414961,0.583944 0,1.015959 1.077645,1.717076 1.730127,1.126029 0.748384,-0.67792 1.494107,-0.132851 1.244369,0.909506 -0.332452,1.387594 1.243643,3.845411 2.321822,3.620451 0.512121,-0.106854 1.113562,0.07825 1.37666,0.424263 0.406825,0.535042 0.523686,0.530206 0.904855,-0.03876 0.26703,-0.398596 0.760265,-0.561321 1.264005,-0.417546 0.793913,0.226604 0.781449,0.276343 -0.320394,1.288294 -1.310524,1.203605 -1.495365,2.247924 -0.397908,2.247924 0.872767,0 2.356962,-1.887764 2.356962,-2.997749 0,-0.420852 0.189597,-0.892996 0.421679,-1.049549 0.232016,-0.156555 0.335825,-0.644444 0.230477,-1.084171 -0.20755,-0.866273 -0.195285,-0.87473 1.391647,-0.979786 1.250101,-0.08275 1.217958,0.749861 -0.03669,0.951364 -1.093872,0.175679 -1.078458,0.84725 0.03049,1.333768 0.50652,0.222221 0.629134,0.397162 0.291456,0.416512 -1.34392,0.07696 -1.762402,0.760209 -1.016476,1.659847 0.677106,0.816632 0.674817,0.836698 -0.07493,0.622701 -1.262916,-0.360472 -1.568889,1.479949 -0.409794,2.464966 0.918873,0.780795 0.918703,0.780896 -0.42478,0.674894 -1.625689,-0.128354 -2.021253,0.881995 -0.846977,2.163695 0.973981,1.06307 0.09793,2.1742 -1.721859,2.1854 -2.644654,0.0151 -2.698085,1.38075 -0.07493,1.91358 1.199538,0.24367 1.41672,0.38408 0.784965,0.50849 -1.101441,0.21685 -1.101441,0.59962 0,1.62781 2.352612,2.1961 2.553921,2.19046 4.884456,-0.13798 1.141107,-1.14007 2.009708,-1.28145 1.095024,-0.17828 -0.353314,0.42613 -0.642338,0.97778 -0.642338,1.22576 0,0.24799 -0.262167,0.56036 -0.582394,0.69454 -0.320227,0.13412 -0.581876,0.61994 -0.581876,1.07952 0,0.45959 -0.174607,0.95365 -0.38809,1.0976 -0.213484,0.14402 -0.388607,0.63191 -0.388607,1.08418 0,0.45226 -0.161951,0.82217 -0.360185,0.82217 -0.488651,0 -1.580265,1.22593 -1.580265,1.77457 0,0.24357 0.35646,0.34094 0.792199,0.21652 0.669946,-0.19121 0.749279,-0.0844 0.513147,0.69195 -0.153583,0.50497 -0.292174,1.33111 -0.307474,1.83606 -0.03753,1.23848 -0.476003,1.63762 -1.139466,1.03663 -0.566424,-0.51309 -2.963643,1.20569 -2.963643,2.12494 0,0.22173 -0.354691,0.92652 -0.788066,1.56631 -0.74664,1.10226 -0.754773,1.23584 -0.157096,2.54351 0.652142,1.42684 1.721342,1.26725 1.721342,-0.25683 0,-2.2454 2.069791,-5.38229 2.609143,-3.95428 0.3821,1.01168 0.421077,1.56882 0.131258,1.88516 -0.678887,0.74098 -0.46607,1.55081 0.407727,1.55081 0.804731,0 0.80363,0.0138 -0.08113,0.79581 -0.56399,0.49846 -0.936198,1.33054 -0.995288,2.22467 -0.117282,1.77476 -0.691576,4.72917 -1.038179,5.34128 -0.451696,0.79771 0.178703,1.80609 1.12913,1.80609 0.992116,0 1.9133,-1.37747 1.57148,-2.34973 -0.113858,-0.32385 -0.056,-0.69068 0.128157,-0.81493 0.184161,-0.12425 0.456606,-1.22642 0.605648,-2.44947 0.161048,-1.32158 0.595035,-2.60814 1.069702,-3.17138 0.712117,-0.84501 0.749974,-1.12584 0.347783,-2.59106 -0.909798,-3.31441 -0.200922,-5.08037 2.814815,-7.00939 1.326586,-0.84854 1.837266,-1.50243 2.263945,-2.89956 0.624912,-2.04623 1.264992,-2.29027 1.955953,-0.74518 0.740899,1.65677 3.604172,3.06526 5.711279,2.80913 2.355877,-0.28638 7.250522,-1.79621 8.925036,-2.7528 0.748513,-0.4276 1.908071,-1.09461 2.576587,-1.48208 0.202806,-0.11755 0.404126,-0.20494 0.602031,-0.2775 0.111679,-0.16339 0.346539,-0.28784 0.704866,-0.28784 h 0.504879 c 0.152786,0.007 0.304483,-0.011 0.456303,-0.0248 0.114965,-0.0193 0.229565,-0.0379 0.343131,-0.0641 0.08467,-0.0173 0.166924,-0.0364 0.248564,-0.0631 0.009,-0.007 0.09322,-0.0288 0.148311,-0.0424 l 5.17e-4,-5.2e-4 c 0.0017,-0.002 0.02721,-0.011 0.05064,-0.0196 0.02718,-0.0163 0.05435,-0.032 0.08165,-0.0481 0.002,-1.2e-4 0.0054,-0.002 0.0078,-0.002 0.0015,-0.0181 0.028,-0.0245 0.04289,-0.0357 0.08197,-0.0617 0.167816,-0.10746 0.262516,-0.14624 0.07049,-0.0378 0.147259,-0.0629 0.222209,-0.0904 0.133398,-0.0454 0.267277,-0.0891 0.403593,-0.12505 0.09716,-0.024 0.195614,-0.0409 0.294555,-0.0543 0.162852,-0.16032 0.401207,-0.34535 0.822172,-0.62477 1.168228,-0.77542 1.318399,-1.06971 1.214913,-2.38074 -0.09088,-1.1513 0.157214,-1.87568 1.07642,-3.14244 0.656966,-0.90537 1.194243,-1.92583 1.194243,-2.26756 0,-0.34172 0.436773,-1.32338 0.970483,-2.181784 0.573153,-0.921865 0.970484,-2.161892 0.970484,-3.028755 0,-0.958401 0.403862,-2.076291 1.16427,-3.222026 2.205728,-3.323462 0.07532,-10.313397 -2.453597,-8.050155 -0.256581,0.229638 -2.194528,0.3364 -4.415235,0.24288 -2.366033,-0.09963 -4.053615,0.0019 -4.195609,0.252697 -0.365741,0.645919 -1.741545,0.496733 -1.992127,-0.216007 -0.287469,-0.817661 -0.86097,-0.801094 -2.713013,0.07803 -0.826637,0.39239 -1.69794,0.675876 -1.936315,0.629936 -0.238378,-0.04595 -0.65277,0.204992 -0.920874,0.557589 -0.268102,0.352595 -0.935414,0.640788 -1.482597,0.640788 -0.547183,0 -1.408661,0.424814 -1.914612,0.943611 -1.055228,1.082019 -0.91388,-0.03918 0.180867,-1.434538 0.481977,-0.614325 0.462261,-0.765045 -0.156062,-1.194242 -0.643309,-0.446535 -0.628306,-0.473134 0.16278,-0.290938 0.662279,0.15253 1.156247,-0.193944 2.068091,-1.450558 1.198074,-1.651065 1.197834,-1.650987 -0.579293,-1.469161 -1.729039,0.176907 -2.392754,-0.26299 -1.169954,-0.775146 0.333753,-0.139792 0.520291,-0.406832 0.414445,-0.593762 -0.231135,-0.408195 1.993625,-2.8763 6.010486,-6.667294 2.956222,-2.789995 2.956056,-2.790157 3.172933,-5.400704 0.262351,-3.15793 0.135867,-3.432872 -1.420069,-3.078881 -0.668543,0.152099 -1.914369,0.372321 -2.768306,0.488859 -0.853937,0.116535 -1.943809,0.422627 -2.422075,0.680578 -0.707299,0.38148 -1.022148,0.319016 -1.685168,-0.335897 -0.733237,-0.724275 -0.860131,-0.738523 -1.265039,-0.138492 -0.247574,0.366877 -0.652394,0.592778 -0.899687,0.501778 -0.247291,-0.091 -0.558798,0.02686 -0.691947,0.261999 -0.133143,0.235137 -0.498447,0.32039 -0.811837,0.189136 -0.35529,-0.148809 -0.569474,0.01732 -0.569474,0.441834 0,1.019509 -0.703571,0.820638 -0.84646,-0.239262 -0.140007,-1.038527 -1.094507,-1.604953 -1.094507,-0.649573 0,0.340408 -0.266065,0.859432 -0.591178,1.153935 -0.489816,0.443699 -0.55189,0.424833 -0.363286,-0.111621 0.222996,-0.634276 -1.156011,-1.98592 -2.607592,-2.555917 -0.06181,-0.02427 -0.127099,-0.03631 -0.194821,-0.03721 z m -5.254235,68.068746 c -0.377509,-2.37472 -0.129187,-4.89108 0.527484,-5.34516 0.980856,-0.67823 1.783906,0.50733 2.039293,3.0107 0.121383,1.18977 0.267322,2.41124 0.324321,2.71437 0.06666,0.35458 -0.396822,0.59686 -1.299365,0.67924 -1.269853,0.11593 -1.42091,0.016 -1.591733,-1.05915 z m -11.932291,-3.41144 c 0.0093,-0.17476 0.168007,-1.17274 0.352687,-2.2177 0.335785,-1.89997 0.335785,-1.89997 -0.437432,-0.74141 -1.2769,1.91325 -2.01343,1.53999 -1.684869,-0.85383 0.301129,-2.19399 0.928408,-2.98451 1.596459,-2.0119 0.357444,0.5204 0.496621,0.45096 0.865025,-0.43157 0.584571,-1.40036 1.552159,-1.34013 1.820294,0.11337 0.118214,0.6408 0.394483,1.78357 0.613932,2.5395 0.425776,1.46667 0.226872,2.2267 -0.582748,2.2267 -0.274541,0 -0.815311,0.38129 -1.201714,0.84731 -0.708403,0.85439 -1.372868,1.11667 -1.341634,0.52958 z m 0.572844,-15.19812 c -0.708629,-0.77345 -0.597414,-1.62337 0.219975,-1.68107 1.447494,-0.10214 2.743056,-0.71857 2.235353,-1.06351 -0.428387,-0.29105 -0.432648,-0.51216 -0.02373,-1.23218 0.622772,-1.09659 0.311375,-1.69035 -0.886496,-1.69035 -1.669578,0 -1.685396,-1.55745 -0.02566,-2.52697 1.219282,-0.71223 2.433644,-0.21569 3.145121,1.28601 0.323369,0.68253 0.889128,1.24521 1.257244,1.25039 2.57059,0.0362 2.133637,4.2757 -0.459152,4.4549 -0.778409,0.0538 -2.741036,0.7319 -3.795665,1.31143 -0.903162,0.49627 -1.126073,0.48174 -1.666982,-0.10874 z m -7.705904,-4.67856 c -1.011082,-1.10358 1.44896,-2.71037 2.957708,-1.93185 0.834838,0.43078 0.823455,0.45755 -0.402361,0.94659 -0.693826,0.2768 -1.261501,0.67527 -1.261501,0.88548 0,0.44396 -0.913933,0.51444 -1.293846,0.0997 z m 4.010925,-3.03308 c 0,-0.8148 1.919039,-2.29179 2.600288,-2.00131 0.620589,0.26463 0.568366,0.41302 -0.465442,1.32249 -1.166865,1.02653 -2.134846,1.33433 -2.134846,0.67882 z M 25.64553,98.036942 c 0,-1.060278 1.930261,-2.682313 2.343424,-1.969216 0.552212,0.953086 0.442873,1.98755 -0.240325,2.273707 -1.044761,0.437587 -2.103099,0.284365 -2.103099,-0.304491 z m 14.361696,0.143631 c -0.796331,-0.554092 0.02164,-1.967601 1.021869,-1.765862 0.978044,0.197265 1.029527,0.288763 0.734107,1.304689 -0.27673,0.951665 -0.838858,1.099299 -1.755976,0.461173 z M 28.617427,93.620636 c -0.630557,-1.118382 -0.163152,-6.908226 0.593364,-7.350139 1.24053,-0.724642 2.279733,0.538919 1.357756,1.650888 -0.76462,0.922183 -0.839558,1.64202 -0.195338,1.876404 0.417682,0.151957 0.387767,0.366041 -0.282601,2.022288 -0.04715,0.116506 -0.213615,0.640787 -0.369909,1.165068 -0.284492,0.954316 -0.766862,1.232162 -1.103272,0.635491 z m 0.633954,-9.002861 c -0.111656,-0.466028 -0.434332,-0.847323 -0.71706,-0.847323 -0.282729,0 -0.626734,-0.198998 -0.764453,-0.442218 -0.381194,-0.673205 0.639747,-1.761492 1.438583,-1.533482 0.388299,0.110838 0.803816,0.02876 0.923369,-0.182377 0.352568,-0.622651 1.586946,-0.439651 2.161837,0.3205 0.415313,0.549146 0.425788,0.74367 0.04753,0.882628 -0.266855,0.09803 -0.485192,0.505517 -0.485192,0.905522 0,1.678239 -2.233163,2.447101 -2.604612,0.89675 z m 3.78273,-5.479741 c -0.625902,-1.276491 -0.482217,-1.722497 0.554918,-1.722497 0.537028,0 1.127003,-0.347269 1.344881,-0.791617 0.446465,-0.91054 0.195517,-1.326687 -0.800029,-1.326687 -0.872063,0 -1.626341,-1.389007 -1.078809,-1.986627 0.256481,-0.279943 0.185104,-0.604164 -0.212244,-0.9641 -0.848362,-0.768484 -0.74812,-1.330585 0.435206,-2.4404 0.928356,-0.870683 1.099862,-0.904493 1.680218,-0.331233 0.355481,0.351135 0.938247,0.638425 1.295036,0.638425 0.694409,0 0.893539,-1.055817 0.277504,-1.471378 -0.854253,-0.576252 0.755736,-2.902728 1.727196,-2.495843 0.277327,0.116153 0.756089,-0.181281 1.063916,-0.660969 0.731823,-1.140401 3.645987,-3.437939 3.945702,-3.110806 0.646126,0.705231 0.203177,4.542458 -0.640342,5.547218 -0.873346,1.04029 -0.873346,1.04029 0.232066,0.750234 1.277816,-0.335293 1.292469,0.514318 0.02121,1.229716 -1.538916,0.866019 -2.406982,2.164278 -1.99039,2.976784 0.292693,0.570856 0.231157,0.887741 -0.246402,1.268885 -0.350087,0.279406 -0.636522,0.813921 -0.636522,1.187808 0,0.776975 -1.378333,1.724503 -1.948792,1.339687 -0.209072,-0.141036 -0.380132,-0.817116 -0.380132,-1.502405 0,-0.685289 -0.197524,-1.245981 -0.438941,-1.245981 -0.28487,0 -0.361557,0.520478 -0.21848,1.482814 0.12125,0.815548 0.07713,1.482814 -0.09802,1.482814 -0.175163,0 -0.409833,0.381295 -0.521488,0.847324 -0.11707,0.488622 -0.529449,0.84732 -0.974128,0.84732 -0.424116,0 -0.87166,0.285972 -0.994542,0.635491 -0.307943,0.875897 -0.91827,0.795611 -1.398592,-0.183977 z"
                            id="North Scotland" />
                        <path
                            d="m 97.065857,165.56814 c 0,-0.76052 -2.55037,-1.80989 -4.94896,-2.03633 -1.334284,-0.12602 -2.425966,-0.41241 -2.425966,-0.63655 0,-0.22412 -0.516968,-0.93459 -1.148816,-1.57881 -1.148816,-1.17133 -1.148816,-1.17133 -0.222115,-2.12157 0.509685,-0.52262 0.830767,-1.22308 0.713517,-1.5566 -0.117245,-0.33348 0.07649,-1.43424 0.430537,-2.44611 0.617466,-1.76471 0.611515,-1.8993 -0.145912,-3.30049 -0.434298,-0.80342 -0.901338,-2.62726 -1.037869,-4.05302 -0.241677,-2.52375 -0.280168,-2.59565 -1.456598,-2.72069 -1.029949,-0.10953 -1.223496,-0.31608 -1.310858,-1.39942 -0.279708,-3.46849 -0.505693,-4.07873 -1.675263,-4.52374 -2.111684,-0.80347 -2.108995,-1.73111 0.01042,-3.57486 2.207211,-1.92016 2.524186,-3.00238 1.511164,-5.15947 -0.73735,-1.57006 -0.73735,-1.57006 0.147595,-2.31652 0.486721,-0.41056 1.538616,-1.32567 2.337544,-2.03359 1.4526,-1.28711 1.4526,-1.28711 2.073042,0.11097 0.341243,0.76894 1.303264,1.92056 2.137824,2.55913 0.834568,0.63857 1.517389,1.45141 1.517389,1.8063 0,0.3549 0.15924,0.97631 0.353881,1.38093 0.19464,0.4046 0.56027,1.87953 0.812521,3.27763 0.252252,1.39807 0.687668,3.01857 0.967594,3.60112 0.279927,0.58253 0.62792,2.01238 0.773308,3.17744 0.295865,2.37088 1.549181,5.71944 2.14068,5.71944 0.212392,0 0.386164,0.2747 0.386164,0.61048 0,0.83195 0.508016,1.11251 2.60814,1.44039 1.45967,0.2279 1.91228,0.51601 2.43577,1.55056 0.35364,0.69886 1.01282,1.33015 1.46485,1.40286 0.53484,0.086 0.97027,0.623 1.24679,1.53751 0.23371,0.77291 0.76768,1.74387 1.18661,2.15767 0.41894,0.41381 0.7617,1.01873 0.7617,1.34426 0,0.32551 0.524,0.79123 1.16446,1.03492 2.02912,0.77207 0.75777,2.47848 -1.84657,2.47848 -0.92566,0 -1.8452,0.27707 -2.19818,0.66233 -0.41249,0.45023 -1.44684,0.68765 -3.22999,0.74141 -2.51618,0.0759 -2.619044,0.12026 -2.52156,1.08878 0.0559,0.55535 -0.09652,1.27028 -0.338645,1.58874 -0.492016,0.64708 -2.67414,0.79916 -2.67414,0.1864 z"
                            id="North East England" />
                        <path
                            d="m 114.66093,179.18236 c -0.67671,-0.39801 -1.6064,-1.24792 -2.06597,-1.88872 -1.02147,-1.42421 -1.22675,-1.43492 -2.60135,-0.13563 -1.08906,1.02936 -1.08906,1.02936 -2.05944,0.0674 -3.27609,-3.24752 -4.74309,-2.9792 -6.17423,1.12933 -0.57493,1.65048 -5.849897,1.83913 -5.870744,0.20993 -0.02418,-1.88823 -1.628754,-2.5913 -4.114152,-1.80267 -2.464646,0.78203 -2.814082,0.64352 -2.091981,-0.82916 0.470117,-0.95877 0.410131,-1.14451 -0.752432,-2.32987 -0.908765,-0.92655 -1.182972,-1.49596 -0.977126,-2.02907 0.645725,-1.67223 0.664813,-5.11293 0.036,-6.48872 -1.006896,-2.20299 -0.640942,-3.56761 0.446884,-1.66638 0.35493,0.62031 0.905187,0.84733 2.053928,0.84733 1.279907,0 1.797972,0.26436 2.810825,1.43437 1.819964,2.10238 6.927838,2.13644 7.256558,0.0483 0.19006,-1.20735 0.31657,-1.2846 2.52678,-1.54291 1.27968,-0.14956 3.53501,-0.67063 5.01185,-1.15795 3.43315,-1.13285 5.04655,-0.12315 4.65385,2.91267 -0.17459,1.34973 -0.051,1.58986 1.37763,2.67538 1.58174,1.20187 1.82888,1.9445 1.3271,3.98767 -0.23175,0.94361 -0.23175,0.94361 -1.87254,-0.10601 -0.90243,-0.57722 -1.96157,-1.04952 -2.35362,-1.04952 -1.17688,0 0.79763,1.9977 3.39422,3.43408 2.3119,1.27889 2.95912,2.38191 2.44171,4.16124 -0.30617,1.05292 -0.77595,1.07613 -2.40374,0.11882 z"
                            id="Yorkshire" />
                        <path
                            d="m 83.348258,182.58941 c -0.297163,-0.6408 -0.741726,-1.84646 -0.987918,-2.67928 -0.317072,-1.07257 -0.841637,-1.71928 -1.798594,-2.21735 -0.743035,-0.38675 -1.350971,-0.95901 -1.350971,-1.27168 0,-0.31266 -0.436675,-1.01625 -0.970387,-1.56351 -0.533711,-0.54726 -0.970384,-1.22583 -0.970384,-1.50793 0,-0.28211 0.436673,-0.82521 0.970384,-1.2069 1.085205,-0.77611 1.272527,-1.84548 0.388155,-2.2159 -0.937793,-0.39278 -0.772266,-3.40166 0.218989,-3.98071 0.63721,-0.37222 0.750081,-0.72215 0.551391,-1.70954 -0.155866,-0.77458 -0.09225,-1.24152 0.169164,-1.24152 0.230448,0 0.418995,-0.66727 0.418995,-1.48283 0,-1.43883 -0.471556,-1.94011 -0.980144,-1.04191 -0.137315,0.24249 -0.584289,0.32497 -0.993292,0.18327 -0.516844,-0.17904 -0.743642,-0.0551 -0.743642,0.40643 0,0.36523 -0.262004,0.66406 -0.58223,0.66406 -0.320228,0 -0.582232,0.28596 -0.582232,0.63548 0,0.34952 -0.14556,0.6355 -0.323461,0.6355 -0.675885,0 -0.747963,-0.5223 -0.223379,-1.61868 0.514327,-1.07496 0.493283,-1.14207 -0.397003,-1.2662 -1.374485,-0.19161 -2.041202,-1.20977 -1.458765,-2.22772 0.635781,-1.11118 0.578782,-2.37368 -0.120386,-2.66651 -0.320227,-0.13419 -0.58223,-0.61988 -0.58223,-1.07947 0,-0.4596 -0.17467,-0.95346 -0.388155,-1.09746 -0.677759,-0.4572 -0.421092,-2.4539 0.625507,-4.86601 0.557514,-1.28493 1.134636,-2.6222 1.282492,-2.97171 0.147857,-0.34954 0.993279,-1.00776 1.878717,-1.46274 0.954626,-0.49051 1.883092,-1.38095 2.281121,-2.18765 1.755029,-3.55701 6.289478,-1.30966 5.833642,2.89125 -0.219899,2.02655 -0.219899,2.02655 1.346793,2.29999 1.566692,0.27345 1.566692,0.27345 1.45323,2.64967 -0.06241,1.30691 0.07366,2.75751 0.302381,3.22353 1.053496,2.14661 0.961821,4.26136 -0.25732,5.93578 -1.370855,1.88279 -1.404386,2.44544 -0.392768,6.59088 0.765775,3.13802 0.765775,3.1508 0,3.73005 -1.040315,0.78694 -1.002183,3.00487 0.07742,4.50292 2.039381,2.82981 1.439979,8.36791 -1.045712,9.66168 -1.825967,0.95039 -2.016111,0.91828 -2.649394,-0.44728 z"
                            id="North West England" />
                        <path
                            d="m 64.324289,195.76973 c 0.143183,-0.43371 0.118757,-0.64855 -0.05425,-0.47742 -0.815126,0.80627 -1.26107,-1.10683 -0.553873,-2.3761 0.694424,-1.24634 0.692562,-1.28447 -0.09194,-1.88422 -0.630872,-0.48231 -0.755726,-0.91469 -0.588637,-2.03852 0.314573,-2.11583 -1.439939,-2.03192 -3.395162,0.16234 -0.955751,1.07262 -1.50789,1.42658 -1.699586,1.0896 -0.156167,-0.27451 -0.611928,-0.46516 -1.012804,-0.42366 -0.957959,0.0992 -1.265023,-0.90199 -0.389157,-1.26884 1.334534,-0.55895 4.040507,-3.52363 4.040507,-4.42679 0,-0.38774 0.250578,-0.80994 0.55684,-0.93821 0.306263,-0.12827 0.766642,-0.67296 1.023064,-1.2104 0.466225,-0.97716 0.466225,-0.97716 -0.53709,0.0297 -0.991689,0.99518 -1.301452,0.98947 -2.758827,-0.051 -2.108966,-1.50551 -2.714854,-2.43875 -1.583295,-2.43875 0.354678,0 0.582231,-0.39464 0.582231,-1.00974 0,-1.7997 3.28337,-2.19031 3.885321,-0.46222 0.204997,0.58851 0.642552,1.18301 0.972345,1.32115 0.379094,0.15885 0.514657,0.54333 0.368597,1.04562 -0.304198,1.04613 0.81917,0.61417 1.990547,-0.76539 0.905291,-1.06616 1.705073,-1.23713 2.373673,-0.50736 0.31463,0.34341 0.788871,0.34013 1.76701,-0.0128 1.212814,-0.43689 2.595662,-0.74379 4.750896,-1.05438 0.527662,-0.0761 0.781708,-0.43934 0.793168,-1.13424 0.02136,-1.29488 1.961499,-1.29839 2.88345,-0.005 0.326192,0.45752 1.117083,0.89246 1.757536,0.96651 1.005984,0.11626 1.333374,0.50942 2.405572,2.88844 1.59264,3.53378 1.613302,3.35002 -0.64891,5.77123 -1.061941,1.13659 -1.935287,2.28002 -1.940771,2.54102 -0.0054,0.26098 -0.804213,0.71723 -1.774956,1.01388 -2.73205,0.8349 -4.581166,3.11672 -4.150396,5.12161 0.03015,0.14027 -1.726941,0.36572 -3.904635,0.50095 -2.177695,0.1353 -4.267098,0.37528 -4.643117,0.53348 -0.544581,0.2291 -0.630709,0.12714 -0.423348,-0.50095 z"
                            id="North Wales & Merseyside" />
                        <path
                            d="m 97.182236,202.46311 c -4.529742,-1.72957 -5.424631,-2.96339 -5.196229,-7.16421 0.05848,-1.07523 -0.0714,-1.80056 -0.322277,-1.80056 -0.231103,0 -0.420183,-0.70776 -0.420183,-1.57281 0,-1.20338 -0.247629,-1.78833 -1.054243,-2.49034 -0.955147,-0.83127 -1.009875,-1.0238 -0.582232,-2.04825 0.627092,-1.50219 0.595148,-2.66377 -0.137827,-5.01169 -0.765209,-2.45122 -0.33758,-3.49569 1.681827,-4.1078 2.18196,-0.66141 2.56313,-0.54918 3.1977,0.94151 1.003889,2.35824 7.894368,2.68348 8.002228,0.3777 0.10226,-2.18471 2.11075,-3.59501 3.31964,-2.33086 0.79832,0.83478 1.02203,1.39005 0.85417,2.12002 -0.33954,1.47663 1.75675,1.54582 3.18106,0.10501 1.03183,-1.04379 1.36388,-1.02278 3.62808,0.22954 1.03432,0.57207 1.98919,0.9216 2.12194,0.77671 0.66867,-0.72984 0.0999,0.91727 -0.95856,2.77563 -1.43363,2.5172 -1.36315,3.49393 0.28577,3.96029 2.39569,0.67757 1.88013,2.01624 -1.02663,2.66571 -1.82616,0.40801 -3.12846,1.35594 -2.87059,2.08943 0.11532,0.32803 -0.10821,1.23324 -0.49673,2.01157 -0.38853,0.7783 -0.88292,2.35484 -1.09865,3.50339 -0.39098,2.08161 -0.39962,2.09091 -2.71801,2.92341 -1.27918,0.45935 -3.02447,1.17457 -3.87841,1.58939 -2.47609,1.20285 -3.365733,1.27665 -5.511844,0.45722 z"
                            id="East Midlands" />
                        <path
                            d="m 115.13479,214.57574 c -0.0824,-0.29127 -0.23696,-1.35558 -0.34334,-2.36512 -0.25479,-2.41831 -0.26904,-2.42665 -3.09803,-1.8129 -4.39863,0.95429 -5.28031,-0.0644 -3.94354,-4.5559 0.29824,-1.0021 0.29824,-1.0021 -2.7299,-0.84731 -1.94721,0.0996 -3.07984,-0.01 -3.17299,-0.30422 -0.15455,-0.48969 2.31292,-1.44749 3.72901,-1.44749 2.13218,0 5.84038,-5.39826 5.85686,-8.52619 0.0123,-2.3403 0.3838,-2.78409 3.54943,-4.24047 3.25059,-1.49546 4.98464,-2.94957 4.98464,-4.17994 0,-1.54197 2.69557,-2.93454 4.85194,-2.50654 1.06742,0.21186 2.75773,0.49084 3.75628,0.61997 2.39942,0.31028 5.46294,2.93968 6.05505,5.19703 0.84802,3.233 0.93019,5.01433 0.30646,6.64371 -0.33442,0.87357 -0.60803,2.11988 -0.60803,2.76955 0,1.75894 -1.86623,4.64656 -3.00301,4.64656 -0.50838,0 -0.82384,0.17745 -0.70102,0.39438 0.12279,0.2169 0.0388,0.51892 -0.18696,0.67114 -0.22566,0.15227 -0.30744,0.63039 -0.18176,1.06263 0.26061,0.89621 -0.77012,1.68337 -2.20923,1.68714 -1.50273,0.003 -3.8455,0.86323 -3.58892,1.31634 0.13247,0.23407 0.7241,0.30974 1.3146,0.16817 0.99554,-0.23864 1.09061,-0.14315 1.30703,1.31237 0.30394,2.04435 0.12601,2.28471 -1.69121,2.28471 -1.29601,0 -1.60838,0.1871 -2.12191,1.27097 -0.66787,1.40966 -7.75919,2.05624 -8.13145,0.74141 z"
                            id="East England" />
                        <path
                            d="m 84.880681,214.47984 c -0.376359,-0.62693 -1.2992,-1.42032 -2.05076,-1.76306 -0.75156,-0.34275 -1.749207,-1.07394 -2.216992,-1.62486 -1.286922,-1.51563 -4.964752,-4.03611 -5.889421,-4.03611 -1.297773,0 -1.307186,-0.26777 -0.138489,-3.93988 1.347414,-4.23364 1.335877,-3.96207 0.181745,-4.27824 -0.907781,-0.24867 -0.927082,-0.32152 -0.428279,-1.61635 0.357503,-0.92802 0.409395,-1.68019 0.164431,-2.38343 -0.715315,-2.05353 0.922037,-3.88121 3.477028,-3.88121 0.896985,0 1.238346,-0.26798 1.618983,-1.27098 0.265284,-0.69905 0.614752,-1.27099 0.776594,-1.27099 0.161842,0 1.033227,-0.78275 1.936409,-1.73943 1.56477,-1.65748 5.650792,-4.10103 6.077953,-3.6348 0.581418,0.6346 0.569118,3.53563 -0.01724,4.06679 -0.978138,0.88603 -0.728162,1.86143 0.743778,2.90215 1.356653,0.95922 1.356653,0.95922 0.771504,2.4878 -0.712633,1.86158 -0.712283,1.84874 -0.05045,1.84874 1.352274,0 1.53035,1.22499 0.410939,2.82687 -1.285271,1.83922 0.326482,3.82321 4.41489,5.43452 3.277283,1.29163 1.888459,3.56259 -2.196611,3.59182 -1.400844,0.01 -3.267987,1.75076 -3.782118,3.52607 -0.148396,0.51241 -0.681352,1.52161 -1.184346,2.24265 -0.502993,0.72104 -0.914535,1.49483 -0.914535,1.71959 0,1.44403 -1.027237,1.92141 -1.705019,0.79234 z"
                            id="West Midlands" />
                        <path
                            d="m 108.02976,216.92448 c -0.77331,-0.16248 -0.8587,-0.39457 -0.73612,-2.00066 0.18256,-2.39189 0.37079,-2.65415 2.09367,-2.91703 0.8019,-0.12233 1.93835,-0.35536 2.52543,-0.51781 1.01515,-0.28087 1.06743,-0.22151 1.06743,1.21187 0,0.82895 0.17467,1.62503 0.38815,1.76903 1.99563,1.34619 -1.95932,3.16464 -5.33856,2.4546 z"
                            id="London" />
                        <path
                            d="m 69.214624,218.25562 c -1.120143,-0.60925 -2.036622,-1.34022 -2.036622,-1.62436 0,-1.20386 -1.130263,-2.22469 -1.572189,-1.41998 -0.258886,0.47142 -0.883295,0.74141 -1.714661,0.74141 -1.582763,0 -2.604121,-0.38331 -2.326723,-0.8732 0.112361,-0.19843 0.478404,-0.24596 0.813447,-0.10564 0.443733,0.18584 0.571222,0.037 0.469443,-0.54809 -0.08729,-0.50179 -0.524236,-0.85197 -1.164303,-0.9331 -0.650201,-0.0824 -1.101476,-0.45086 -1.235027,-1.00827 -0.144709,-0.60399 -0.40948,-0.79502 -0.84758,-0.61151 -0.350423,0.14682 -0.976508,0.26684 -1.391301,0.26684 -0.443159,0 -0.90325,0.42799 -1.115675,1.03783 -0.451183,1.29524 -3.061597,2.21419 -4.275505,1.5051 -0.886758,-0.518 -1.001509,-1.08656 -0.292738,-1.45041 0.266856,-0.13706 6.83e-4,-0.17845 -0.591496,-0.0921 -1.253858,0.18279 -1.845503,-0.51104 -0.918576,-1.07723 0.350199,-0.2139 0.636727,-0.76075 0.636727,-1.21519 0,-0.78709 -0.379035,-1.01048 -1.455578,-0.8579 -0.893931,0.12666 -0.497315,-0.75998 0.679269,-1.51858 0.640454,-0.41294 1.164462,-0.90033 1.164462,-1.08311 0,-0.18277 0.413118,-0.33232 0.918039,-0.33232 0.50492,0 1.3346,-0.3398 1.843731,-0.75513 0.50913,-0.41533 1.537035,-1.05692 2.28423,-1.42577 4.796787,-2.36791 5.487698,-2.9899 6.287027,-5.65991 0.492105,-1.64377 0.566694,-1.69935 2.640885,-1.9674 3.633191,-0.46953 8.167573,-0.37663 6.867556,0.14075 -1.495738,0.59521 -1.298615,2.09571 0.351819,2.678 1.312392,0.46306 1.305589,0.65269 -0.140895,3.92819 -0.79569,1.80181 -0.292905,4.47059 0.878312,4.66204 1.967361,0.32162 2.487289,0.57469 2.702693,1.31545 0.127295,0.43773 0.706606,0.90379 1.287371,1.03567 2.383984,0.54134 2.813322,4.52139 0.487735,4.52139 -0.353079,0 -0.981017,0.27991 -1.395419,0.62201 -0.414401,0.3421 -1.04456,0.62808 -1.400352,0.6355 -0.355791,0.008 -0.967134,0.47215 -1.358539,1.03276 -1.110688,1.59089 -2.705046,1.72783 -5.079561,0.43631 z"
                            id="South Wales" />
                        <path
                            d="m 107.96223,231.26173 c -0.26872,-0.54804 -0.82061,-0.90456 -1.40026,-0.90456 -1.15496,0 -1.15646,0.22486 0.0153,-2.29602 1.20939,-2.60191 1.26529,-4.72014 0.15056,-5.70536 -0.81818,-0.72314 -0.81818,-0.72314 0.19408,-2.35126 0.55675,-0.89546 1.01227,-1.78222 1.01227,-1.97062 0,-0.18837 0.54002,-0.13706 1.20006,0.11417 1.28303,0.48817 3.53646,-0.0551 5.32106,-1.2828 1.55517,-1.0699 8.33939,-0.39539 9.83453,0.97776 1.35583,1.24523 3.21882,1.40925 4.53939,0.39969 0.54765,-0.41867 1.24784,-0.57591 1.84102,-0.41341 0.52649,0.14427 1.32884,0.0451 1.783,-0.22011 0.7807,-0.45604 0.81202,-0.40749 0.57427,0.89003 -0.13835,0.7548 -0.25148,1.92469 -0.25148,2.59972 0,1.00039 -0.33651,1.4603 -1.81979,2.48701 -1.02543,0.7098 -2.03386,1.81535 -2.31019,2.53264 -0.41287,1.07176 -0.70595,1.27297 -1.85417,1.27297 -0.95476,0 -1.75247,0.37254 -2.65988,1.24214 -0.71288,0.68315 -1.81063,1.36524 -2.43947,1.51576 -0.62884,0.15052 -1.52054,0.47246 -1.98155,0.71542 -0.61474,0.324 -1.61783,0.25245 -3.76248,-0.26834 -3.04801,-0.74014 -6.53045,-0.21794 -7.27124,1.09034 -0.17715,0.31284 -0.4256,0.16513 -0.71501,-0.42512 z"
                            id="South East England" />
                        <path
                            d="m 84.366914,236.48705 c -0.42472,-0.97211 -1.000221,-1.57584 -1.643375,-1.72396 -0.544371,-0.12537 -1.339103,-0.37822 -1.766072,-0.5619 -0.426969,-0.18367 -1.125647,-0.18389 -1.552617,-4.6e-4 -1.2843,0.55174 -2.522999,0.4445 -2.522999,-0.21841 0,-0.86452 1.532754,-1.93051 2.775807,-1.93051 1.307621,0 3.59579,-2.28253 3.974295,-3.96451 0.233931,-1.03953 0.42027,-1.17988 1.317854,-0.9926 1.800466,0.37567 4.944185,-2.86358 3.993084,-4.11441 -0.312627,-0.41116 -0.295599,-0.67841 0.06398,-1.00425 1.161214,-1.05224 0.591138,-3.63927 -0.987401,-4.48088 -1.394749,-0.74361 -1.441586,-0.83083 -0.837441,-1.55947 0.835832,-1.00807 3.245008,-5.89629 3.823938,-7.75876 0.146161,-0.47023 0.472612,-0.68967 0.813565,-0.54685 0.313198,0.13114 1.194235,-0.0464 1.957868,-0.39469 1.756705,-0.80115 7.20347,-1.28565 8.12502,-0.72274 0.44517,0.27192 1.29574,0.27793 2.41639,0.017 2.07768,-0.48366 2.31071,-0.30282 1.69624,1.31636 -0.39329,1.03635 -0.36214,1.47077 0.18887,2.63376 0.96837,2.04394 0.60434,6.50167 -0.76644,9.38551 -1.08552,2.28368 -0.8335,3.2896 0.82417,3.2896 0.59883,0 0.67624,0.68386 0.1199,1.05916 -0.21349,0.14396 -0.38816,0.87746 -0.38816,1.62989 0,2.43177 -1.55345,5.1711 -2.8474,5.02105 -0.60538,-0.0701 -1.34546,0.0942 -1.64461,0.36505 -0.30588,0.27707 -0.97836,0.37368 -1.536629,0.22075 -0.580648,-0.159 -1.4286,-0.0208 -2.042844,0.33295 -0.577573,0.33267 -1.836153,0.8373 -2.796836,1.12137 -0.960673,0.28407 -2.247093,0.68263 -2.858699,0.88567 -0.611607,0.20303 -1.310279,0.23952 -1.552612,0.0811 -0.242333,-0.15852 -0.197379,0.0391 0.0999,0.43898 0.795887,1.07058 0.267553,1.34207 -2.611734,1.34207 -2.586617,0 -2.586617,0 -2.461802,1.16506 0.175261,1.63592 -0.594993,1.45029 -1.373217,-0.33095 z m 12.504865,-1.54774 c -1.655001,-0.9676 1.085048,-3.27697 3.10523,-2.61716 2.016691,0.65867 2.624191,2.08954 1.147341,2.70239 -1.977124,0.82048 -2.72922,0.80539 -4.252571,-0.0852 z"
                            id="South England" />
                        <path
                            d="m 51.025489,247.83192 c -0.613424,-1.0721 -2.463898,-2.08193 -2.795236,-1.52538 -0.433078,0.72743 -1.94729,1.45511 -2.178437,1.04689 -0.628436,-1.10985 0.631107,-2.92888 2.402966,-3.47035 1.913135,-0.58464 3.97337,-2.38103 3.97337,-3.46449 0,-0.35762 0.262004,-0.75996 0.58223,-0.89408 0.320226,-0.13418 0.582232,-0.72647 0.582232,-1.31632 0,-1.02391 0.333671,-1.26823 1.494529,-1.0943 0.28828,0.0432 0.408973,-0.1249 0.268208,-0.37348 -0.140763,-0.24858 0.01638,-0.45198 0.349202,-0.45198 0.332825,0 0.605137,-0.19191 0.605137,-0.42647 0,-0.23455 0.453738,-0.85415 1.008303,-1.37689 1.355179,-1.27741 2.492907,-3.79191 2.223844,-4.91491 -0.325352,-1.35797 0.550672,-2.26961 1.875705,-1.95195 0.615606,0.14763 1.102613,0.0842 1.102613,-0.14363 0,-0.22436 0.349339,-0.50762 0.776307,-0.62949 0.787726,-0.22485 1.099875,-1.14824 0.388155,-1.14824 -0.213485,0 -0.388155,-0.26261 -0.388155,-0.58362 0,-1.68383 2.938606,-2.41919 7.180848,-1.79694 5.386291,0.79007 6.792694,0.57283 6.792694,-1.04924 0,-4.41103 6.331186,-9.15168 7.006016,-5.24595 0.219002,1.26755 0.385907,1.35279 1.621104,0.82798 0.861585,-0.36606 2.475324,2.46881 2.289112,4.02131 -0.334452,2.78841 -1.892142,4.39452 -4.043199,4.16887 -1.109629,-0.11641 -1.25835,-0.002 -1.369565,1.05648 -0.08271,0.78697 -0.435634,1.31607 -1.047124,1.56983 -0.507298,0.2105 -1.223206,0.88391 -1.59091,1.49643 -0.664439,1.10683 -1.269867,1.19354 -2.94784,0.42223 -0.539945,-0.24819 -0.744316,0.0398 -1.089337,1.53541 -0.509694,2.20936 -2.972432,3.88589 -3.618723,2.46351 -0.108517,-0.23884 -0.152201,-0.19122 -0.09706,0.10585 0.05513,0.29705 -0.232735,1.36171 -0.639716,2.36593 -0.570915,1.40871 -0.637171,1.96102 -0.29002,2.41757 0.497707,0.65457 0.213225,1.40073 -0.854632,2.24162 -0.386665,0.30447 -0.703027,0.91416 -0.703027,1.35485 0,0.96296 -2.105784,0.39645 -2.479699,-0.66708 -0.117157,-0.33324 -0.648365,-0.60589 -1.180461,-0.60589 -0.532095,0 -1.347452,-0.42896 -1.811901,-0.95323 -0.844454,-0.95325 -0.844454,-0.95325 -0.63369,0 0.246915,1.11673 -0.01247,1.18849 -1.150635,0.31831 -0.635964,-0.4862 -0.86843,-0.51101 -0.992413,-0.10585 -0.108663,0.35505 -0.871793,0.49654 -2.320661,0.43025 -2.008482,-0.0919 -2.175593,-0.0254 -2.400659,0.95323 -0.133046,0.57861 -0.462022,1.052 -0.731053,1.052 -0.269031,0 -0.736149,0.37405 -1.03804,0.83122 -0.379385,0.57451 -0.69088,0.70259 -1.008664,0.41474 -0.497164,-0.45037 -1.077333,0.88817 -0.963315,2.22251 0.03358,0.39307 -0.285899,0.91736 -0.70997,1.16507 -0.98478,0.57526 -0.947781,0.58272 -1.44843,-0.29228 z"
                            id="South West England" />
                    </g>
                </svg>
            </Paper>
            {(regionalErrorState && <Typography>API error: {regionalErrorState}</Typography>)}
        </section>
    );
};

export default RegionalMap;