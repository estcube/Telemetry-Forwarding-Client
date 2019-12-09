import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';
import SatelliteDataLineChart from './SatelliteDataLineChart';
import SatelliteDataEnumChart from './SatelliteDataEnumChart';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    paper: {
      width: 'auto',
      overflowX: 'auto',
      margin: theme.spacing(2, 1, 2, 1)
    }
  });

interface SatelliteDataChartsProps extends WithStyles<typeof styles> {
  decodedPackets: { [key: string]: { [key: string]: any }[] };
  telemetryConfiguration: { [key: string]: { [key: string]: any }[] };
}

/**
 * Component for rendering data charts. Gets data and configuration as props
 */
class SatelliteDataCharts extends React.Component<SatelliteDataChartsProps> {
  render() {
    const { classes, decodedPackets, telemetryConfiguration } = this.props;
    const { graphs } = telemetryConfiguration;

    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          {graphs.map((graph: any, index: number) => {
            if (graph.type === 'line') {
              return (
                <SatelliteDataLineChart
                  key={index}
                  graphInfo={graph}
                  decodedPackets={decodedPackets}
                  telemetryConfiguration={telemetryConfiguration}
                />
              );
            }
            if (graph.type === 'enum') {
              return (
                <SatelliteDataEnumChart
                  key={index}
                  graphInfo={graphs[index]}
                  decodedPackets={decodedPackets}
                  telemetryConfiguration={telemetryConfiguration}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SatelliteDataCharts);
