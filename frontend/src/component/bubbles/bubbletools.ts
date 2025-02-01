import * as d3 from 'd3';
import { getFixedAreaCentroid } from '../../utils/maptools'
import { getTrendVolume } from '../../utils/stats'
import { 
  BUBBLE_TOOLTIP_WIDTH, 
  BUBBLE_TOOLTIP_HEIGHT,
  BUBBLE_MIN_SIZE,
  BUBBLE_MAX_SIZE,
 } from '../../config/constants'
import { 
  SizeProps, 
  BubbleData,
  CountryInfo,
  GeoArea, 
} from '../../types/interfaces';

export const bubbleTooltipSize: SizeProps = {
  width: BUBBLE_TOOLTIP_WIDTH,
  height: BUBBLE_TOOLTIP_HEIGHT,
};

export const getToolTipData = (selectedBubble: BubbleData | null): string => {
  return selectedBubble ? `${selectedBubble.name} trends ${selectedBubble.hash.hashstr}` : '';
};

export function getBubbleSize (regiData: any): number {
  return getTrendVolume(regiData);
}

export const getSizeScale = (data: CountryInfo[]): d3.ScaleLinear<number, number> => {
  const [min, max] = d3.extent(data.map((d) => d.value)) as [number, number];
  return d3
    .scaleSqrt()
    .domain([min, max])
    .range([BUBBLE_MIN_SIZE, BUBBLE_MAX_SIZE]);
};

export function getVisibleBubbles(
  svgRef: React.RefObject<SVGSVGElement | null>,
  area: GeoArea,
  areaNumData: CountryInfo[],
  mapprops: SizeProps,
  sizeScale: d3.ScaleLinear<number, number>,
  getBubbleSize: (region: CountryInfo) => number
): BubbleData[] {
  if (!svgRef || !svgRef.current) return [];
  const svgElement = svgRef.current;
  const svgRect = svgElement.getBoundingClientRect();
  const transform = d3.zoomTransform(svgElement);
  const visibleBubbles = areaNumData.filter((region) => {
    const fixedCentroid = getFixedAreaCentroid(area, region.code, mapprops);
    const transformedCentroid = transform.apply([fixedCentroid[0], fixedCentroid[1]]);
    const radius = sizeScale(getBubbleSize(region)) * transform.k;
    const circleBBox = {
      x: transformedCentroid[0] - radius,
      y: transformedCentroid[1] - radius,
      width: radius * 2,
      height: radius * 2,
    };

    //console.log('Circle BBox:', circleBBox); // Debug: Log the bounding box of each circle

    return (
      circleBBox.x + circleBBox.width > 0 &&
      circleBBox.x < svgRect.width &&
      circleBBox.y + circleBBox.height > 0 &&
      circleBBox.y < svgRect.height
    );
  });

  return visibleBubbles.map((region) => ({
    name: region.name,
    hash: region.hashtag,
    position: { top: 0, left: 0 },
    code: region.code,
    value: region.value,
    totalvolume: region.totalvolume,
  }));
};
