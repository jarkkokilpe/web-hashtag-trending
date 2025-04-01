import React, { useEffect, useState } from 'react';
import Map from './components/map/Map';
import Header from './components/header/Header';
import SideBar from './components/sidebar/SideBar';
import { SizeProps } from './types/interfaces'
import { TrendsApiProvider } from './contexts/TrendsApiContext';
import { ZoomProvider } from './contexts/ZoomContext';
import { MobileProvider } from './contexts/MobileContext';
import { ZOOM_MIN_W_1600, ZOOM_MAX } from './config/constants';
import './App.css';
import { getMinZoom } from './utils/maptools';

export default function App() {
  const [mapprops, setMapProps] = useState<SizeProps>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setMapProps({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    console.log('App: handleResize', mapprops);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <MobileProvider>
      <div className="base">
        <TrendsApiProvider>
          <Header />
          <ZoomProvider mapprops={mapprops} minZoom={getMinZoom(mapprops.width)} maxZoom={ZOOM_MAX}>
            <SideBar />
            <Map mapprops={mapprops} />
          </ZoomProvider>
        </TrendsApiProvider>
      </div>
    </MobileProvider>
  );
};