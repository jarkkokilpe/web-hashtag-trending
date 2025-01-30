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
