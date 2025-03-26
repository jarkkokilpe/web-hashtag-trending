import React from 'react';
import { APP_NAME } from '../../config/strings'
import './Header.css';
import { useMobile } from '../../contexts/MobileContext'; // Import the useMobile hook

const Header: React.FC = () => {
  const { isMobile } = useMobile(); // Access the isMobile state

  return (
    <header className="sticky-header">
      {isMobile ? <h3>{APP_NAME}</h3> : <h2>{APP_NAME}</h2>}
    </header>
  );
};

export default Header;