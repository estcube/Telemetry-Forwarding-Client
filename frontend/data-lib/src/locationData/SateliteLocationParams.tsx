import React from 'react';
// @ts-ignore
import { createStyles, makeStyles } from '@material-ui/core/styles';
// @ts-ignore
import { Typography } from '@material-ui/core';

const SateliteLocationParams = () => {

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
      <Typography variant='h6'>
          Current azimuth: 202.5°
      </Typography>
      <Typography variant='h6'>
          Current elevation: 200000m
      </Typography>
    </div>
  );
};

export default SateliteLocationParams;