export interface GenerationMix {
  fuel: string;
  perc: number;
}

export interface Intensity {
  forecast: number;
  index: string;
}

export interface Region {
  dnoregion: string;
  generationmix: GenerationMix[];
  intensity: Intensity;
  regionid: number;
  shortname: string;
}

export interface Data {
  from: string;
  to: string;
  regions: Region[];
}

export interface RegionData {
  data: Data[];
}

export interface SearchArea {
  regionId: number;
  regionName: string;
  status: string;
  error: null | string;
}

export interface UserLocation {
  postcode: string;
  status: string;
  error: null | string;
}
export interface RegionalForecastState {
  error: null | string;
  regionData: RegionData;
  searchArea: SearchArea;
  status: string;
  userLocation: UserLocation;
}
