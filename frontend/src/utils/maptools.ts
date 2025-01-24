import * as d3 from 'd3';
import { geoData } from '../data/worldbounds'
import { geoJsonUsStates } from '../data/us/statebounds'

export interface SizeProps {
  width:number,
  height:number,
}

export interface PositionOnMap {
  top: number;
  left: number;
}


interface JsonDataItem {
  id: string;
  coordinates: number[][];
  [key: string]: any;
}

interface GeoJSONFeature {
  type: string;
  id: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  properties: { [key: string]: any };
}

interface GeoJSON {
  type: string;
  features: GeoJSONFeature[];
}

export function jsonToGeoJSON(jsonData: JsonDataItem[]): GeoJSON {
  return {
    type: "FeatureCollection",
    features: jsonData.map(item => ({
      type: "Feature",
      id: item.id,
      geometry: {
        type: "Polygon", // Adjust based on what type your data represents
        coordinates: [item.coordinates] // GeoJSON requires an extra nesting for polygons
      },
      properties: Object.fromEntries(
        Object.entries(item).filter(([key]) => !['id', 'coordinates'].includes(key))
      )
    }))
  };
}

export function createProjection(mapprops: SizeProps) {
  return d3.geoPath()
    .projection(d3.geoMercator()
    .translate([mapprops.width / 2, mapprops.height / 1.4]) // translate to center of screen
    .scale(150)); // depending on the screen's size
}

export function getTooltipPosition (
  svgRef:SVGSVGElement | null,
  boxSize:SizeProps,
  event: MouseEvent, 
  transform: d3.ZoomTransform)
  : PositionOnMap {
  if (!svgRef) return { top: 0, left: 0 };
  const svg = svgRef;

  const svgRect = svg.getBoundingClientRect();
  let mouseX = event.clientX - svgRect.left; // Mouse position in SVG space before transform
  let mouseY = event.clientY - svgRect.top;

  // Convert mouse position to original SVG coordinates before applying zoom
  const [originalX, originalY] = transform.invert([mouseX, mouseY]);

  // Now, calculate tooltip position based on where the mouse is in the SVG's coordinate system
  const tooltipWidth = boxSize.width; // Adjust based on your tooltip's actual width
  const tooltipHeight = boxSize.height; // Adjust based on your tooltip's actual height

  let left = svgRect.left + originalX * transform.k + transform.x - (tooltipWidth / 2);
  let top = svgRect.top + originalY * transform.k + transform.y - tooltipHeight - 10; // 10 for some margin

  // Ensure tooltip stays within window bounds
  left = Math.max(0, Math.min(left, window.innerWidth - tooltipWidth));
  top = Math.max(0, Math.min(top, window.innerHeight - tooltipHeight));

  return {
    top: top + window.scrollY,
    left: left + window.scrollX
  };
};

export function getCountryArea(countryId:string, mapprops:SizeProps):number {
   // Find the corresponding geoData information
   const regionGeoData = geoData.features.find(
    (geoRegion) => geoRegion.id === countryId
  );
  
  if (!regionGeoData) {
    //console.warn('Geo region not found!', countryId);
    return 0;
  }

  return createProjection(mapprops).area(regionGeoData as d3.GeoPermissibleObjects); 
}

/**
 * getFixedCountryCentroid
 * 
 * Function that returns the suitable position for country name label
 */
