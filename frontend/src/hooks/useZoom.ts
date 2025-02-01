import { useState, useEffect } from 'react';
import * as d3 from 'd3';

const MIN_ZOOM = 2.5;
const MAX_ZOOM = 50;

const useZoom = (svgRef: React.RefObject<SVGSVGElement>, minZoom: number, maxZoom: number) => {
  const [zoomTransform, setZoomTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity);
  
 /* useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);

      // Zoom behavior 
      const zoom = d3.zoom()
        .scaleExtent([MIN_ZOOM, MAX_ZOOM])
        .on('zoom', zoomed);

      svg.call(zoom as unknown as (selection: d3.Selection<SVGSVGElement, unknown, null, undefined>) => void);

      interface ZoomEvent {
        transform: d3.ZoomTransform;
      }

      function zoomed(event: ZoomEvent) {
        const { transform } = event;
        // Update zoomScale state with the new scale
        console.log('zoomScale ', transform.k);
        svg.selectAll('path, circle, text').attr('transform', transform.toString());
        setZoomScale(transform.k);
        setCurrentTransform(d3.zoomTransform(svgRef.current as SVGSVGElement));
      }

      // Define initial zoom here
      const initialTransform = d3.zoomIdentity.translate(-width/1.5, -height).scale(MIN_ZOOM); // Example initial zoom
      (zoom.transform as any)(svg, initialTransform);
      
      // Append content
      svg
        .attr("width", width-1)
        .attr("height", height-4);
        // Set up the interval loop to fetch trends every second
    }
  }, [width, height]);
  */
  
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    const zoom = d3.zoom()
      .scaleExtent([minZoom, maxZoom])
      .on('zoom', (event) => {
        setZoomTransform(event.transform);
      });

    svg.call(zoom as any);

    return () => {
      svg.on('.zoom', null);
    };
  }, [svgRef, minZoom, maxZoom]);

  return zoomTransform;
};

export default useZoom;