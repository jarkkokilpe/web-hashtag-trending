import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { RootState } from '../../stores/redux/store';
import { setDataMode } from '../../stores/redux/slices/dataModeSlice'; 
import { DATAMODE_VOLUME, DATAMODE_DENSITY, DATAMODE_CHANGE } from '../../stores/redux/slices/dataModeSlice'; 
import SideBarDataGrid from './SideBarDataGrid';
import TabDataBar from './TabDataBar';
import SideBarToggleButton from './SideBarToggleButton';
import './SideBar.css';
import TabSourceBar from './TabSourceBar';
import { toggleSidebar, setSidebarHidden } from '../../stores/redux/slices/sideBarSlice';
import { setInfoBoxVisibility } from '../../stores/redux/slices/infoBoxSlice';

const SideBar: React.FC = () => {
  const isMobile = useSelector((state: RootState) => state.mobile.isMobile);
  const isInfoBoxVisible = useSelector((state: RootState) => state.infoBox.isVisible);
  const isSideBarHidden = useSelector((state: RootState) => state.sidebar.isHidden);
  const [activeTab, setActiveTab] = useState<string>('tabVolume');
  const dispatch = useDispatch();

  useEffect(() => {
    setActiveTab('tabVolume');
    dispatch(setDataMode(DATAMODE_VOLUME));
    dispatch(setSidebarHidden(isMobile));
  }, [dispatch, isMobile]); 
  
  const handleTabDataClick = (tab: string) => {
    switch (tab) {
      case 'tabVolume': dispatch(setDataMode(DATAMODE_VOLUME)); break;
      case 'tabDensity': dispatch(setDataMode(DATAMODE_DENSITY)); break;
      case 'tabChange': dispatch(setDataMode(DATAMODE_CHANGE)); break;
      default: dispatch(setDataMode(DATAMODE_VOLUME)); break;
    }
    setActiveTab(tab);
  };

  const toggleSidebarHandler = () => {
    if(isMobile && isSideBarHidden && isInfoBoxVisible) {
      dispatch(setInfoBoxVisibility(false));
    }
    dispatch(toggleSidebar());
  };

  return (
    <>
      <div className={`sidebar ${isSideBarHidden ? 'hidden' : ''}`}>
        <TabSourceBar />
        <TabDataBar activeTab={activeTab} onTabClick={handleTabDataClick} />
        <SideBarDataGrid activeTab={activeTab} />
      </div>
      <SideBarToggleButton isHidden={isSideBarHidden} toggleSidebar={toggleSidebarHandler} />
    </>
  );
};

export default SideBar;