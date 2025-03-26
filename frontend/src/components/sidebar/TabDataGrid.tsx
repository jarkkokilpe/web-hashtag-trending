import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface TabDataGridProps {
  rows: any[];
  columns: GridColDef[];
  activeTab: string;
  tabName: string;
  dataGridStyles: object;
  onRowClick: (params: any) => void;
}

const TabDataGrid: React.FC<TabDataGridProps> = ({ rows, columns, activeTab, tabName, dataGridStyles, onRowClick }) => {
  return (
    <div className={`tab-content ${activeTab === tabName ? 'active' : ''}`}>
      <div className="data-grid-container">
        <DataGrid
          rows={rows}
          columns={columns}
          sx={dataGridStyles}
          onRowClick={onRowClick}
        />
      </div>
    </div>
  );
};

export default TabDataGrid;