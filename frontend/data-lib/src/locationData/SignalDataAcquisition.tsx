import React from 'react';
// @ts-ignore
import { createStyles, makeStyles } from '@material-ui/core/styles';

const SignalDataAcquisition = () => {

  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        width: '100%',
        textAlign: 'center'
      },
    }),
  );

  const classes = useStyles();

  return(
    <div className={classes.root}>
        Next acquisition of signal at 00:00
    </div>
  );
};

export default SignalDataAcquisition;