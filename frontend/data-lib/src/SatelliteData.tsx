import React from 'react';
// @ts-ignore
import {Box} from '@material-ui/core';
// @ts-ignore
import {Paper} from '@material-ui/core';
// @ts-ignore
import { createStyles, makeStyles } from '@material-ui/core/styles';
import SatelliteDataCharts from './satelliteData/SatelliteDataCharts';
import SatelliteDataTables from './satelliteData/SatelliteDataTables';

const SatelliteData = () => {

  const useStyles = makeStyles(() =>
    createStyles({
      paper: {
        padding: 1,
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 2,
        marginTop: 1,
        width: '50%'
      },
      box: {
        position: 'absolute'
      }
    }),
  // console.log(window.innerWidth)
  );

  const classes = useStyles();
  return(
    <div>
      <Box display="flex" flexDirection="row" width="100%" className={classes.box}>
        <Paper className={classes.paper}>
          <SatelliteDataCharts />
        </Paper>
        <Paper className={classes.paper}>
          <SatelliteDataTables />
        </Paper>
      </Box>
    </div>
  );
};

export default SatelliteData;