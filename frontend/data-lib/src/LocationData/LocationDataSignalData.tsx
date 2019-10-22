import React from 'react';
// @ts-ignore
import { createStyles, makeStyles } from '@material-ui/core/styles';
// @ts-ignore
import { Typography } from '@material-ui/core';

const LocationDataSignalData = () => {

  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        width: '100%',
        textAlign: 'center'
      }
    }),
  );

  const classes = useStyles();

  return(
    <div className={classes.root}>
      <Typography variant="h6">
            Loss of signal at 12:34
      </Typography>
      <Typography variant="h6">
        Next acquisition of signal at 21:43
      </Typography>
    </div>
  );
};

export default LocationDataSignalData;