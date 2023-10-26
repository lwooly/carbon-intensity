export const svgIntensityColors = (data) => {

    const intensityColors = {
        'very high': 'red',
        'high' : 'orange',
        'moderate': 'yellow',
        'low': 'lightgreen',
        'very low': 'darkgreen'
    }

    const regionalData = data.regions

    const regionIntensities = regionalData.map(( {shortname, intensity: {index}}) => {
        return {[shortname] : intensityColors[index] }
    })

    const regionIntensitiesObj = Object.assign({}, ...regionIntensities)

    return regionIntensitiesObj
    
}