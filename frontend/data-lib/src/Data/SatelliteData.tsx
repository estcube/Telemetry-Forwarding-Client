import React from 'react';
import { Box, Paper } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';
import SatelliteDataCharts from './SatelliteDataCharts';
import SatelliteDataTables from './SatelliteDataTables';

const styles = ((theme: Theme) => createStyles({
  paperLeft: {
    padding: 1,
    // Top, right, bottom, left
    margin: theme.spacing(0, 1, 0, 2),
    width: '50%',
  },
  paperRight: {
    padding: 1,
    // Top, right, bottom, left
    margin: theme.spacing(0, 2, 0, 1),
    width: '50%',
  },
  box: {
    position: 'absolute',
  },
})
);

/**
 * Component for displaying tables and charts
 */
class SatelliteData extends React.Component<WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Box display="flex" flexDirection="row" width="100%" className={classes.box}>
          <Paper className={classes.paperLeft}>
            <SatelliteDataCharts />
          </Paper>
          <Paper className={classes.paperRight}>
            <SatelliteDataTables />
          </Paper>
        </Box>
      </div>
    );
  }
}

export default withStyles(styles)(SatelliteData);
