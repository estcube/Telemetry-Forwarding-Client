import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import { WithStyles } from '@material-ui/styles';

const styles = ((theme: Theme) => createStyles({
  root: {
    width: '100%',
  },
  sampleImage: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    width: '100%',
    height: 'auto',
  },
  paper: {
    width: 'auto',
    overflowX: 'auto',
    margin: theme.spacing(3, 1, 2, 1),
    border: 'solid',
    borderWidth: 0.5,
  },
})
);

/**
 * Component for showing data charts
 */
class SatelliteDataCharts extends React.Component<WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="body1">Sample responsive chart/picture</Typography>
        <Paper className={classes.paper}>
          <img
            className={classes.sampleImage}
            src="https://en.es-static.us/upl/2019/05/spacewalks-chart.jpg"
            alt="sampleGraph"
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(SatelliteDataCharts);
