export const intensityColors = {
    'very high': '#B71C1C',  // Deep red
    'high': '#EF6C00',      // Deep orange
    'moderate': '#FFEB3B',  // Bright yellow
    'low': '#81C784',       // Match with the light green from the theme but a bit darker
    'very low': '#207867'   // Using the dark green from your theme
}


export const svgIntensityColors = (data) => {

    const regionalData = data.regions

    const regionIntensities = regionalData.map(( {shortname, intensity: {index}}) => {
        return {[shortname] : intensityColors[index] }
    })

    const regionIntensitiesObj = Object.assign({}, ...regionIntensities)

    return regionIntensitiesObj
    
}