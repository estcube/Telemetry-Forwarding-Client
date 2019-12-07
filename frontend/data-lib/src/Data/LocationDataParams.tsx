import React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';

const styles = () =>
  createStyles({
    root: {
      width: '100%',
      textAlign: 'center'
    }
  });

/**
 * Component for displaying satellite position data
 */
class LocationDataParams extends React.Component<WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props;
    return <div className={classes.root} />;
  }
}
export default withStyles(styles)(LocationDataParams);
