import * as React from 'react';
import LocationData from './LocationData/LocationData';
import SatelliteData from './SatelliteData/SatelliteData';

/**
 * Component for displaying satellite data
 */
export class Data extends React.Component {

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