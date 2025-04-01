import { useRef, useState, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import { ID_PREFIX_COUNTRY, ID_PREFIX_USSTATE } from '../config/strings';
import { ZOOM_MIN_W_1600, ZOOM_MIN_W_1200, ZOOM_MIN_W_800, ZOOM_MIN_W_MOBILE } from '../config/constants';

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
  //centerAndZoom: (center: { x: number; y: number }, bbox: SVGRect) => void;
  zoomToArea: (countryCode: string) => void;
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

      let initialTransform;
      switch (minZoom) {
        case ZOOM_MIN_W_1600:
          initialTransform = d3.zoomIdentity.translate(-width / 3, -height / 1.7).scale(minZoom);
          break;
        case ZOOM_MIN_W_1200:
          initialTransform = d3.zoomIdentity.translate(-width / 5, -height / 3).scale(minZoom);
          break;
        case ZOOM_MIN_W_800:
          initialTransform = d3.zoomIdentity.translate(width / 8, -height / 8).scale(minZoom);
          break;
        case ZOOM_MIN_W_MOBILE:
          initialTransform = d3.zoomIdentity.translate(width / 3, height / 8).scale(minZoom);
          break;
        default:
          initialTransform = d3.zoomIdentity.translate(-width / 5, -height / 3).scale(minZoom);
      }
      
      (zoom.transform as any)(svg, initialTransform);

      svg.attr("width", width/* - 1*/).attr("height", height);
    }
  }, [width, height, minZoom, maxZoom]);
  
  const centerAndZoom = useCallback((center: { x: number; y: number }, bbox: SVGRect) => {
    if (!svgRef.current) return;

    const zoom = d3.zoom().scaleExtent([minZoom, maxZoom]);
    const svgRect = svgRef.current.getBoundingClientRect();
    const headerHeight = 100;

    const adjustedHeight = svgRect.height - headerHeight;
    const scaleX = svgRect.width / bbox.width;
    const scaleY = adjustedHeight / bbox.height;
    const scale = Math.min(scaleX, scaleY);
    const adjustedScale = Math.max(
      zoom.scaleExtent()[0],
      Math.min(scale * 0.5, zoom.scaleExtent()[1]) // Multiply scale by 0.8 to zoom out slightly
    );
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

  const zoomToArea = (areaCode: string) => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    let element = svg.select(`#${ID_PREFIX_COUNTRY}-${areaCode}`);

    if (element.empty()) {
      element = svg.select(`#${ID_PREFIX_USSTATE}-${areaCode}`);
    }

    if (!element.empty()) {
      const bbox = (element.node() as SVGGraphicsElement)?.getBBox();
      if (bbox) {
        const center = { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 };
        centerAndZoom(center, bbox);
      }
    } else {
      console.error('Element not found for ID:', areaCode);
    }
  }
  
  return {
    svgRef,
    zoomScale,
    currentTransform,
    setZoomScale,
    setCurrentTransform,
    zoomToArea,
  };
};

export default useZoom;