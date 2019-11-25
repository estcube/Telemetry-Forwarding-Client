import * as React from 'react';
import LocationData from './LocationData';
import SatelliteData from './SatelliteData';

interface DataProps {
  decodedPackets: { [key: string]: { [key: string]: any }[] };
  telemetryConfiguration: { [key: string]: { [key: string]: any }[] };
}

/**
 * Component for displaying satellite data (graphs and tables)
 */
export default class Data extends React.Component<DataProps> {
  render() {
    const { decodedPackets, telemetryConfiguration } = this.props;
    return (
      <div>
        <div className="time-location-map" data-testid="time-location-map">
          <LocationData />
        </div>
        <div className="satellite-data" data-testid="satellite-data">
          <SatelliteData decodedPackets={decodedPackets} telemetryConfiguration={telemetryConfiguration} />
        </div>
      </div>
    );
  }
}
