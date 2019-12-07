import React from 'react';
import { CircularProgress, Typography, Card, CardActions, Button } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';

const styles = () =>
  createStyles({
    root: {
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
    },
    frameContainer: {
      height: 468,
      transition: 'height 0.35s ease-out',
      width: 600,
      position: 'relative',
      overflow: 'hidden'
    },
    frameContainerClosed: {
      height: 94,
      transition: 'height 0.40s ease-in',
      width: 600,
      position: 'relative',
      overflow: 'hidden'
    },
    mapFrame: {
      borderStyle: 'none',
      position: 'absolute',
      bottom: 0
    },
    toggleBtn: {
      flexGrow: 1
    }
  });

type MapState = {
  confValue: string;
  dataFetchErrored: boolean;
  loading: boolean;
  mapOpen: boolean;
};

/**
 * Component for displaying satellite location on map
 */
class LocationDataMap extends React.Component<WithStyles<typeof styles>, MapState> {
  constructor(props: WithStyles<typeof styles>) {
    super(props);
    this.state = {
      confValue: '',
      dataFetchErrored: false,
      loading: false,
      mapOpen: false
    };
  }

  componentDidMount(): void {
    this.fetchConfValues();
  }

  fetchConfValues = () => {
    this.setState({ loading: true });
    fetch('/api/conf')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(responseJson => {
        this.setState({ confValue: responseJson['Mission Control']['sat-location-widget'] });
      })
      .catch(() => this.setState({ dataFetchErrored: true }))
      .finally(() => this.setState({ loading: false }));
  };

  toggleMap = () => {
    const { mapOpen } = this.state;
    this.setState({ mapOpen: !mapOpen });
  };

  render() {
    const { loading, dataFetchErrored, confValue, mapOpen } = this.state;
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
        <Card className={classes.root}>
          <div className={mapOpen ? classes.frameContainer : classes.frameContainerClosed}>
            <iframe className={classes.mapFrame} src={confValue} height="468" width="600" title="map" scrolling="no" />
          </div>
          <CardActions>
            <Button size="small" onClick={this.toggleMap} className={classes.toggleBtn}>
              {mapOpen ? 'Close map' : 'Open map'}
            </Button>
          </CardActions>
        </Card>
      );
    }
    return <div className={classes.root}>{content}</div>;
  }
}

export default withStyles(styles)(LocationDataMap);
