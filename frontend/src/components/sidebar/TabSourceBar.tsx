import React, { useState } from 'react';
import TabButton from './TabButton';
import useDataSourceStore, { DATASOURCE_MOCK, DATASOURCE_XAPI, DATASOURCE_REDDIT } from '../../stores/useDataSourceStore';
import { 
  SIDEBAR_SOURCEBTN_REDDIT,
  SIDEBAR_SOURCEBTN_MOCK, 
  SIDEBAR_SOURCEBTN_XAPI,
} from '../../config/strings';

const TabSourceBar: React.FC = () => {
  const { setDataSource: setSource } = useDataSourceStore();
  const [activeTab, setActiveTab] = useState<string>(DATASOURCE_REDDIT);
  
  const handleTabDataClick = (tab: string) => {
    switch (tab) {
      case DATASOURCE_REDDIT: setSource(DATASOURCE_REDDIT); break;
      case DATASOURCE_MOCK: setSource(DATASOURCE_MOCK); break;
      case DATASOURCE_XAPI: setSource(DATASOURCE_XAPI); break;
      default: setSource(DATASOURCE_REDDIT); break;
    }
    setActiveTab(tab);
  };
  
  return (
    <div className="tab-sourcebar">
      <TabButton
        label={SIDEBAR_SOURCEBTN_REDDIT}
        onClick={() => handleTabDataClick(DATASOURCE_REDDIT)}
        activeTab={activeTab}
        tabName={DATASOURCE_REDDIT}
        disabled={false}
      />
      <TabButton
        label={SIDEBAR_SOURCEBTN_MOCK}
        onClick={() => handleTabDataClick(DATASOURCE_MOCK)}
        activeTab={activeTab}
        tabName={DATASOURCE_MOCK}
        disabled={false}
      />
      <TabButton
        label={SIDEBAR_SOURCEBTN_XAPI}
        onClick={() => handleTabDataClick(DATASOURCE_XAPI)}
        activeTab={activeTab}
        tabName={DATASOURCE_XAPI}
        disabled={true}
      />
    </div>
  );
};

export default TabSourceBar;