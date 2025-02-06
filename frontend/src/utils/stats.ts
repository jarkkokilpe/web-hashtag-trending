import { CountryFeature } from '../data/worldbounds';
import { BubbleData } from '../types/interfaces';

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
    console.log("diff total thresholdPerc diffPercent: ", diff, total, thresholdPerc, diffPerc);
  return diffPerc < thresholdPerc;
}

export function getTrendVolume(regiData: any): number {
  if (regiData.value === 0) {
    return 0;
  }

  if (regiData.ppd !== 0) {
    return (10**12 * (regiData.totalvolume / (regiData.value * regiData.ppd)));
  }

  return (10**12 * regiData.totalvolume / regiData.value)
}

export function getIxOfInterest(bubble:BubbleData | null | undefined):number {
  if (!bubble || bubble.value === 0) {
    return 0;
  } 

  return (Math.round((bubble.hash.count ?? 0) * 10 ** 3 / (bubble.value ?? 1) * 100 * 100) / 100);
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

export function getTopTenTrendingListByCountry(numTable:any):any[] {
  const topList = numTable
    .sort((a:number, b:number) => getTrendVolume(b) - getTrendVolume(a))
    .map((region:any, i:any) => {
      return region;
  });

  console.log('topList', topList)
  const retList = topList.slice(0, 59);
  console.log('retList', retList)

  return retList;
}

