/**
 * ToolTip Component (with SVG)
 * 
 * This component renders a tooltip at a specified position with input data.
 * The label size will be wrapped with the inputData text length. 
 * It is meant to use this component with SVG component as a parent.
 * 
 * Props:
 * - position (PositionOnMap | null): The position of the tooltip on the map. If not provided, defaults to { top: 0, left: 0 }.
 * - inputData (string): The content to be displayed inside the tooltip.
 * 
 * Example Usage:
 * ```
 * <ToolTip 
 *   position={{ top: 100, left: 200 }} 
 *   inputData="This is a tooltip" 
 * />
 * ```
 */

import React, { useState, useEffect } from 'react';
import './ToolTip.css';
import { PositionOnMap } from '../../utils/maptools';

interface ToolTipProps {
  position?: PositionOnMap | null;
  inputData: string;
}

const ToolTip: React.FC<ToolTipProps> = ({ position, inputData }) => {
  const { top = 0, left = 0 } = position || {}; 
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Calculate the tooltip box size
  useEffect(() => {
    const measureDiv = document.createElement('div');
    measureDiv.style.position = 'absolute';
    measureDiv.style.visibility = 'hidden';
    measureDiv.style.width = 'auto';
    measureDiv.style.height = 'auto';
    measureDiv.style.whiteSpace = 'nowrap'; // or 'normal' if you want wrapping
    measureDiv.innerHTML = inputData;
    document.body.appendChild(measureDiv);
    
    const { width, height } = measureDiv.getBoundingClientRect();
    setDimensions({ width: Math.ceil(width), height: Math.ceil(height) });
    
    document.body.removeChild(measureDiv);
  }, [inputData]);

  return (
    <foreignObject 
      x={(left + 100)} 
      y={(top + 100)} 
      width={dimensions.width} 
      height={dimensions.height}
    >
      <div className="popup">
        {inputData}
      </div>
    </foreignObject>
  );
};

export default ToolTip;
