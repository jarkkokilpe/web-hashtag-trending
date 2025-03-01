import React, { useState, useEffect } from 'react';
import { PositionOnMap } from '../../types/interfaces';
import './ToolTip.css';

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
      x={(left + 80)} 
      y={(top + 80)} 
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
