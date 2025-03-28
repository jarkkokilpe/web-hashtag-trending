import React, { useEffect, useState } from 'react';
import useDataModeStore, { DATAMODE_VOLUME, DATAMODE_DENSITY, DATAMODE_CHANGE } from '../../stores/useDataModeStore';
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
  const { setDataMode: setMode } = useDataModeStore();

  useEffect(() => {
    setActiveTab('tabVolume');
    setMode(DATAMODE_VOLUME);
  }, [setMode]); 
  
  const handleTabDataClick = (tab: string) => {
    switch (tab) {
      case 'tabVolume': setMode(DATAMODE_VOLUME); break;
      case 'tabDensity': setMode(DATAMODE_DENSITY); break;
      case 'tabChange': setMode(DATAMODE_CHANGE); break;
      default: setMode(DATAMODE_VOLUME); break;
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