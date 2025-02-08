import { useRef, useState, useEffect, useCallback } from 'react';
import * as d3 from 'd3';

interface UseZoomProps {
  width: number;
  height: number;
  minZoom: number;
  maxZoom: number;
}

interface UseZoomReturn {
  svgRef: React.RefObject<SVGSVGElement>;
  zoomScale: number;
  currentTransform: d3.ZoomTransform | undefined;
  setZoomScale: React.Dispatch<React.SetStateAction<number>>;
  setCurrentTransform: React.Dispatch<React.SetStateAction<d3.ZoomTransform | undefined>>;
  centerAndZoom: (center: { x: number; y: number }, bbox: SVGRect) => void;
}

const useZoom = ({ width, height, minZoom, maxZoom }: UseZoomProps): UseZoomReturn => {
  const svgRef = useRef<SVGSVGElement>(null!);
  const [zoomScale, setZoomScale] = useState<number>(minZoom);
  const [currentTransform, setCurrentTransform] = useState<d3.ZoomTransform>();

  useEffect(() => {
    if (svgRef.current) {
      function zoomed(event: d3.D3ZoomEvent<SVGSVGElement, unknown>) {
        const { transform } = event;
        d3.select(svgRef.current).selectAll('path, circle, text').attr('transform', transform.toString());
        setZoomScale(transform.k);
        setCurrentTransform(d3.zoomTransform(svgRef.current as SVGSVGElement));
      }

      const svg = d3.select(svgRef.current);
      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([minZoom, maxZoom])
        .on('zoom', zoomed);

      svg.call(zoom);

      const initialTransform = d3.zoomIdentity.translate(-width / 1.5, -height).scale(minZoom);
      (zoom.transform as any)(svg, initialTransform);

      svg.attr("width", width - 1).attr("height", height - 4);
    }
  }, [width, height, minZoom, maxZoom]);
  
  /*useEffect(() => {
    if (svgRef.current) {
      
      function zoomed(event: ZoomEvent) {
        const { transform } = event;
        // Update zoomScale state with the new scale
        console.log('zoomScale ', transform.k);
        svg.selectAll('path, circle, text').attr('transform', transform.toString());
        setZoomScale(transform.k);
        setCurrentTransform(d3.zoomTransform(svgRef.current as SVGSVGElement));
      }

      const svg = d3.select(svgRef.current);
      // Zoom behavior 
      const zoom = d3.zoom()
        .scaleExtent([ZOOM_MIN, ZOOM_MAX])
        .on('zoom', zoomed);

      svg.call(zoom as unknown as (selection: d3.Selection<SVGSVGElement, unknown, null, undefined>) => void);/**/

     /* interface ZoomEvent {
        transform: d3.ZoomTransform;
      }

      

      // Define initial zoom here
      const initialTransform = d3.zoomIdentity.translate(-width/1.5, -height).scale(ZOOM_MIN); // Example initial zoom
      (zoom.transform as any)(svg, initialTransform);
      
      // Append content
      svg
        .attr("width", width-1)
        .attr("height", height-4);
        // Set up the interval loop to fetch trends every second
    }
  }, [width, height]);*/

  const centerAndZoom = useCallback((center: { x: number; y: number }, bbox: SVGRect) => {
    if (!svgRef.current) return;

    const zoom = d3.zoom().scaleExtent([minZoom, maxZoom]);
    const svgRect = svgRef.current.getBoundingClientRect();
    const headerHeight = 100;

    const adjustedHeight = svgRect.height - headerHeight;
    const scaleX = svgRect.width / bbox.width;
    const scaleY = adjustedHeight / bbox.height;
    const scale = Math.min(scaleX, scaleY);
    const adjustedScale = Math.max(zoom.scaleExtent()[0], Math.min(scale, zoom.scaleExtent()[1]));

    const translate = {
      x: (svgRect.width / 2) - (center.x * adjustedScale),
      y: ((adjustedHeight / 2) + headerHeight) - (center.y * adjustedScale)
    };

    const svg = d3.select(svgRef.current);
    svg.transition()
      .call(zoom.transform as any, d3.zoomIdentity.translate(translate.x, translate.y).scale(adjustedScale))
      .on('end', () => {
        const currentTransform = d3.zoomTransform(svgRef.current as SVGSVGElement);
        setZoomScale(currentTransform.k);
        svg.selectAll('path, circle, text').attr('transform', currentTransform.toString());
        setCurrentTransform(d3.zoomTransform(svgRef.current as SVGSVGElement));
      });
  }, [minZoom, maxZoom]);

  // Adjust centerAndZoom to accept a callback for when the transition ends
  /* const centerAndZoom = (center: { x: number; y: number }, bbox: SVGRect, svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) => {
    if (!svgRef.current) return;

    const zoom = d3.zoom().scaleExtent([ZOOM_MIN, ZOOM_MAX]);
    const svgRect = svgRef.current.getBoundingClientRect();
    const headerHeight = 100; // Height of the header

    // Adjust the SVG rectangle height for the header
    const adjustedHeight = svgRect.height - headerHeight;

    const scaleX = svgRect.width / bbox.width;
    const scaleY = adjustedHeight / bbox.height; // Use adjusted height for vertical scaling
    const scale = Math.min(scaleX, scaleY);
    const adjustedScale = Math.max(zoom.scaleExtent()[0], Math.min(scale, zoom.scaleExtent()[1]));

    // Adjust translation to account for header
    const translate = {
      x: (svgRect.width / 2) - (center.x * adjustedScale),
      y: ((adjustedHeight / 2) + headerHeight) - (center.y * adjustedScale) // Add back headerHeight to center vertically
    };

    svg.transition()
      .call(zoom.transform as any, d3.zoomIdentity.translate(translate.x, translate.y).scale(adjustedScale))
      .on('end', () => {
        const currentTransform = d3.zoomTransform(svgRef.current as SVGSVGElement);
        setZoomScale(currentTransform.k);
        svg.selectAll('path, circle, text').attr('transform', currentTransform.toString());
        setCurrentTransform(d3.zoomTransform(svgRef.current as SVGSVGElement));
      });
  };*/

  return {
    svgRef,
    zoomScale,
    currentTransform,
    setZoomScale,
    setCurrentTransform,
    centerAndZoom,
  };
};

export default useZoom;