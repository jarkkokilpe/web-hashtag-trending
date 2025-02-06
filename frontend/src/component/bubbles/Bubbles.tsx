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
  getBubbleSize, 
  getVisibleBubbles 
} from './bubbletools';
import { useTrends } from '../context/TrendsContext';
import useVisibleBubblesStore from '../../stores/useVisibleBubblesStore';
import ToolTip from '../tooltip/ToolTip'
import { getFixedAreaCentroid } from '../../utils/maptools'
import { getTooltipPosition } from '../../utils/maptools'
import { geoUsStates } from '../../data/us/statebounds';
import { geoCountries } from '../../data/worldbounds';
import { 
  SizeProps, 
  BubbleData, 
  PositionOnMap, 
  CountryInfo,
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
  updateSelectedBubbleData: (data: BubbleData | null) => void;
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
  const [selectedBubble, setSelectedBubble] = useState<BubbleData | null>(null);
  const [position, setPosition] = useState<PositionOnMap>({ top: 0, left: 0 });
  const [hoveredBubbleData, setHoveredBubbleData] = useState<BubbleData | null>(null);
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

  const debouncedMouseEnter = useDebounce((event: React.MouseEvent<SVGCircleElement, MouseEvent>, bubbleData: BubbleData) => {
    if (!svgRef) { 
      return;
    }

    setHoveredBubbleData(bubbleData);
    const transform = d3.zoomTransform(svgRef.current!);
    
    setPosition(getTooltipPosition(svgRef.current, bubbleTooltipSize, event.nativeEvent, transform));
  }, DEBOUNCE_DELAY);
  
  const debouncedMouseLeave = useDebounce(() => {
    setHoveredBubbleData(null);
  }, DEBOUNCE_DELAY);
  
  const handleClick = (bubbleData: BubbleData): void => {
    console.log('Bubble clicked:', bubbleData); 
    updateSelectedBubbleData(bubbleData);
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
      const usStateBubbles = getVisibleBubbles(svgRef, geoUsStates, usNumData, mapprops, sizeScale, getBubbleSize);
      const countryBubbles = getVisibleBubbles(svgRef, geoCountries, numData, mapprops, sizeScale, getBubbleSize);
      const mergedBubbles = [...usStateBubbles, ...countryBubbles];
      setVisibleBubbles(mergedBubbles);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usNumData, numData, mapprops, zoomTransformStr]);

  const generateBubbles = (data: CountryInfo[], area: GeoArea, className: string) => {
    return data
      .sort((a, b) => getBubbleSize(b) - getBubbleSize(a))
      .map((region, i) => {
        if (zoomScale > ZOOM_THRESHOLD_US_STATES && region.code === 'USA') {
          return null;
        }

        const fixedCentroid = getFixedAreaCentroid(area, region.code, mapprops);
        const bubble: BubbleData = {
          name: region.name,
          hash: region.hashtag,
          position: { top: 0, left: 0 },
          code: region.code,
          value: region.value,
          diff2: region.diff2,
          totalvolume: region.totalvolume,
        };
        const bubbleClass = classNames(styles.bubble, {
          [styles['bubble-normal']]: isDiffAtNormalLevel(bubble.diff2, bubble.totalvolume, 10),
          [styles['bubble-rising']]: !isDiffAtNormalLevel(bubble.diff2, bubble.totalvolume, 10) && bubble.diff2 > 0,
          [styles['bubble-falling']]: !isDiffAtNormalLevel(bubble.diff2, bubble.totalvolume, 10) && bubble.diff2 < 0,
        });
        
        return (
          <g key={i} onClick={() => handleClick(bubble)} className={className}>
            <circle
              cx={fixedCentroid[0]}
              cy={fixedCentroid[1]}
              r={sizeScale(getBubbleSize(region))}
              strokeWidth={strokeWidth}
              className={bubbleClass}
              onMouseEnter={(event) => debouncedMouseEnter(event as React.MouseEvent<SVGCircleElement, MouseEvent>, bubble)}
              onMouseLeave={debouncedMouseLeave}
              onMouseMove={handleMouseMove}
              transform={zoomTransformStr}
            />
          </g>
        );
      });
  };

  const countryBubbles = generateBubbles(numData, geoCountries, 'bubble-group');
  const stateBubbles = generateBubbles(usNumData, geoUsStates, 'state-bubble-group');

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
