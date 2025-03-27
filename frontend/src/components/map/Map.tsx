import React, { useState } from 'react';
import * as d3 from 'd3';
import Bubbles from '../bubbles/Bubbles';
import InfoBox from '../infobox/InfoBox'
import ToolTip from '../tooltip/ToolTip'
import { useZoomContext } from '../../contexts/ZoomContext';
import { SizeProps, PositionOnMap, AreaData } from '../../types/interfaces'
import { geoCountries, CountryFeature, CountryProps } from '../../data/worldbounds'
import { geoUsStates } from '../../data/us/statebounds';
import { getMapname } from '../../utils/stats'
import { getTooltipPosition, createProjection } from '../../utils/maptools'
import { getAreaSize, getFixedAreaCentroid } from '../../utils/maptools'
import { getFontSize, isCountryLabelVisible } from '../../utils/labels'
import { ID_PREFIX_COUNTRY, ID_PREFIX_USSTATE } from '../../config/strings';
import { 
  ZOOM_THRESHOLD_US_STATES, 
  TOOLTIP_WIDTH,
  TOOLTIP_HEIGHT,
  VIEWPORT_DEFAULT_WIDTH,
  VIEWPORT_DEFAULT_HEIGHT,
 } from '../../config/constants';
import './Map.css';

interface MapComponentProps {
  mapprops: SizeProps;
}

const Map: React.FC<MapComponentProps> = ({ mapprops }) => {
  const { width = VIEWPORT_DEFAULT_WIDTH, height = VIEWPORT_DEFAULT_HEIGHT } = mapprops; 
  const [toolTipCountry, setToolTipCountry] = useState<string>('');
  const [isInfoBoxVisible, setIsInfoBoxVisible] = useState(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<PositionOnMap>({ top: 0, left: 0 });
  const [infoBoxData, setInfoBoxData] = useState<AreaData | null>(null);
  const { svgRef, zoomScale, currentTransform, zoomToArea } = useZoomContext();
  
  const areaTooltipSize:SizeProps = {
    width: TOOLTIP_WIDTH,
    height: TOOLTIP_HEIGHT,
  };

  const updateSelectedBubbleData = (areaData: AreaData | null) => {
    setInfoBoxData(areaData);
    setIsInfoBoxVisible(true);
  };

  const handleClick = (countryCode: string) => {
    zoomToArea(countryCode);
  };

  const handleMouseEnter = (feature:CountryFeature) => {
    const properties = feature.properties as CountryProps;
    setToolTipCountry(properties.name || '');
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
        id={`${idprefix}-${(feature as CountryFeature).id}`}
        d={createProjection(mapprops)(feature as d3.GeoPermissibleObjects) || ''} 
        onMouseEnter={() => handleMouseEnter(feature as CountryFeature)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick((feature as CountryFeature).id)}
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
          <ToolTip position={position} inputData={toolTipCountry} />
        )}
      </svg>
      <InfoBox onClose={handleCloseInfoBox} inputData={infoBoxData} isVisible={isInfoBoxVisible} />
    </div>
  );
};

export default Map;