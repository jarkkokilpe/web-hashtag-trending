import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useTrends } from '../context/TrendsContext';
import * as d3 from 'd3';
import ToolTip from '../tooltip/ToolTip'
import { SizeProps, HashObj } from '../../types/interfaces';
import { usNumData } from '../../data/us/stateinfo';
import { getFixedCountryCentroid, getFixedUsStateCentroid } from '../../utils/maptools'
import { PositionOnMap, getTooltipPosition } from '../../utils/maptools'
import { getTrendVolume } from '../../utils/stats'
import { ZOOM_THRESHOLD_STATES } from '../map/Map'
import './Bubbles.css';

const BUBBLE_MIN_SIZE = 1.5;
const BUBBLE_MAX_SIZE = 5;

const BUBBLE_TOOLTIP_WIDTH = 120;
const BUBBLE_TOOLTIP_HEIGHT = 40;

interface BubblesProps {
  mapprops: SizeProps;
  zoomScale: number;
  zoomTransformStr: string,
  svgRef: React.RefObject<SVGSVGElement | null> | null;
  updateSelectedBubbleData: (data: BubbleData | null) => void;
}

export interface BubbleData {
  name: string;
  hash: HashObj;
  position: PositionOnMap;
  code: string;
  value: number;
  totalvolume: number;
}

const Bubbles: React.FC<BubblesProps> = ({ 
  mapprops, 
  zoomScale, 
  zoomTransformStr,
  svgRef,
  updateSelectedBubbleData }) => {
    
  const { numData } = useTrends();
  const [selectedBubble, setSelectedBubble] = useState<BubbleData | null>(null);
  const [position, setPosition] = useState<PositionOnMap>({ top: 0, left: 0 });
  const [hoveredBubbleData, setHoveredBubbleData] = useState<BubbleData | null>(null);
  const [isMouseOverBubble, setIsMouseOverBubble] = useState<boolean>(false);
  const strokeWidth = 1 / zoomScale;

  const bubbleTooltipSize:SizeProps = {
    width: BUBBLE_TOOLTIP_WIDTH,
    height: BUBBLE_TOOLTIP_HEIGHT,
  };

  const toolTipData = selectedBubble 
    ? `${selectedBubble.name} trends ${selectedBubble.hash.hashstr}`
    : '';

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

  const debouncedMouseEnter = useDebounce((event: React.MouseEvent<SVGCircleElement, MouseEvent>, bubbleData: BubbleData) => {
    if (!svgRef) { 
      return;
    }

    setHoveredBubbleData(bubbleData);
    const transform = d3.zoomTransform(svgRef.current!);
    
    setPosition(getTooltipPosition(svgRef.current, bubbleTooltipSize, event.nativeEvent, transform));
  }, 100);
  
  const debouncedMouseLeave = useDebounce(() => {
    setHoveredBubbleData(null);
  }, 100);
  
  const handleClick = (bubbleData: BubbleData): void => {
    console.log('Bubble clicked:', bubbleData); 
    updateSelectedBubbleData(bubbleData);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the event from bubbling up to the bubble
  };

  // Bubble Size scale uses scaleSqrt to have the area proportional to the value
  const [min, max] = d3.extent(numData.map((d) => d.value)) as [number, number];
  const sizeScale = d3
    .scaleSqrt()
    .domain([min, max])
    .range([BUBBLE_MIN_SIZE, BUBBLE_MAX_SIZE]);
  
  const getBubbleSize = (regiData: any): number => {
    return getTrendVolume(regiData);
  }

  // Gather all the countries' Bubbles to the 'countryBubbles'
  const countryBubbles = numData
    .sort((a, b) => getBubbleSize(b) - getBubbleSize(a))
    .map((region, i) => {

    if (zoomScale > ZOOM_THRESHOLD_STATES && region.code === 'USA') {
      console.log('zsc usa excl')
      return null;
    }

    // Find the centroid of the region
    const fixedCentroid = getFixedCountryCentroid(region.code, mapprops);
    
    const bubble:BubbleData = {
      name: region.name,
      hash: region.hashtag,
      position: {top: 0, left: 0},
      code: region.code,
      value: region.value,
      totalvolume: region.totalvolume
    }

    // Draw a circle
    return (
      <>
        <g key={i} onClick={() => handleClick(bubble)} className="bubble-group">
            <circle 
              cx={fixedCentroid[0]}
              cy={fixedCentroid[1]}
              r={sizeScale(getBubbleSize(region))}
              strokeWidth={strokeWidth}
              className="bubble"
              onMouseEnter={(event) => debouncedMouseEnter(event as React.MouseEvent<SVGCircleElement, MouseEvent>, bubble)}
              onMouseLeave={debouncedMouseLeave}
              onMouseMove={handleMouseMove}
              transform={zoomTransformStr}
            />
          </g>
      </>
    );
  });

  // Gather all the countries' Bubbles to the 'countryBubbles'
  const stateBubbles = usNumData
    .sort((a, b) => getBubbleSize(b) - getBubbleSize(a))
    .map((region, i) => {

    // Find the centroid of the region
    const fixedCentroid = getFixedUsStateCentroid(region.code, mapprops);
    const bubble:BubbleData = {
      name: region.name,
      hash: region.hashtag,
      position: {top: 0, left: 0},
      code: region.code,
      value: region.value,
      totalvolume: region.totalvolume,
    }

    // Draw a circle
    return (
      <>
        <g key={i} onClick={() => handleClick(bubble)} className="state-bubble-group">
            <circle 
              cx={fixedCentroid[0]}
              cy={fixedCentroid[1]}
              r={sizeScale(getBubbleSize(region))}
              strokeWidth={strokeWidth}
              className="bubble"
              onMouseEnter={(event) => debouncedMouseEnter(event as React.MouseEvent<SVGCircleElement, MouseEvent>, bubble)}
              onMouseLeave={debouncedMouseLeave}
              onMouseMove={handleMouseMove}
              transform={zoomTransformStr}
            />
          </g>
      </>
    );
  });

  return (
    <>
      {countryBubbles}
      {(zoomScale > ZOOM_THRESHOLD_STATES) && stateBubbles}
      {selectedBubble && (
        <ToolTip position={position} inputData={toolTipData} />
      )}
    </>
  );
};
  
export default Bubbles;
