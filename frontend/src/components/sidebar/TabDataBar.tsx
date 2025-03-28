import React from 'react';
import TabButton from './TabButton';
import { 
  SIDEBAR_TOGGLEBTN_VOLUME,
  SIDEBAR_TOGGLEBTN_DENSITY, 
  SIDEBAR_TOGGLEBTN_CHANGE,
} from '../../config/strings';

interface TabDataBarProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const TabDataBar: React.FC<TabDataBarProps> = ({ activeTab, onTabClick }) => {
  return (
    <div className="tab-databar">
      <TabButton
        activeTab={activeTab}
        tabName="tabVolume"
        label={SIDEBAR_TOGGLEBTN_VOLUME}
        onClick={() => onTabClick('tabVolume')}
        disabled={false}
      />
      <TabButton
        activeTab={activeTab}
        tabName="tabDensity"
        label={SIDEBAR_TOGGLEBTN_DENSITY}
        onClick={() => onTabClick('tabDensity')}
        disabled={false}
      />
      <TabButton
        activeTab={activeTab}
        tabName="tabChange"
        label={SIDEBAR_TOGGLEBTN_CHANGE}
        onClick={() => onTabClick('tabChange')}
        disabled={false}
      />
    </div>
  );
};

export default TabDataBar;