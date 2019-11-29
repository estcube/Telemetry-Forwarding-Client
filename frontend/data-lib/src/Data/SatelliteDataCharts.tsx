import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';
import SatelliteDataChart from './SatelliteDataChart';

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
 * Component for showing data charts. Gets data and configuration as props
 */
class SatelliteDataCharts extends React.Component<SatelliteDataChartsProps> {
  renderDataCharts() {
    const children = [];
    const { decodedPackets, telemetryConfiguration } = this.props;
    const { graphs } = telemetryConfiguration;
    for (let i = 0; i < graphs.length; i += 1) {
      children.push(
        <SatelliteDataChart
          key={i}
          graphInfo={graphs[i]}
          decodedPackets={decodedPackets}
          telemetryConfiguration={telemetryConfiguration}
        />
      );
    }
    if (children.length === 0) {
      children.push(<></>);
    }
    return children;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.paper}>{this.renderDataCharts()}</div>
      </div>
    );
  }
}

export default withStyles(styles)(SatelliteDataCharts);
