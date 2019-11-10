import React from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
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
            <Map className={classes.mapStyle} center={[58.378025, 26.728493]} zoom={14}>
              <TileLayer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[58.378025, 26.728493]} />
            </Map>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(LocationDataMap);
