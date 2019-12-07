import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';

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
    return <div className={classes.root} />;
  }
}
export default withStyles(styles)(LocationDataSignalData);
