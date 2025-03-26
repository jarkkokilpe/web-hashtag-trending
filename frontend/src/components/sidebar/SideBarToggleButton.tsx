import React from 'react';

interface SideBarToggleButtonProps {
  isHidden: boolean;
  toggleSidebar: () => void;
}

const SideBarToggleButton: React.FC<SideBarToggleButtonProps> = ({ isHidden, toggleSidebar }) => {
  return (
    <button
      className={`sidebar-toggle ${isHidden ? 'hidden' : ''}`}
      onClick={toggleSidebar}
    >
      {isHidden ? '>' : '<'}
    </button>
  );
};

export default SideBarToggleButton;