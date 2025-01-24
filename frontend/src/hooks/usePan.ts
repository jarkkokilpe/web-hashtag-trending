import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface PanProps {
  x: number;
  y: number;
}

const usePan = (svgRef: React.RefObject<SVGSVGElement>) => {
  const zoomBehavior = useRef<d3.ZoomBehavior<Element, unknown> | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      zoomBehavior.current = d3.zoom().scaleExtent([1, 20]);
      d3.select(svgRef.current).call(zoomBehavior.current as any);
    }
  }, []);

  const pan = ({ x, y }: PanProps) => {
    if (!svgRef.current || !zoomBehavior.current) return;

    // Get the current transform
    const currentTransform = d3.zoomTransform(svgRef.current);

    // Apply the panning by adjusting translation
    const newTransform = d3.zoomIdentity
      .translate(currentTransform.x + x, currentTransform.y + y)
      .scale(currentTransform.k);

    // Use the zoom behavior to apply the new transform, ensuring other zoom listeners are notified
    d3.select(svgRef.current).call(zoomBehavior.current.transform as any, newTransform);
  };

  return pan;
};

export default usePan;