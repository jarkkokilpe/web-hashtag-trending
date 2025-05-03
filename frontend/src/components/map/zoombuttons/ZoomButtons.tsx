import React from 'react';
import './ZoomButtons.css';

interface ZoomButtonsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const ZoomButtons: React.FC<ZoomButtonsProps> = ({ onZoomIn, onZoomOut }) => {
  return (
    <div className="zoom-button-container">
      <button
        className="zoom-button"
        onClick={() => {
          onZoomIn();
        }}
        aria-label="Zoom In"
      >
        <span className="zoom-icon">+</span>
      </button>
      <button
        className="zoom-button"
        onClick={() => {
          onZoomOut();
        }}
        aria-label="Zoom Out"
      >
        <span className="zoom-icon">−</span>
      </button>
    </div>
  );
};

export default ZoomButtons;