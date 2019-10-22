import React from 'react';
// @ts-ignore
import {Box} from '@material-ui/core';
// @ts-ignore
import {Paper} from '@material-ui/core';
// @ts-ignore
// eslint-disable-next-line no-unused-vars
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SatelliteDataCharts from './SatelliteDataCharts';
import SatelliteDataTables from './SatelliteDataTables';

const SatelliteData = () => {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      paperLeft: {
        padding: 1,
        // Top, right, bottom, left
        margin: theme.spacing(0, 1, 0, 2),
        width: '50%'
      },
      paperRight: {
        padding: 1,
        // Top, right, bottom, left
        margin: theme.spacing(0, 2, 0, 1),
        width: '50%'
      },
      box: {
        position: 'absolute',
      }
    }),
  );

  const classes = useStyles();
  return(
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
};

export default SatelliteData;