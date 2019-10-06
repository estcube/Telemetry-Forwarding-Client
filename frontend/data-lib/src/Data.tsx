import * as React from 'react';
import LocationData from './LocationData';
import SatelliteData from './SatelliteData';

export class Data extends React.Component {
  fun() {

  }
  render() {
    return (
      <div>
        <div className="time-location-map">
          <LocationData />
        </div>
        <div className="satellite-data">
          <SatelliteData />
        </div>
      </div>    
    );
  }
}