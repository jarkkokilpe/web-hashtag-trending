import * as d3 from 'd3';
import { getFixedAreaCentroid } from '../../utils/maptools'
import { getTrendDensity, getTrendVolume, getTrendDiff } from '../../utils/stats'
import { 
  TOOLTIP_WIDTH, 
  TOOLTIP_HEIGHT,
  BUBBLE_MIN_SIZE,
  BUBBLE_MAX_SIZE,
 } from '../../config/constants'
import { 
  SizeProps,
  AreaData,
  GeoArea, 
} from '../../types/interfaces';
import { 
  DATAMODE_VOLUME, 
  DATAMODE_DENSITY, 
  DATAMODE_CHANGE, 
  DataMode 
} from '../../stores/redux/slices/dataModeSlice'; // redux approach
// } from '../../stores/zustand/useDataModeStore'; // zustand approach

export const bubbleTooltipSize: SizeProps = {
  width: TOOLTIP_WIDTH,
  height: TOOLTIP_HEIGHT,
};

export const getToolTipData = (selectedBubble: AreaData | null): string => {
  return selectedBubble ? `${selectedBubble.name} trends ${selectedBubble.hashtag.hashstr}` : '';
};

export function getBubbleSizeByDensity (area: AreaData): number {
  return getTrendDensity(area);
}

export function getBubbleSizeByVolume (area: AreaData): number {
  return getTrendVolume(area);
}

export function getBubbleSizeByDiff2 (area: AreaData): number {
  return getTrendDiff(area, 2);
}

export function getBubbleSize (area: AreaData, mode: DataMode): number {

  if (mode === DATAMODE_VOLUME) {
    return getBubbleSizeByVolume(area);
  } else if (mode === DATAMODE_DENSITY) {
    return getBubbleSizeByDensity(area);
  } else if (mode === DATAMODE_CHANGE) {
    return getBubbleSizeByDiff2(area);
  }

  return 0;
}

export const getSizeScale = (data: AreaData[]): d3.ScaleLinear<number, number> => {
  const [min, max] = d3.extent(data.map((d) => d.value)) as [number, number];
  return d3
    .scaleSqrt()
    .domain([min, max])
    .range([BUBBLE_MIN_SIZE, BUBBLE_MAX_SIZE]);
};

export function getVisibleBubbles(
  svgRef: React.RefObject<SVGSVGElement | null>,
  area: GeoArea,
  areaNumData: AreaData[],
  mapprops: SizeProps,
  sizeScale: d3.ScaleLinear<number, number>,
  bubbleSizeFunc: (region: AreaData) => number
): AreaData[] {
  if (!svgRef || !svgRef.current) return [];
  const svgElement = svgRef.current;
  const svgRect = svgElement.getBoundingClientRect();
  const transform = d3.zoomTransform(svgElement);
  const visibleBubbles = areaNumData.filter((region: any) => {
    const fixedCentroid = getFixedAreaCentroid(area, region.code, mapprops);
    const transformedCentroid = transform.apply([fixedCentroid[0], fixedCentroid[1]]);
    const radius = sizeScale(bubbleSizeFunc(region)) * transform.k;
    const circleBBox = {
      x: transformedCentroid[0] - radius,
      y: transformedCentroid[1] - radius,
      width: radius * 2,
      height: radius * 2,
    };

    return (
      circleBBox.x + circleBBox.width > 0 &&
      circleBBox.x < svgRect.width &&
      circleBBox.y + circleBBox.height > 0 &&
      circleBBox.y < svgRect.height
    );
  });

  return visibleBubbles.map((region) => ({
    ...region,
    position: { top: 0, left: 0 },
  }));
};
