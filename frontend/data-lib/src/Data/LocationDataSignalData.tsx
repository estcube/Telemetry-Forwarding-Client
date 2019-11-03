import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = () =>
  createStyles({
    root: {
      width: '100%',
      textAlign: 'center'
    }
  });

/**
 * Component for displaying satellite signal data
 */
class LocationDataSignalData extends React.Component<WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h6">Loss of signal at 12:34</Typography>
        <Typography variant="h6">Next acquisition of signal at 21:43</Typography>
      </div>
    );
  }
}
export default withStyles(styles)(LocationDataSignalData);
