import React from 'react';
import { AreaData } from '../../types/interfaces';
import { getIxOfInterest } from '../../utils/stats';
import './InfoBox.css';

interface InfoBoxProps {
  onClose: () => void;
  isVisible: boolean;
  inputData?: AreaData | null;
}

const InfoBox: React.FC<InfoBoxProps> = ({ onClose, isVisible, inputData }) => {
  return (
    <div className={`infoBoxContainer ${isVisible ? 'visible' : ''}`}>
      <button className="closeButton" onClick={onClose}>X</button>
      <ul className="infoText">
        <li>{`Name: ${inputData?.name}`}</li>
        <li>{`Code: ${inputData?.code}`}</li>
        <li>{`IxOI: ${getIxOfInterest(inputData)}`}</li>
        <li>{`Pop.: ${inputData?.value}`}</li>
        <li>{`Volume: ${inputData?.totalvolume}`}</li>
        <li>{`Top mention: ${inputData?.hashtag.hashstr} (${inputData?.hashtag.count})`}</li>
      </ul>
    </div>
  );
};

export default InfoBox;