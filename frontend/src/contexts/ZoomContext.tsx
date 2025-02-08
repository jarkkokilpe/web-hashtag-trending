import React, { createContext, useContext, ReactNode } from 'react';
import useZoom from '../hooks/useZoom';
import { VIEWPORT_DEFAULT_HEIGHT, VIEWPORT_DEFAULT_WIDTH } from '../config/constants';
import { SizeProps } from '../types/interfaces';

interface ZoomProviderProps {
  children: ReactNode;
  mapprops: SizeProps;
  minZoom: number;
  maxZoom: number;
}

const ZoomContext = createContext<ReturnType<typeof useZoom> | undefined>(undefined);

export const ZoomProvider: React.FC<ZoomProviderProps> = ({ children, mapprops, minZoom, maxZoom }) => {
  const { width = VIEWPORT_DEFAULT_WIDTH, height = VIEWPORT_DEFAULT_HEIGHT } = mapprops; 
  const zoom = useZoom({ width, height, minZoom, maxZoom });
  return <ZoomContext.Provider value={zoom}>{children}</ZoomContext.Provider>;
};

export const useZoomContext = () => {
  const context = useContext(ZoomContext);
  if (!context) {
    throw new Error('useZoomContext must be used within a ZoomProvider');
  }
  return context;
};