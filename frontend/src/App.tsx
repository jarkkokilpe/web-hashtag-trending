import React from 'react';
import Map from './components/map/Map';
import Header from './components/header/Header';
import SideBar from './components/sidebar/SideBar';
import { SizeProps } from './types/interfaces'
import { TrendsProvider } from './contexts/TrendsContext';
import { ZoomProvider } from './contexts/ZoomContext';
import { 
  ZOOM_MIN, 
  ZOOM_MAX 
} from './config/constants';

import './App.css';

export default function App() {
  const mapprops: SizeProps = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  return (
    <div className="base">
      <TrendsProvider>
        <Header />
        <SideBar />
        <ZoomProvider mapprops={mapprops} minZoom={ZOOM_MIN} maxZoom={ZOOM_MAX}>
          <Map mapprops={mapprops} />
        </ZoomProvider>
      </TrendsProvider>
    </div>
  );
};