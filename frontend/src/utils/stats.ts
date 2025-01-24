import { CountryFeature } from '../data/worldbounds';
import { BubbleData } from '../component/bubbles/Bubbles';

export function getTrendVolume(regiData: any): number {
  if (regiData.value === 0) {
    return 0;
  }
  return (10**12 * regiData.hashtag.count / regiData.value)
}

export function getIxOfInterest(bubble:BubbleData | null | undefined):number {
  if (!bubble) {
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

