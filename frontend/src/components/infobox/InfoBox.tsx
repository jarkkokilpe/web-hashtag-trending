import React from 'react';
import { AreaData } from '../../types/interfaces';
import { getIxOfInterest } from '../../utils/stats';
import './InfoBox.css';

interface InfoBoxProps {
  onClose: () => void;
  isVisible: boolean;
  inputData?: AreaData | null;
}
//<li>{`Top mention: ${inputData?.hashtag.hashstr} (${inputData?.hashtag?.count?.toFixed(0)})`}</li>
const InfoBox: React.FC<InfoBoxProps> = ({ onClose, isVisible, inputData }) => {
  return (
    <div className={`infoBoxContainer ${isVisible ? 'visible' : ''}`}>
      <div className="infoBoxHeader">
        <button className="closeButton" onClick={onClose}>x</button>
        <ul className="infoText">
          <li>{`Name: ${inputData?.name}`}</li>
          <li>{`Code: ${inputData?.code}`}</li>
          <li>{`IxOI: ${getIxOfInterest(inputData)}`}</li>
          <li>{`Pop.: ${inputData?.value}`}</li>
          <li>{`Subs.: ${inputData?.subscriptions}`}</li>
          <li>{`Volume: ${inputData?.totalvolume.toFixed(0)}`}</li>
        </ul>
        <p />
        <p>Top mentions:</p>
      </div>
      <div className="infoBoxContent">
        <ul className="infoText">
          {inputData?.trends.map((trend, idx) => (
            <React.Fragment key={idx}>
              {trend.link ? (
                <li>
                  <a href={trend.link} target="_blank" rel="noopener noreferrer">
                    {`${trend.name} (${trend.tweet_volume})`}
                  </a>
                </li>
              ) : (
                <li>{`${trend.name} (${trend.tweet_volume})`}</li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InfoBox;