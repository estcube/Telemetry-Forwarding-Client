import React from 'react';
import { Button } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';

const styles = () =>
  createStyles({
    root: {
      width: '100%',
      alignContent: 'center',
      display: 'inline-block'
    },
    mapStyle: {
      width: '100%',
      height: '512px'
    }
  });

type MapState = {
  mapOpened: boolean;
};

/**
 * Component for displaying satellite location on map
 */
class LocationDataMap extends React.Component<WithStyles<typeof styles>, MapState> {
  constructor(props: WithStyles<typeof styles>) {
    super(props);
    this.state = { mapOpened: false };
  }

  changeMapShowingStatus = () => {
    const { mapOpened } = this.state;
    this.setState({ mapOpened: !mapOpened });
  };

  render() {
    const { mapOpened } = this.state;

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.changeMapShowingStatus()}
          data-testid="mapButton"
        >
          {mapOpened ? 'Close map' : 'Show map'}
        </Button>
        {mapOpened && (
          <div data-testid="leafletMap">
            <iframe
              src="https://www.n2yo.com/widgets/widget-tracker.php?s=43792&amp;size=medium&amp;all=1&amp;me=10&amp;map=5"
              height="500"
              width="600"
              scrolling="yes"
              title="map"
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(LocationDataMap);
