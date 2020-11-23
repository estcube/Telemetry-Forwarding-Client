import * as React from 'react';

/**
 * Component for displaying satellite data (graphs and tables)
 */
export default class Data extends React.Component {
  render() {
    return (
      <div>
        <iframe
          title="grafana"
          src="http://localhost:3000/d/P3JF_FpMz/estcube?orgId=2&theme=light"
          width="100%"
          height="2000"
        />
      </div>
    );
  }
}
