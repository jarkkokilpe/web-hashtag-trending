import { CountryFeature } from '../data/worldbounds';
import { AreaData } from '../types/interfaces';
import { 
  BUBBLE_AREA_MULTIPLIER_DIFF,
  BUBBLE_AREA_MULTIPLIER_RATE,
 } from '../config/constants';

// Normalized Tweet Volume = (Total Tweets / (Population * Posts/Inhabitant/Day)) * Scaling Factor
// Trend Change = (Newest Tweet Volume - Comparison Point Tweet Volume) / Comparison Point Tweet Volume * 100

export function isDiffAtNormalLevel(
  diff: number, 
  total: number, 
  thresholdPerc: number): boolean {
  if (total === 0) {  
    return true;
  }
  const diffPerc = (Math.abs(diff) / total) * 100;
  return diffPerc < thresholdPerc;
}

export function getTrendDensity(areaData: AreaData): number {
  if (areaData.value === 0) {
    return 0;
  }

  if (areaData.ppd !== 0) {
    return (BUBBLE_AREA_MULTIPLIER_RATE * (areaData.totalvolume / (areaData.value * areaData.ppd)));
  }

  return (BUBBLE_AREA_MULTIPLIER_RATE * areaData.totalvolume / areaData.value)
}

export function getTrendVolume(areaData: AreaData): number {
  return (areaData.totalvolume * 100000)
}

export function getTrendDiffPerc(data: AreaData, diffNum: number): number {
  if (data.totalvolume === 0 || data.totalvolumePrev === 0) {
    return 0;
  }

  switch (diffNum) {
    case 2:
      return (data.diff2 / data.totalvolumePrev) * 100;
    /*
    case 3:
      return (data.diff3 / data.totalvolumePrev) * 100;
    case 5:
      return (data.diff5 / data.totalvolumePrev) * 100;
    case 10:
      return (data.diff10 / data.totalvolumePrev) * 100;
    */
    default:
      return 0;
  }
}

export function getTrendDiff(data: AreaData, diffNum: number): number {
  if (data.totalvolume === 0 || data.totalvolumePrev === 0) {
    return 0;
  }
  console.log("getTrendDiff: ", data.name, data.diff2, data.totalvolumePrev, (Math.abs(data.diff2) / data.totalvolumePrev) * 100);
 
  return (BUBBLE_AREA_MULTIPLIER_DIFF * Math.abs(getTrendDiffPerc(data, diffNum)));
}


export function getTrendDiff2(area: AreaData | null | undefined):number {
  if (area) {
    return getTrendDiff(area, 2);
  }
  return 0;
};

export function getTrendDiff2Perc(area: AreaData | null | undefined):number {
  if (area) {
    return getTrendDiffPerc(area, 2);
  }
  return 0;
};

export function getIxOfInterest(area: AreaData | null | undefined):number {
  if (!area || area.value === 0 || area.hashtag === undefined) {
    return 0;
  } 

  return (Math.round((area.hashtag.count ?? 0) * 10 ** 3 / (area.value ?? 1) * 100 * 100) / 100);
};

export function getMapname(feature:CountryFeature):string {
  if (feature.properties.mapname !== undefined) {
    return feature.properties.mapname;
  } else {
    if (feature.properties.name !== undefined)
      return feature.properties.name;
    else
      return '';
  }
};
