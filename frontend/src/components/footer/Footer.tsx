import React from 'react';
import { APP_NAME } from '../../config/strings'
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/redux/store';
import './Footer.css';

const Footer: React.FC = () => {
  const isMobile = useSelector((state: RootState) => state.mobile.isMobile);

  return (
    <footer className="app-footer">
       {
        isMobile ? 
        <p>© {new Date().getFullYear()} {APP_NAME} - Reddit Data API </p> : 
        <p>© {new Date().getFullYear()} {APP_NAME} - Powered by Reddit Data API for non-commercial trend visualization. </p>
       }
    </footer>
  );
};

export default Footer;