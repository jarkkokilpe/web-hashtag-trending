import React, { 
  useState, 
  useCallback, 
  useEffect, 
  useRef 
} from 'react';
import * as d3 from 'd3';
import { 
  bubbleTooltipSize, 
  getToolTipData, 
  getSizeScale, 
  getBubbleSizeByDensity, 
  getBubbleSize, 
  getVisibleBubbles 
} from './bubbletools';
import { useTrends } from '../context/TrendsContext';
import useVisibleBubblesStore from '../../stores/useVisibleBubblesStore';
import useDataModeStore, { DataMode } from '../../stores/useDataModeStore';
import ToolTip from '../tooltip/ToolTip'
import { getFixedAreaCentroid } from '../../utils/maptools'
import { getTooltipPosition } from '../../utils/maptools'
import { geoUsStates } from '../../data/us/statebounds';
import { geoCountries } from '../../data/worldbounds';
import { 
  SizeProps, 
  PositionOnMap, 
  AreaData,
  GeoArea, 
} from '../../types/interfaces';
import { isDiffAtNormalLevel } from '../../utils/stats';
import { ZOOM_THRESHOLD_US_STATES, DEBOUNCE_DELAY } from '../../config/constants';
import classNames from 'classnames';
import styles from './bubbles.module.css';

interface BubblesProps {
  mapprops: SizeProps;
  zoomScale: number;
  zoomTransformStr: string,
  svgRef: React.RefObject<SVGSVGElement | null> | null;
  updateSelectedBubbleData: (data: AreaData | null) => void;
}

const Bubbles: React.FC<BubblesProps> = ({ 
  mapprops, 
  zoomScale, 
  zoomTransformStr,
  svgRef,
  updateSelectedBubbleData }) => {
    
  const { numData } = useTrends();
  const { usNumData } = useTrends();
  const { setVisibleBubbles } = useVisibleBubblesStore();
  const { mode } = useDataModeStore();
  const [selectedBubble, setSelectedBubble] = useState<AreaData | null>(null);
  const [position, setPosition] = useState<PositionOnMap>({ top: 0, left: 0 });
  const [hoveredBubbleData, setHoveredBubbleData] = useState<AreaData | null>(null);
  const [isMouseOverBubble, setIsMouseOverBubble] = useState<boolean>(false);
 
  const strokeWidth = 1 / zoomScale;
  const sizeScale = getSizeScale([...numData, ...usNumData]);

  function useDebounce(callback: (...args: any[]) => void, delay: number = 200) {
    const timer = useRef<NodeJS.Timeout | null>(null);
  
    return useCallback((...args: any[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }, [callback, delay]);
  }

  const debouncedMouseEnter = useDebounce((event: React.MouseEvent<SVGCircleElement, MouseEvent>, areaData: AreaData) => {
    if (!svgRef) { 
      return;
    }

    setHoveredBubbleData(areaData);
    const transform = d3.zoomTransform(svgRef.current!);
    
    setPosition(getTooltipPosition(svgRef.current, bubbleTooltipSize, event.nativeEvent, transform));
  }, DEBOUNCE_DELAY);
  
  const debouncedMouseLeave = useDebounce(() => {
    setHoveredBubbleData(null);
  }, DEBOUNCE_DELAY);
  
  const handleClick = (area: AreaData): void => {
    console.log('Bubble clicked:', area); 
    updateSelectedBubbleData(area);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the event from bubbling up to the bubble
  };

  useEffect(() => {
    setIsMouseOverBubble(hoveredBubbleData !== null);
  }, [hoveredBubbleData]);

  useEffect(() => {
      if (isMouseOverBubble) {
        setSelectedBubble(hoveredBubbleData);
      } else {
        setSelectedBubble(null);
      }
  }, [isMouseOverBubble, hoveredBubbleData]);

  useEffect(() => {
    if (svgRef) {
      const usStateBubbles = getVisibleBubbles(svgRef, geoUsStates, usNumData, mapprops, sizeScale, getBubbleSizeByDensity);
      const countryBubbles = getVisibleBubbles(svgRef, geoCountries, numData, mapprops, sizeScale, getBubbleSizeByDensity);
      const mergedBubbles = [...usStateBubbles, ...countryBubbles];
      setVisibleBubbles(mergedBubbles);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usNumData, numData, mapprops, zoomTransformStr]);

  const generateBubbles = (
    data: AreaData[], 
    area: GeoArea, 
    className: string, 
    bubbleSizeFunc: (region: AreaData, mode: DataMode) => number,
    mode: DataMode) => {
    return data
      .sort((a, b) => bubbleSizeFunc(b, mode) - bubbleSizeFunc(a, mode))
      .map((region, i) => {
        if (zoomScale > ZOOM_THRESHOLD_US_STATES && region.code === 'USA') {
          return null;
        }
        const fixedCentroid = getFixedAreaCentroid(area, region.code, mapprops);
        const bubbleClass = classNames(styles.bubble, {
          [styles['bubble-normal']]: isDiffAtNormalLevel(region.diff2, region.totalvolume, 10),
          [styles['bubble-rising']]: !isDiffAtNormalLevel(region.diff2, region.totalvolume, 10) && region.diff2 > 0,
          [styles['bubble-falling']]: !isDiffAtNormalLevel(region.diff2, region.totalvolume, 10) && region.diff2 < 0,
        });
        
        return (
          <g key={i} onClick={() => handleClick(region)} className={className}>
            <circle
              cx={fixedCentroid[0]}
              cy={fixedCentroid[1]}
              r={sizeScale(bubbleSizeFunc(region, mode))}
              strokeWidth={strokeWidth}
              className={bubbleClass}
              onMouseEnter={(event) => debouncedMouseEnter(event as React.MouseEvent<SVGCircleElement, MouseEvent>, region)}
              onMouseLeave={debouncedMouseLeave}
              onMouseMove={handleMouseMove}
              transform={zoomTransformStr}
            />
          </g>
        );
      });
  };
 
  const countryBubbles = generateBubbles(numData, geoCountries, 'bubble-group', getBubbleSize, mode);
  const stateBubbles = generateBubbles(usNumData, geoUsStates, 'state-bubble-group', getBubbleSize, mode);

  return (
    <>
      {countryBubbles}
      {(zoomScale > ZOOM_THRESHOLD_US_STATES) && stateBubbles}
      {selectedBubble && (
        <ToolTip position={position} inputData={getToolTipData(selectedBubble)} />
      )}
    </>
  );
};
  
export default Bubbles;
