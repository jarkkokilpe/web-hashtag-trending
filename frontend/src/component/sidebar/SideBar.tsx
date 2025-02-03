import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useVisibleBubblesStore from '../../stores/useVisibleBubblesStore';
import { getIxOfInterest } from '../../utils/stats';
import './SideBar.css';

const columnsVolume: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'totalvolume', headerName: 'Volume', width: 150 },
];

const columnsRate: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'interest', headerName: 'Interest', width: 150 },
];

const dataGridStyles = {
  '& .MuiDataGrid-root': {
    backgroundColor: '#444444', // Background color of the DataGrid
    borderRadius: 0, // Sharp corners
  },
  '& .MuiDataGrid-cell': {
    color: '#c5d3ee', // Text color of the cells
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#444444', // Background color of the header
    color: '#333333', // Text color of the header
    borderRadius: 0, // Sharp corners
  },
  '& .MuiDataGrid-columnSeparator': {
    display: 'none', // Remove column separators if desired
  },
};


const SideBar: React.FC = () => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('tab1');
  const { visibleBubbles } = useVisibleBubblesStore();

  const volumeSortedBubbles = [...visibleBubbles].sort((a, b) => b.totalvolume - a.totalvolume);
  const rateSortedBubbles = [...visibleBubbles].sort((a, b) => getIxOfInterest(b) - getIxOfInterest(a));

  useEffect(() => {
    setActiveTab('tabVolume');
  }, []); 

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleSidebar = () => {
    setIsHidden(!isHidden);
  };

  // Map sortedBubbles to rows for DataGrid
  const volumeRows = volumeSortedBubbles.map((region, i) => ({
    id: i,
    name: region.name,
    totalvolume: region.totalvolume,
  }));

  const rateRows = rateSortedBubbles.map((region, i) => ({
    id: i,
    name: region.name,
    interest: getIxOfInterest(region),
  }));

 /* const topVolumeList = volumeSortedBubbles.map((region, i) => {
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
  }); */

  return (
    <>
      <div className={`sidebar ${isHidden ? 'hidden' : ''}`}>
        <div className="tab-bar">
          <button 
            className={`tab ${activeTab === 'tabVolume' ? 'active' : ''}`}
            onClick={() => handleTabClick('tabVolume')}
          >
            Volume
          </button>
          <button 
            className={`tab ${activeTab === 'tabRate' ? 'active' : ''}`}
            onClick={() => handleTabClick('tabRate')}
          >
            Rate
          </button>
        </div>
        <div className={`tab-content ${activeTab === 'tabVolume' ? 'active' : ''}`}>
          <h2>Top volume areas</h2>
          <DataGrid rows={volumeRows} columns={columnsVolume} sx={dataGridStyles} />
        </div>
        <div className={`tab-content ${activeTab === 'tabRate' ? 'active' : ''}`}>
          <h2>Top rate areas</h2>
          <DataGrid rows={rateRows} columns={columnsRate} sx={dataGridStyles} />
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