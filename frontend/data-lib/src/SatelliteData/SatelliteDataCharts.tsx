import React from 'react';
// @ts-ignore
// eslint-disable-next-line no-unused-vars
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
// @ts-ignore
import { Typography, Paper } from '@material-ui/core';

type MyProps = {classes: any};

const styles = ((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    sampleImage: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
      width: '100%',
      height: 'auto'
    },
    paper: {
      width: 'auto',
      overflowX: 'auto',
      margin: theme.spacing(3,1,2,1),
      border: 'solid',
      borderWidth: 0.5
    },
  })
);

class SatelliteDataCharts extends React.Component<MyProps> {

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant='body1'>Sample responsive chart/picture</Typography>
        <Paper className={classes.paper}>
          <img className={classes.sampleImage} src="https://en.es-static.us/upl/2019/05/spacewalks-chart.jpg"
            alt="sampleGraph"/>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(SatelliteDataCharts);