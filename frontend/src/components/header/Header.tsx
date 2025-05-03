import React from 'react';
import { APP_NAME } from '../../config/strings'
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/redux/store';
import './Header.css';

const Header: React.FC = () => {
  const isMobile = useSelector((state: RootState) => state.mobile.isMobile);

  return (
    <header className="sticky-header">
      {isMobile ? <h3>{APP_NAME}</h3> : <h2>{APP_NAME}</h2>}
    </header>
  );
};

export default Header;