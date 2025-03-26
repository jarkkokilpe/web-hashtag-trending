export interface TrendContent {
  name: string;
  tweet_volume: number;
  link: string;
}

export interface TrendApiObj {
  woeid: number;
  totalvolume: number;
  totalvolumePrev: number;
  diff2: number;
  diff3: number;
  diff5: number;
  diff10: number;
  trends: TrendContent[];
  subscriptions: number;
}

export interface HashObj {
  hashstr: string;
  count: number;
}

export interface AreaData extends TrendApiObj {
  code: string;
  value: number;
  name: string;
  ppd: number; // posts per inhabitant per day
  hashtag: HashObj;
  position: PositionOnMap;
}

export interface SizeProps {
  width: number;
  height: number;
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