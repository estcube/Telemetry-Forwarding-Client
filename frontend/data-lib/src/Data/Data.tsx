import * as React from 'react';
import LocationData from './LocationData';
import SatelliteData from './SatelliteData';

/**
 * Component for displaying satellite data
 */
export default class Data extends React.Component {
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
