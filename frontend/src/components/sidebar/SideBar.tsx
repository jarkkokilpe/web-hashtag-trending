import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useVisibleBubblesStore from '../../stores/useVisibleBubblesStore';
import { getIxOfInterest as getPostDensity, getTrendDiff2Perc } from '../../utils/stats';
import useDataModeStore, { DATAMODE_VOLUME, DATAMODE_DENSITY, DATAMODE_CHANGE } from '../../stores/useDataModeStore';
import { 
  SIDEBAR_HEADER_VOLUME, 
  SIDEBAR_HEADER_DENSITY, 
  SIDEBAR_HEADER_CHANGE,
  SIDEBAR_TOGGLEBTN_VOLUME,
  SIDEBAR_TOGGLEBTN_DENSITY, 
  SIDEBAR_TOGGLEBTN_CHANGE,
  SIDEBAR_DATAGRID_OBJECT_HEADER,
  SIDEBAR_DATAGRID_DESCR_VOLUME,
  SIDEBAR_DATAGRID_DESCR_DENSITY,
  SIDEBAR_DATAGRID_DESCR_CHANGE,
} from '../../config/strings';
import './SideBar.css';

const columnsVolume: GridColDef[] = [
  { field: 'name', headerName: SIDEBAR_DATAGRID_OBJECT_HEADER, width: 150 },
  { 
    field: 'totalvolume', 
    headerName: SIDEBAR_DATAGRID_DESCR_VOLUME, 
    width: 150,
    valueFormatter: (value?: number) => {
      if (value == null) {
        return '';
      }
      return `${value.toFixed(0)}`;
    },
  },
];

const columnsDensity: GridColDef[] = [
  { field: 'name', headerName: SIDEBAR_DATAGRID_OBJECT_HEADER, width: 150 },
  { 
    field: 'ixoi', 
    headerName: SIDEBAR_DATAGRID_DESCR_DENSITY, 
    width: 150,
    valueFormatter: (value?: number) => {
      if (value == null) {
        return '';
      }
      return `${value.toFixed(1)}`;
    },
  },
];

const columnsChange: GridColDef[] = [
  { field: 'name', headerName: SIDEBAR_DATAGRID_OBJECT_HEADER, width: 150 },
  { 
    field: 'change', 
    headerName: SIDEBAR_DATAGRID_DESCR_CHANGE, 
    width: 150,
    valueFormatter: (value?: number) => {
      if (value == null) {
        return '';
      }
      return `${value.toFixed(2)}`;
    },
  },
];

const dataGridStyles = {
  '& .MuiDataGrid-root': {
    backgroundColor: '#444444', // Background color of the DataGrid
  },
  '& .MuiDataGrid-cell': {
    color: '#c5d3ee', // Text color of the cells
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#444444', // Background color of the header
    color: '#333333', // Text color of the header
  },
  '& .MuiDataGrid-columnSeparator': {
    display: 'none', // Remove column separators if desired
  },
};

const SideBar: React.FC = () => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('tabVolume');
  const { visibleBubbles } = useVisibleBubblesStore();
  const { setDataMode: setMode } = useDataModeStore();

  const volumeSortedBubbles = [...visibleBubbles].sort((a, b) => b.totalvolume - a.totalvolume);
  const densitySortedBubbles = [...visibleBubbles].sort((a, b) => getPostDensity(b) - getPostDensity(a));
  const changeSortedBubbles = [...visibleBubbles].sort((a, b) => getTrendDiff2Perc(b) - getTrendDiff2Perc(a));

  useEffect(() => {
    setActiveTab('tabVolume');
    setMode(DATAMODE_VOLUME);
  }, [setMode]); 

  const handleTabClick = (tab: string) => {
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

  // Map sortedBubbles to rows for DataGrid
  const volumeRows = volumeSortedBubbles.map((region, i) => ({
    id: i,
    name: region.name,
    totalvolume: region.totalvolume ?? 0,
  }));

  const densityRows = densitySortedBubbles.map((region, i) => ({
    id: i,
    name: region.name,
    ixoi: getPostDensity(region) ?? 0,
  }));
  
  const changeRows = changeSortedBubbles.map((region, i) => ({
    id: i,
    name: region.name,
    change: getTrendDiff2Perc(region) ?? 0,
  }));
  
  return (
    <>
      <div className={`sidebar ${isHidden ? 'hidden' : ''}`}>
        <div className="tab-bar">
          <button 
            className={`tab ${activeTab === 'tabVolume' ? 'active' : ''}`}
            onClick={() => handleTabClick('tabVolume')}
          >
            {SIDEBAR_TOGGLEBTN_VOLUME}
          </button>
          <button 
            className={`tab ${activeTab === 'tabDensity' ? 'active' : ''}`}
            onClick={() => handleTabClick('tabDensity')}
          >
            {SIDEBAR_TOGGLEBTN_DENSITY}
          </button>
          <button 
            className={`tab ${activeTab === 'tabChange' ? 'active' : ''}`}
            onClick={() => handleTabClick('tabChange')}
          >
            {SIDEBAR_TOGGLEBTN_CHANGE}
          </button>
        </div>
        <div className={`tab-content ${activeTab === 'tabVolume' ? 'active' : ''}`}>
          <h3>{SIDEBAR_HEADER_VOLUME}</h3>
          <DataGrid rows={volumeRows} columns={columnsVolume} sx={dataGridStyles} />
        </div>
        <div className={`tab-content ${activeTab === 'tabDensity' ? 'active' : ''}`}>
          <h3>{SIDEBAR_HEADER_DENSITY}</h3>
          <DataGrid rows={densityRows} columns={columnsDensity} sx={dataGridStyles} />
        </div>
        <div className={`tab-content ${activeTab === 'tabChange' ? 'active' : ''}`}>
          <h3>{SIDEBAR_HEADER_CHANGE}</h3>
          <DataGrid rows={changeRows} columns={columnsChange} sx={dataGridStyles} />
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