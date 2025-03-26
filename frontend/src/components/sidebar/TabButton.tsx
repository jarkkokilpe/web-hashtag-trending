import React from 'react';

interface TabButtonProps {
  activeTab: string;
  tabName: string;
  label: string;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ activeTab, tabName, label, onClick }) => {
  return (
    <button
      className={`tab ${activeTab === tabName ? 'active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;