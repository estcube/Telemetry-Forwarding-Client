import * as React from 'react';

interface DataProps {
  decodedPackets: { [key: string]: { [key: string]: any }[] };
  telemetryConfiguration: { [key: string]: { [key: string]: any }[] };
}

/**
 * Component for displaying satellite data (graphs and tables)
 */
export default class Data extends React.Component<DataProps> {
  render() {
    return (
      <div>
        <iframe
          title="grafana"
          src="http://localhost:3000/d-solo/P3JF_FpMz/sqllite-copy?orgId=2&theme=light&panelId=2"
          width="450"
          height="200"
        />
      </div>
    );
  }
}
