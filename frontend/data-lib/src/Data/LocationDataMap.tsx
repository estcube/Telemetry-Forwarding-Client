import React from 'react';
// @ts-ignore
import { Map, Marker, TileLayer } from 'react-leaflet';
// @ts-ignore
import { Button } from '@material-ui/core';
// @ts-ignore
import { createStyles, withStyles } from '@material-ui/core/styles';

const styles = (() => createStyles({
  root: {
    width: '100%',
    alignContent: 'center',
    display: 'inline-block',
  },
  mapStyle: {
    width: '100%',
    height: '512px',
  },
})
);


type MapState = {
  mapOpened: Boolean
};
type MyProps = {classes: any};

/**
 * Component for displaying satellite location on map
 */
class LocationDataMap extends React.Component<MyProps, MapState> {
  private readonly mapRef: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.mapRef = React.createRef();
    this.state = { mapOpened: false };
  }

  changeMapShowingStatus = () => {
    const { mapOpened } = this.state;
    this.setState({ mapOpened: !mapOpened });
    setTimeout(() => {
      this.mapRef.current.leafletElement.invalidateSize();
    }, 1);
  };

  render() {
    const { mapOpened } = this.state;
    const mapShowingStyle = { display: mapOpened ? 'block' : 'none' };

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Button variant="contained" color="primary" onClick={() => this.changeMapShowingStatus()}>
          {mapOpened ? 'Close map' : 'Show map'}
        </Button>
        <div style={mapShowingStyle}>
          <Map
            className={classes.mapStyle}
            center={[58.378025, 26.728493]}
            zoom={14}
            ref={this.mapRef}
          >
            <TileLayer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[58.378025, 26.728493]} />
          </Map>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LocationDataMap);
