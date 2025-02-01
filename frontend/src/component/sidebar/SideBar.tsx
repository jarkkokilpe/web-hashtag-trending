import React, { useState } from 'react';
import useVisibleBubblesStore from '../../stores/useVisibleBubblesStore';
import { getIxOfInterest } from '../../utils/stats';
import './SideBar.css';

const SideBar: React.FC = () => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('tab1');
  const { visibleBubbles } = useVisibleBubblesStore();

  const volumeSortedBubbles = [...visibleBubbles].sort((a, b) => b.totalvolume - a.totalvolume);
  const rateSortedBubbles = [...visibleBubbles].sort((a, b) => getIxOfInterest(b) - getIxOfInterest(a));

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleSidebar = () => {
    setIsHidden(!isHidden);
  };

  const topVolumeList = volumeSortedBubbles.map((region, i) => {
    return (
      <p key={i}>
        {`${region.name} (${region.totalvolume})`}
      </p>
    );
  });

  const topRateList = rateSortedBubbles.map((region, i) => {
    return (
      <p key={i}>
        {`${region.name} ${getIxOfInterest(region)}`}
      </p>
    );
  });

  return (
    <>
      <div className={`sidebar ${isHidden ? 'hidden' : ''}`}>
        <div className="tab-bar">
          <button 
            className={`tab ${activeTab === 'tab1' ? 'active' : ''}`}
            onClick={() => handleTabClick('tab1')}
          >
            Volume
          </button>
          <button 
            className={`tab ${activeTab === 'tab2' ? 'active' : ''}`}
            onClick={() => handleTabClick('tab2')}
          >
            Rate
          </button>
        </div>
        <div className={`tab-content ${activeTab === 'tab1' ? 'active' : ''}`}>
          <h2>Top volume areas</h2>
          {topVolumeList}
        </div>
        <div className={`tab-content ${activeTab === 'tab2' ? 'active' : ''}`}>
          <h2>Top rate areas</h2>
          {topRateList}
        </div>
        
      </div>
      <button 
        className={`sidebar-toggle ${isHidden ? 'hidden' : ''}`}
        onClick={toggleSidebar}
      >
        {isHidden ? '>' : '<'}
      </button>
    </>
  );
};

export default SideBar;