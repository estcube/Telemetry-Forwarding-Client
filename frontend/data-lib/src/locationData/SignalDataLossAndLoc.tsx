import React from 'react';
// @ts-ignore
import {Box} from '@material-ui/core';
// @ts-ignore
import { createStyles, makeStyles } from '@material-ui/core/styles';

const SignalDataLossAndLoc = () => {

  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        width: '100%',
      },
      lossOfSignal: {
        position: 'relative',
        textAlign: 'center',
        verticalAlign: 'middle',
        lineHeight: '90px'
      }
    }),
  );

  const classes = useStyles();

  return(
    <div className={classes.root}>
      <Box bgcolor="grey.200" width="auto" display="flex" flexDirection="row">
        <Box p={1} mr={1} bgcolor="grey.100" width="100%">
          <p>
            Current azimuth: 0
          </p>
          <p>
            Current elevation: 200000m
          </p>
        </Box>
        <Box p={1} ml={1} bgcolor="grey.100" width="100%">
          <p className={classes.lossOfSignal}>
              Loss of signal at 00:00
          </p>
        </Box>
      </Box>
    </div>
  );
};

export default SignalDataLossAndLoc;