export function getFixedCountryCentroid(countryId:string, mapprops:SizeProps): number[] {
  const centroid = getCountryCentroid(countryId, mapprops);
  let fixedCentroid:number[] = [...centroid];
  
  // Hand adjustments for the appropriate centroid point (in map) for the funky shaped countries
  switch (countryId) {
    case 'CAN': fixedCentroid[0] += 15;  fixedCentroid[1] += 29; break;
    case 'CHL': fixedCentroid[0] -= 1;  fixedCentroid[1] -= 4; break;
    case 'CHN': fixedCentroid[0] -= 6;  fixedCentroid[1] += 10; break;
    case 'FIN': fixedCentroid[0] -= 1;  fixedCentroid[1] += 12; break;
    case 'GBR': fixedCentroid[0] += 3;  fixedCentroid[1] += 7; break;
    case 'GRC': fixedCentroid[0] -= 2;  fixedCentroid[1] += 1; break;
    case 'GRL': fixedCentroid[0] += 5;  fixedCentroid[1] += 40; break;
    case 'HRV': fixedCentroid[0] += 1;  fixedCentroid[1] -= 2; break;
    case 'IND': fixedCentroid[0] -= 2;  fixedCentroid[1] += 2; break;
    case 'ITA': fixedCentroid[0] += 0;  fixedCentroid[1] += 2; break;
    case 'MAR': fixedCentroid[0] += 3;  fixedCentroid[1] -= 4; break;
    case 'NOR': fixedCentroid[0] -= 17; fixedCentroid[1] += 25; break;
    case 'OMN': fixedCentroid[0] += 1;  fixedCentroid[1] += 0; break;
    case 'PER': fixedCentroid[0] -= 2;  fixedCentroid[1] += 4; break;
    case 'PRT': fixedCentroid[0] -= 1;  fixedCentroid[1] += 1; break;
    case 'SWE': fixedCentroid[0] += 1;  fixedCentroid[1] -= 5;  break;
    case 'ARE': fixedCentroid[0] -= 1;  fixedCentroid[1] += 1;  break;
    case 'ZMB': fixedCentroid[0] -= 3;  fixedCentroid[1] += 3;  break;

    default: break;
  }
  
  return fixedCentroid;
}

/**
 * getFixedCountryCentroid
 * 
 * Function that returns the country's centroid
 */
export function getCountryCentroid(countryId:string, mapprops:SizeProps): number[] {
  // Find the corresponding geoData information
  const regionGeoData = geoData.features.find(
   (geoRegion) => geoRegion.id === countryId
 );
 
 if (!regionGeoData) {
   //console.warn('Geo region not found!', countryId);
   return [0,0];
 }

 // Create a new object to avoid mutating the original data
 let newRegionGeoData = { ...regionGeoData };

 // If it's a MultiPolygon, reduce the coordinates to the first array
 if (newRegionGeoData.geometry.type === 'MultiPolygon') {
   newRegionGeoData.geometry = {
     ...newRegionGeoData.geometry,
     coordinates: newRegionGeoData.geometry.coordinates[0] as number[][][]
   };
   // Optionally, change the type to 'Polygon' if you want to reflect the change in coordinates
   newRegionGeoData.geometry.type = 'Polygon';
 }
       
 return createProjection(mapprops).centroid(newRegionGeoData as unknown as d3.GeoPermissibleObjects);
}

export function getUsStateCentroid(stateCode:string, mapprops:SizeProps): number[] {
  // Find the corresponding geoData information
  const regionGeoData = geoJsonUsStates.features.find(
   (geoRegion) => geoRegion.id === stateCode
 );
 
 if (!regionGeoData) {
   //console.warn('Geo region not found!', countryId);
   return [0,0];
 }

 // Create a new object to avoid mutating the original data
 let newRegionGeoData = { ...regionGeoData };

 // If it's a MultiPolygon, reduce the coordinates to the first array
 if (newRegionGeoData.geometry.type === 'MultiPolygon') {
   newRegionGeoData.geometry = {
     ...newRegionGeoData.geometry,
     coordinates: newRegionGeoData.geometry.coordinates[0] as number[][][]
   };
   // Optionally, change the type to 'Polygon' if you want to reflect the change in coordinates
   newRegionGeoData.geometry.type = 'Polygon';
 }
       
 return createProjection(mapprops).centroid(newRegionGeoData as unknown as d3.GeoPermissibleObjects);
}

export function getFontSize(area: number): number {
  if (area > 10000) {
    return 8;
  } else if (area > 5000) {
    return 6;
  } else if (area > 1000) {
    return 4;
  } else if (area > 300) {
    return 2;
  } else if (area > 50) {
    return 1;
  } else {
    return 0;
  }
}

export function isCountryLabelVisible(font: number, zoomScale:number): boolean {
  if (zoomScale <= 2 && font >= 6) {
    return true;
  } else if (zoomScale > 2 && font >= 6) {
    return true;
  } else if (zoomScale > 3 && font >= 4) {
    return true;
  } else if (zoomScale > 4 && font >= 2) {
    return true;
  } else if (zoomScale > 8 && font >= 1) {
    return true;
  } else {
    return false;
  }
}
