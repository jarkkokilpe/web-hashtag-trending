import React from 'react';
import { APP_NAME } from '../../config/strings'
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="sticky-header">
      <h1>{APP_NAME}</h1>
    </header>
  );
};

export default Header;