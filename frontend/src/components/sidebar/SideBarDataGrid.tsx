import React from 'react';
import TabDataGrid from './TabDataGrid';
// import useVisibleBubblesStore from '../../stores/zustand/useVisibleBubblesStore'; // zustand approach
import { useSelector } from 'react-redux'; // redux approach
import { RootState } from '../../stores/redux/store'; // redux approach
import { useZoomContext } from '../../contexts/ZoomContext'; 
import { GridColDef } from '@mui/x-data-grid';
import { getIxOfInterest as getPostDensity, getTrendDiff2Perc } from '../../utils/stats';
import { dataGridStyles } from './DataGridConfigs';
import { 
  SIDEBAR_DATAGRID_DESCR_CHANGE,
  SIDEBAR_DATAGRID_DESCR_DENSITY,
  SIDEBAR_DATAGRID_DESCR_VOLUME,
  SIDEBAR_DATAGRID_OBJECT_HEADER,
} from '../../config/strings';

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
  { field: 'name', headerName: SIDEBAR_DATAGRID_OBJECT_HEADER, width: 130 },
  createColumnDef({
    field: 'totalvolume',
    headerName: SIDEBAR_DATAGRID_DESCR_VOLUME,
    width: 80,
    decimalPlaces: 0,
  }),
];

const columnsDensity: GridColDef[] = [
  { field: 'name', headerName: SIDEBAR_DATAGRID_OBJECT_HEADER, width: 130 },
  createColumnDef({
    field: 'ixoi',
    headerName: SIDEBAR_DATAGRID_DESCR_DENSITY,
    width: 80,
    decimalPlaces: 1,
  }),
];

const columnsChange: GridColDef[] = [
  { field: 'name', headerName: SIDEBAR_DATAGRID_OBJECT_HEADER, width: 130 },
  createColumnDef({
    field: 'change',
    headerName: SIDEBAR_DATAGRID_DESCR_CHANGE,
    width: 80,
    decimalPlaces: 2,
  }),
];

interface SideBarDataGridProps {
  activeTab: string;
}

const SideBarDataGrid: React.FC<SideBarDataGridProps> = ({ activeTab }) => {
  const { zoomToArea } = useZoomContext();
  // const { visibleBubbles } = useVisibleBubblesStore(); // zustand approach
  const visibleBubbles = useSelector((state: RootState) => state.visibleBubbles.visibleBubbles); // redux approach
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
    </>
  );
};

export default SideBarDataGrid;