import React from 'react';

interface TabButtonProps {
  activeTab: string;
  tabName: string;
  label: string;
  disabled: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ activeTab, tabName, label, disabled, onClick }) => {
  return (
    <button
      className={`tab ${activeTab === tabName ? 'active' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default TabButton;