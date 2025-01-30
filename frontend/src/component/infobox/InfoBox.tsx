import React from 'react';
import { BubbleData } from '../bubbles/Bubbles';
import { getIxOfInterest } from '../../utils/stats';
import './InfoBox.css';

interface InfoBoxProps {
  onClose: () => void;
  isVisible: boolean;
  inputData?: BubbleData | null;
}

const InfoBox: React.FC<InfoBoxProps> = ({ onClose, isVisible, inputData }) => {
  return (
    <div className={`infoBoxContainer ${isVisible ? 'visible' : ''}`}>
      <button className="closeButton" onClick={onClose}>X</button>
      <ul className="infoText">
        <li>{`Name: ${inputData?.name}`}</li>
        <li>{`Code: ${inputData?.code}`}</li>
        <li>{`Pop.: ${inputData?.value}`}</li>
        <li>{`Volume: ${inputData?.totalvolume}`}</li>
        <li>{`Top mention: ${inputData?.hash.hashstr} (${inputData?.hash.count})`}</li>
        <li>{`IxOI: ${getIxOfInterest(inputData)}`}</li>
      </ul>
    </div>
  );
};

export default InfoBox;