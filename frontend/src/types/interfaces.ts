export interface TrendContent {
  name: string;
  tweet_volume: number;
}

export interface TrendApiObj {
  woeid: number;
  totalvolume: number;
  diff2: number;
  diff3: number;
  diff5: number;
  diff10: number;
  trends: TrendContent[];
}

export interface HashObj {
  hashstr: string;
  count: number;
}

export interface CountryInfo extends TrendApiObj {
  code: string;
  value: number;
  name: string;
  ppd: number; // posts per inhabitant per day
  hashtag: HashObj;
}

export interface SizeProps {
  width: number;
  height: number;
}

export interface BubbleData {
  name: string;
  hash: HashObj;
  position: PositionOnMap;
  code: string;
  value: number;
  diff2: number;
  totalvolume: number;
}

export interface PositionOnMap {
  top: number;
  left: number;
}

export interface GeoArea {
  features: GeoRegion[];
}

export interface GeoRegion {
  id: string;
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][]; // MultiPolygon or Polygon
  };
}