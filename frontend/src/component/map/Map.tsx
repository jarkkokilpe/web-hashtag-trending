import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import Bubbles from '../bubbles/Bubbles';
import InfoBox from '../infobox/InfoBox'
import ToolTip from '../tooltip/ToolTip'
import { geoCountries, CountryFeature, CountryProps } from '../../data/worldbounds'
import { geoUsStates } from '../../data/us/statebounds';
import { getMapname } from '../../utils/stats'
import { SizeProps, PositionOnMap, AreaData } from '../../types/interfaces'
import { getTooltipPosition, createProjection } from '../../utils/maptools'
import { getAreaSize, getFixedAreaCentroid } from '../../utils/maptools'
import { getFontSize, isCountryLabelVisible } from '../../utils/labels'
import { ID_PREFIX_COUNTRY, ID_PREFIX_USSTATE } from '../../config/strings';
import { 
  ZOOM_THRESHOLD_US_STATES, 
  ZOOM_MIN, 
  ZOOM_MAX,
  AREA_TOOLTIP_WIDTH,
  AREA_TOOLTIP_HEIGHT,
  VIEWPORT_DEFAULT_WIDTH,
  VIEWPORT_DEFAULT_HEIGHT,
 } from '../../config/constants';
import './Map.css';

interface MapComponentProps {
  mapprops: SizeProps;
}

const Map: React.FC<MapComponentProps> = ({ mapprops }) => {
  const { width = VIEWPORT_DEFAULT_WIDTH, height = VIEWPORT_DEFAULT_HEIGHT } = mapprops; 
  const svgRef = useRef<SVGSVGElement>(null!);
  const [infoBoxCountry, setInfoBoxCountry] = useState<string>('');
  const [isInfoBoxVisible, setIsInfoBoxVisible] = useState(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<PositionOnMap>({ top: 0, left: 0 });
  const [zoomScale, setZoomScale] = useState<number>(ZOOM_MIN);
  const [infoBoxData, setInfoBoxData] = useState<AreaData | null>(null);
  const [currentTransform, setCurrentTransform] = useState<d3.ZoomTransform>();
  
  const areaTooltipSize:SizeProps = {
    width: AREA_TOOLTIP_WIDTH,
    height: AREA_TOOLTIP_HEIGHT,
  };

  useEffect(() => {
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

      interface ZoomEvent {
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
  }, [width, height]);

  const updateSelectedBubbleData = (areaData: AreaData | null) => {
    setInfoBoxData(areaData);
    setIsInfoBoxVisible(true);
  };

  
  // Adjust centerAndZoom to accept a callback for when the transition ends
  const centerAndZoom = (center: { x: number; y: number }, bbox: SVGRect, svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) => {
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
  };

  const handleClick = (idPrefix:string, d: CountryFeature) => {
    console.log('countryfeature click ', d);
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const element = svg.select(`#${idPrefix}-${d.id}`);
  
    if (!element.empty()) {
      const bbox = (element.node() as SVGGraphicsElement)?.getBBox();
      if (bbox) {
        const center = { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 };
        centerAndZoom(center, bbox, svg);
      }
    } else {
      console.error('Element not found for ID:', d.id);
    }
  };

  const handleMouseEnter = (feature:CountryFeature) => {
    const properties = feature.properties as CountryProps;
    setInfoBoxCountry(properties.name || '');
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const transform = d3.zoomTransform(svgRef.current!);
    setPosition(getTooltipPosition(svgRef.current, areaTooltipSize, event.nativeEvent, transform));
  };

  const handleCloseInfoBox = () => {
    setIsInfoBoxVisible(false);
  };

  const generateArea = (idprefix: string, feature: d3.GeoPermissibleObjects) => {
      return (
        <path 
          key={(feature as CountryFeature).id}  
          id={`${idprefix}-${(feature as CountryFeature).id}`} // Setting a unique id for each country
          d={createProjection(mapprops)(feature as d3.GeoPermissibleObjects) || ''} 
          onMouseEnter={() => handleMouseEnter(feature as CountryFeature)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick('country', feature as CountryFeature)}
          strokeWidth={0.6 / zoomScale}
          className="country"
          transform={currentTransform ? currentTransform.toString() : ''}
        />
      );
    };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <svg 
        className="world-map" 
        ref={svgRef} 
        width={width} 
        height={height}
        onMouseMove={handleMouseMove}
      >

        {geoCountries.features.map((feature, index) => {
          if (zoomScale > ZOOM_THRESHOLD_US_STATES) {
            if (feature.id === 'USA') {
              return null;
            }
          }
          const fixedCentroid = getFixedAreaCentroid(geoCountries, feature.id, mapprops);
          return (
            <g key={index}>
              {generateArea(ID_PREFIX_COUNTRY, feature as d3.GeoPermissibleObjects)}
              <text 
                x={fixedCentroid[0]} 
                y={fixedCentroid[1]} 
                textAnchor="middle" 
                dominantBaseline="central"
                className="country-label"
                fontSize={getFontSize(getAreaSize(geoCountries, feature.id, mapprops))}
                fill="black"
                transform={currentTransform ? currentTransform.toString() : ''}
              >
                {(isCountryLabelVisible(getFontSize(getAreaSize(geoCountries, feature.id, mapprops)), zoomScale) ? getMapname(feature as unknown as CountryFeature) : '')}
              </text>
            </g>
          );
        })}

        { (zoomScale > ZOOM_THRESHOLD_US_STATES) && (geoUsStates.features.map((feature, index) => {
          return (
            <g key={index}>
              {generateArea(ID_PREFIX_USSTATE, feature as d3.GeoPermissibleObjects)}
            </g>
          );
        }))}

        <Bubbles 
          mapprops={mapprops} 
          zoomScale={zoomScale} 
          zoomTransformStr={currentTransform ? currentTransform.toString() : ''}
          svgRef={svgRef} 
          updateSelectedBubbleData={updateSelectedBubbleData}
        />
        { isVisible && (
          <ToolTip position={position} inputData={infoBoxCountry} />
        )}
      </svg>
      <InfoBox onClose={handleCloseInfoBox} inputData={infoBoxData} isVisible={isInfoBoxVisible} />
    </div>
  );
};

export default Map;