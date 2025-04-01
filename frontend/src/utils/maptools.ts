import * as d3 from 'd3';
import { SizeProps, GeoArea, PositionOnMap } from '../types/interfaces'
import { ZOOM_MIN_W_1600, ZOOM_MIN_W_1200, ZOOM_MIN_W_800, ZOOM_MIN_W_MOBILE } from '../config/constants';

export function createProjection(mapprops: SizeProps) {
  return d3.geoPath()
    .projection(d3.geoMercator()
    .translate([mapprops.width / 2, mapprops.height / 1.4]) // translate to center of screen
    .scale(150));
}

export function getMinZoom(windowWidth:number):number {
  // Set minZoom based on the window width
  if (windowWidth > 1600) {
    return ZOOM_MIN_W_1600;
  } else if (windowWidth > 1200) { 
    return ZOOM_MIN_W_1200;
  } else if (windowWidth > 800) {
    return ZOOM_MIN_W_800;
  } else {
    return ZOOM_MIN_W_MOBILE;
  }
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

  const tooltipWidth = boxSize.width;
  const tooltipHeight = boxSize.height;

  let left = svgRect.left + originalX * transform.k + transform.x - (tooltipWidth / 2);
  let top = svgRect.top + originalY * transform.k + transform.y - tooltipHeight - 10; // 10 for some little margin

  // Ensure tooltip stays within window bounds
  left = Math.max(0, Math.min(left, window.innerWidth - tooltipWidth));
  top = Math.max(0, Math.min(top, window.innerHeight - tooltipHeight));

  return {
    top: top + window.scrollY,
    left: left + window.scrollX
  };
};

export function getAreaSize(area:GeoArea, countryId:string, mapprops:SizeProps):number {
   const regionGeoData = area.features.find(
    (geoRegion) => geoRegion.id === countryId
  );
  
  if (!regionGeoData) {
    //console.warn('Geo region not found!', countryId);
    return 0;
  }

  return createProjection(mapprops).area(regionGeoData as d3.GeoPermissibleObjects); 
}

export function getFixedAreaCentroid(
  geoData: GeoArea,
  countryId: string,
  mapprops: SizeProps
): number[] {
  const centroid = getAreaCentroid(geoData, countryId, mapprops);
 
  let fixedCentroid:number[] = [...centroid];
  
  // Hand adjustments for the appropriate centroid point (in map) for the funky shaped areas
  switch (countryId) {
    case 'CAN': fixedCentroid[0] += 15; fixedCentroid[1] += 29; break;
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
    case '02': fixedCentroid[0] -= 50; fixedCentroid[1] -= 40; break; // Alaska
    case '06': fixedCentroid[0] -= 2; fixedCentroid[1] -= 0; break; // California
    case '12': fixedCentroid[0] += 2; fixedCentroid[1] -= 0; break; // Florida
    case '22': fixedCentroid[0] -= 0; fixedCentroid[1] += 2; break; // Lousiana
    case '24': fixedCentroid[0] -= 0; fixedCentroid[1] -= 2; break; // Maryland
    case '44': fixedCentroid[0] -= 1; fixedCentroid[1] -= 0; break; // Rhode Island
    case '51': fixedCentroid[0] -= 6; fixedCentroid[1] += 1; break; // Virginia


    default: break;
  }
  
  return fixedCentroid;
}

export function getAreaCentroid(geoArea: GeoArea, countryId: string, mapprops: SizeProps): number[] {
  // Find the corresponding geoCountries information
  const regionGeoData = geoArea.features.find(
    (geoRegion) => geoRegion.id === countryId
  );
  
  if (!regionGeoData) {
    console.log('Geo region not found! ' + countryId);
    return [0, 0];
  }

  let newRegionGeoData = { ...regionGeoData };

  // If it's a MultiPolygon (islands, enclaves, exclaves), reduce the coordinates to the first array which is the main polygon
  if (newRegionGeoData.geometry.type === 'MultiPolygon') {
    newRegionGeoData.geometry = {
      ...newRegionGeoData.geometry,
      coordinates: newRegionGeoData.geometry.coordinates[0] as number[][][]
    };
    newRegionGeoData.geometry.type = 'Polygon';
  }
        
  return createProjection(mapprops).centroid(newRegionGeoData as unknown as d3.GeoPermissibleObjects);
}
