import React, { useState } from 'react';
import './SideBar.css';

const SideBar: React.FC = () => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('tab1');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleSidebar = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      <div className={`sidebar ${isHidden ? 'hidden' : ''}`}>
        <div className="tab-bar">
          <button 
            className={`tab ${activeTab === 'tab1' ? 'active' : ''}`}
            onClick={() => handleTabClick('tab1')}
          >
            Region
          </button>
          <button 
            className={`tab ${activeTab === 'tab2' ? 'active' : ''}`}
            onClick={() => handleTabClick('tab2')}
          >
            #
          </button>
        </div>
        <div className={`tab-content ${activeTab === 'tab1' ? 'active' : ''}`}>
          <h2>Top rate areas</h2>
          <p>#Uruguay</p>
        </div>
        <div className={`tab-content ${activeTab === 'tab2' ? 'active' : ''}`}>
          <h2>Top subjects</h2>
          <p>#stuff</p>
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