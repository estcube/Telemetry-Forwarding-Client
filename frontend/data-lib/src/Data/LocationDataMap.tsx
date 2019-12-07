import React from 'react';
import { Button, CircularProgress, Typography } from '@material-ui/core';
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
  confValue: string;
  dataFetchErrored: boolean;
  loading: boolean;
};

/**
 * Component for displaying satellite location on map
 */
class LocationDataMap extends React.Component<WithStyles<typeof styles>, MapState> {
  constructor(props: WithStyles<typeof styles>) {
    super(props);
    this.state = {
      mapOpened: false,
      confValue: '',
      dataFetchErrored: false,
      loading: false
    };
  }

  componentDidMount(): void {
    this.fetchConfValuesFull();
  }

  fetchConfValuesFull = () => {
    this.setState({ loading: true });
    fetch('/api/conf/full')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(responseJson => {
        this.setState({ confValue: responseJson['Mission Control']['sat-location-widget'].value });
      })
      .catch(() => this.setState({ dataFetchErrored: true }))
      .finally(() => this.setState({ loading: false }));
  };

  changeMapShowingStatus = () => {
    const { mapOpened } = this.state;
    this.setState({ mapOpened: !mapOpened });
  };

  render() {
    const { mapOpened, loading, dataFetchErrored, confValue } = this.state;
    const { classes } = this.props;
    const confFetched = confValue !== null;
    let content;
    if (loading) {
      content = <CircularProgress />;
    } else if (!loading && dataFetchErrored) {
      content = (
        <Typography variant="h6">Could not connect to the client. Try re-launching your client to fix this.</Typography>
      );
    } else if (confFetched) {
      content = (
        <div data-testid="leafletMap">
          <iframe src={confValue} height="500" width="600" scrolling="yes" title="map" />
        </div>
      );
    }
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
        {mapOpened && content}
      </div>
    );
  }
}

export default withStyles(styles)(LocationDataMap);
