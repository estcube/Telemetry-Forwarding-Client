import React from 'react';
import { Box, Paper } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';
import SatelliteDataCharts from './SatelliteDataCharts';
import SatelliteDataTable from './SatelliteDataTable';

const styles = (theme: Theme) =>
  createStyles({
    paperLeft: {
      padding: 1,
      margin: theme.spacing(0, 1, 2, 2),
      width: '50%',
      border: '1px solid'
    },
    paperRight: {
      padding: 1,
      // Top, right, bottom, left
      margin: theme.spacing(0, 2, 2, 1),
      width: '50%',
      border: '1px solid'
    },
    box: {
      position: 'absolute'
    }
  });

interface SatelliteDataProps extends WithStyles<typeof styles> {
  decodedPackets: { [key: string]: { [key: string]: any }[] };
  telemetryConfiguration: { [key: string]: { [key: string]: any }[] };
}

/**
 * Component for displaying tables and charts
 */
class SatelliteData extends React.Component<SatelliteDataProps> {
  render() {
    const { classes, decodedPackets, telemetryConfiguration } = this.props;

    return (
      <div>
        <Box display="flex" flexDirection="row" width="100%" className={classes.box}>
          <Paper className={classes.paperLeft}>
            <SatelliteDataCharts decodedPackets={decodedPackets} telemetryConfiguration={telemetryConfiguration} />
          </Paper>
          <Paper className={classes.paperRight}>
            <SatelliteDataTable decodedPackets={decodedPackets} telemetryConfiguration={telemetryConfiguration} />
          </Paper>
        </Box>
      </div>
    );
  }
}

export default withStyles(styles)(SatelliteData);
