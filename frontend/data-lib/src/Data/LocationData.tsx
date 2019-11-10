import React from 'react';
import { Paper, WithStyles } from '@material-ui/core';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import LocationDataSignalData from './LocationDataSignalData';
import LocationDataParams from './LocationDataParams';
import LocationDataMap from './LocationDataMap';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    papers: {
      margin: theme.spacing(2),
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
      margin: theme.spacing(0, 0, 1, 0),
      width: '100%',
      'text-align': 'center'
    },
    break: {
      flexBasis: '100%',
      width: 0
    }
  });

/**
 * Component for displaying satellite location parameters
 */
class LocationData extends React.Component<WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.papers}>
          <div className={classes.div1} data-testid="locationSignalData">
            <LocationDataSignalData />
          </div>
          <div className={classes.div2} data-testid="locationDataParams">
            <LocationDataParams />
          </div>
          <div className={classes.break} />
          <div className={classes.div3} data-testid="locationDataMap">
            <LocationDataMap />
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(LocationData);
