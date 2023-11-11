export interface GenerationMix {
    fuel: string,
    perc: number
}

export interface Intensity {
    forecast: number,
    index: string
}

export interface Regions {
    dnoregion: string,
    generationmix: GenerationMix[],
    intensity: Intensity,
    regionid: number,
    shortname: string,
}

export interface RegionData {
    data: {
        from: string,
        regions: Regions[],
        to: string
    }
}


export interface SearchArea {
    regionId: number, 
    regionName: string,
    status: string,
    error: null | string
}
export interface ForecastInterface {
    error: null | string,
    regionData: RegionData
    searchArea: SearchArea
}