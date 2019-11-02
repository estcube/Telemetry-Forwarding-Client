import React from 'react';
// @ts-ignore
import { createStyles, withStyles } from '@material-ui/core/styles';
// @ts-ignore
import { Typography } from '@material-ui/core';

const styles = (() =>
  createStyles({
    root: {
      width: '100%',
      textAlign: 'center'
    }
  })
);

type MyProps = { classes: any }

/**
 * Component for displaying satellite position data
 */
class LocationDataParams extends React.Component<MyProps> {
  render(){

    const { classes } = this.props;
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
  }
}
export default withStyles(styles)(LocationDataParams);