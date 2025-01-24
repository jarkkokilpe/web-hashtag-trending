import React from 'react';
import Map from './component/map/Map';
import Header from './component/header/Header';
import SideBar from './component/sidebar/SideBar';
import { SizeProps } from './utils/maptools'
import './App.css';

export default function App() {
  const mapprops: SizeProps = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  return (
    <div className="base">
      <Header />
      <SideBar />
      <Map mapprops={mapprops} />
    </div>
  );
};