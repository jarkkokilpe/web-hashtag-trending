import React, { useEffect, useState } from 'react';
// import useDataModeStore, { DATAMODE_VOLUME, DATAMODE_DENSITY, DATAMODE_CHANGE } from '../../stores/zustand/useDataModeStore';
import { useDispatch } from 'react-redux'; 
import { setDataMode } from '../../stores/redux/slices/dataModeSlice'; 
import { DATAMODE_VOLUME, DATAMODE_DENSITY, DATAMODE_CHANGE } from '../../stores/redux/slices/dataModeSlice'; 

import { useMobile } from '../../contexts/MobileContext';
import SideBarDataGrid from './SideBarDataGrid';
import TabDataBar from './TabDataBar';
import SideBarToggleButton from './SideBarToggleButton';
import './SideBar.css';
import TabSourceBar from './TabSourceBar';

const SideBar: React.FC = () => {
  const { isMobile } = useMobile();
  const [isHidden, setIsHidden] = useState<boolean>(isMobile);
  const [activeTab, setActiveTab] = useState<string>('tabVolume');
  // const { setDataMode: setMode } = useDataModeStore(); // zustand approach
  const dispatch = useDispatch(); // redux approach

  /* zustand approach
  useEffect(() => {
    setActiveTab('tabVolume');
    setMode(DATAMODE_VOLUME);
  }, [setMode]); */
  
  useEffect(() => {
    setActiveTab('tabVolume');
    dispatch(setDataMode(DATAMODE_VOLUME));
  }, [dispatch]); 
  
  const handleTabDataClick = (tab: string) => {
    switch (tab) {
      case 'tabVolume': dispatch(setDataMode(DATAMODE_VOLUME)); break;
      case 'tabDensity': dispatch(setDataMode(DATAMODE_DENSITY)); break;
      case 'tabChange': dispatch(setDataMode(DATAMODE_CHANGE)); break;
      default: dispatch(setDataMode(DATAMODE_VOLUME)); break;
    }
    setActiveTab(tab);
  };

  const toggleSidebar = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      <div className={`sidebar ${isHidden ? 'hidden' : ''}`}>
        <TabSourceBar />
        <TabDataBar activeTab={activeTab} onTabClick={handleTabDataClick} />
        <SideBarDataGrid activeTab={activeTab} />
      </div>
      <SideBarToggleButton isHidden={isHidden} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default SideBar;