import React from 'react';
// @ts-ignore
import {Paper} from '@material-ui/core';
// @ts-ignore
// eslint-disable-next-line no-unused-vars
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SignalData from './locationData/SignalData';
import SateliteLocationParams from './locationData/SateliteLocationParams';
import {LocationMap} from './locationData/LocationMap';

const LocationData = () => {

  const useStyles = makeStyles(() =>
    createStyles({
      papers: {
        padding: 1,
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 2,
        marginTop: 1,
        width: 'auto',
        display: 'flex',
        flexWrap: 'wrap'
      },
      div1: {
        width: '50%'
      },
      div2: {
        width: '50%'
      },
      div3: {
        width: '100%',
        'text-align': 'center'
      },
      break: {
        flexBasis: '100%',
        width: 0
      }
    }),
  );

  const classes = useStyles();

  return(
    <div>
      <Paper className={classes.papers}>
        <div className={classes.div1}>
          <SignalData />
        </div>
        <div className={classes.div2}>
          <SateliteLocationParams />
        </div>
        <div className={classes.break}></div>
        <div className={classes.div3}>
          <LocationMap />
        </div>
      </Paper>
    </div>
  );
};

export default LocationData;