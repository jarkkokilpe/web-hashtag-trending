import React, { useEffect, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { useZoomContext } from '../../contexts/ZoomContext'; 
import useVisibleBubblesStore from '../../stores/useVisibleBubblesStore';
import { getIxOfInterest as getPostDensity, getTrendDiff2Perc } from '../../utils/stats';
import useDataModeStore, { DATAMODE_VOLUME, DATAMODE_DENSITY, DATAMODE_CHANGE } from '../../stores/useDataModeStore';
import { useMobile } from '../../contexts/MobileContext';
import TabDataGrid from './TabDataGrid';
import TabButton from './TabButton';
import SideBarToggleButton from './SideBarToggleButton';
import { 
  SIDEBAR_TOGGLEBTN_VOLUME,
  SIDEBAR_TOGGLEBTN_DENSITY, 
  SIDEBAR_TOGGLEBTN_CHANGE,
  SIDEBAR_DATAGRID_OBJECT_HEADER,
  SIDEBAR_DATAGRID_DESCR_VOLUME,
  SIDEBAR_DATAGRID_DESCR_DENSITY,
  SIDEBAR_DATAGRID_DESCR_CHANGE,
} from '../../config/strings';
import './SideBar.css';

interface ColumnConfig {
  field: string;
  headerName: string;
  width: number;
  decimalPlaces?: number;
}

const createColumnDef = (config: ColumnConfig): GridColDef => {
  return {
    field: config.field,
    headerName: config.headerName,
    width: config.width,
    valueFormatter: (value?: number) => {
      if (value == null) {
        return '';
      }
      return `${value.toFixed(config.decimalPlaces ?? 0)}`;
    },
  };
};

const columnsVolume: GridColDef[] = [
  { field: 'name', headerName: SIDEBAR_DATAGRID_OBJECT_HEADER, width: 150 },
  createColumnDef({
    field: 'totalvolume',
    headerName: SIDEBAR_DATAGRID_DESCR_VOLUME,
    width: 150,
    decimalPlaces: 0,
  }),
];

const columnsDensity: GridColDef[] = [
  { field: 'name', headerName: SIDEBAR_DATAGRID_OBJECT_HEADER, width: 150 },
  createColumnDef({
    field: 'ixoi',
    headerName: SIDEBAR_DATAGRID_DESCR_DENSITY,
    width: 150,
    decimalPlaces: 1,
  }),
];

const columnsChange: GridColDef[] = [
  { field: 'name', headerName: SIDEBAR_DATAGRID_OBJECT_HEADER, width: 150 },
  createColumnDef({
    field: 'change',
    headerName: SIDEBAR_DATAGRID_DESCR_CHANGE,
    width: 150,
    decimalPlaces: 2,
  }),
];

const dataGridStyles = {
  '& .MuiDataGrid-root': {
    backgroundColor: '#444444',
  },
  '& .MuiDataGrid-cell': {
    color: '#c5d3ee',
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#444444',
    color: '#333333',
  },
  '& .MuiDataGrid-columnSeparator': {
    display: 'none',
  },
  '& .MuiTablePagination-root': {
    color: '#c5d3ee', // Change the text color of pagination controls
  },
  '& .MuiTablePagination-actions button': {
    color: '#c5d3ee', // Change the color of pagination buttons
  },
};

const SideBar: React.FC = () => {
  const { isMobile } = useMobile();
  const { zoomToArea } = useZoomContext();
  const [isHidden, setIsHidden] = useState<boolean>(isMobile);
  const [activeTab, setActiveTab] = useState<string>('tabVolume');
  const { visibleBubbles } = useVisibleBubblesStore();
  const { setDataMode: setMode } = useDataModeStore();

  useEffect(() => {
    setActiveTab('tabVolume');
    setMode(DATAMODE_VOLUME);
  }, [setMode]); 

  const volumeSortedBubbles = [...visibleBubbles].sort((a, b) => b.totalvolume - a.totalvolume);
  const densitySortedBubbles = [...visibleBubbles].sort((a, b) => getPostDensity(b) - getPostDensity(a));
  const changeSortedBubbles = [...visibleBubbles].sort(
    (a, b) => Math.abs(getTrendDiff2Perc(b)) - Math.abs(getTrendDiff2Perc(a))
  );
  
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

  const handleRowClick = (params: any) => {
  const countryName = params.row.name; // Get the country name from the clicked row
    const countryFeature = visibleBubbles.find((bubble) => bubble.name === countryName); // Find the country feature
    console.log('Country Feature:', countryFeature);
    if (countryFeature) {
      console.log('countryFeature.code:', countryFeature.code);
      zoomToArea(countryFeature.code); // Center the map on the selected country
    }
  };

  return (
    <>
      <div className={`sidebar ${isHidden ? 'hidden' : ''}`}>
        <div className="tab-bar">
        <TabButton
          activeTab={activeTab}
          tabName="tabVolume"
          label={SIDEBAR_TOGGLEBTN_VOLUME}
          onClick={() => handleTabClick('tabVolume')}
        />
        <TabButton
          activeTab={activeTab}
          tabName="tabDensity"
          label={SIDEBAR_TOGGLEBTN_DENSITY}
          onClick={() => handleTabClick('tabDensity')}
        />
        <TabButton
          activeTab={activeTab}
          tabName="tabChange"
          label={SIDEBAR_TOGGLEBTN_CHANGE}
          onClick={() => handleTabClick('tabChange')}
        />
        </div>
        <TabDataGrid
          rows={volumeRows}
          columns={columnsVolume}
          activeTab={activeTab}
          tabName="tabVolume"
          dataGridStyles={dataGridStyles}
          onRowClick={handleRowClick}
        />
        <TabDataGrid
          rows={densityRows}
          columns={columnsDensity}
          activeTab={activeTab}
          tabName="tabDensity"
          dataGridStyles={dataGridStyles}
          onRowClick={handleRowClick}
        />
        <TabDataGrid
          rows={changeRows}
          columns={columnsChange}
          activeTab={activeTab}
          tabName="tabChange"
          dataGridStyles={dataGridStyles}
          onRowClick={handleRowClick}
        />
        
      </div>
      <SideBarToggleButton isHidden={isHidden} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default SideBar;