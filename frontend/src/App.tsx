import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsMobile } from './stores/redux/slices/mobileSlice';
import Map from './components/map/Map';
import Header from './components/header/Header';
import Footer from './components/footer/Footer'; 
import SideBar from './components/sidebar/SideBar';
import { SizeProps } from './types/interfaces'
import { TrendsApiProvider } from './contexts/TrendsApiContext';
import { ZoomProvider } from './contexts/ZoomContext';
import { ZOOM_MAX } from './config/constants';
import { getMinZoom } from './utils/maptools';
import './App.css';

export default function App() {
  const [mapprops, setMapProps] = useState<SizeProps>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setMapProps({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      dispatch(setIsMobile(window.innerWidth <= 768));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return (
    <div className="base">
      <TrendsApiProvider>
        <Header />
        <ZoomProvider mapprops={mapprops} minZoom={getMinZoom(mapprops.width)} maxZoom={ZOOM_MAX}>
          <SideBar />
          <Map mapprops={mapprops} />
        </ZoomProvider>
        <Footer />
      </TrendsApiProvider>
    </div>
  );
};