import * as React from 'react';
import Data from '@estcube/data-components';
import { CircularProgress, Typography, createStyles, WithStyles, withStyles } from '@material-ui/core';
import TNCStatus from './TNCStatus';
import LocationDataMap from './LocationDataMap';

type MainPageState = {
  decodedPackets: { [key: string]: [{ [key: string]: string | number | { [key: string]: string } }] };
  telemetryConfiguration: { [key: string]: [{ [key: string]: any }] };
  dataFetchErrored: boolean;
  packetsLoaded: boolean;
  telemetryConfLoaded: boolean;
  loading: boolean;
};

const styles = () =>
  createStyles({
    tncConns: {
      display: 'flex',
      flexDirection: 'column',
      margin: 16
    },
    topRow: {
      display: 'flex',
      flexDirection: 'row'
    },
    flexFill: {
      flexGrow: 1
    },
    locationMap: {
      margin: 16
    }
  });

/**
 * Front-page view
 */
class MainPage extends React.Component<WithStyles<typeof styles>, MainPageState> {
  constructor(props: WithStyles<typeof styles>) {
    super(props);
    this.state = {
      telemetryConfiguration: {},
      decodedPackets: {},
      dataFetchErrored: false,
      packetsLoaded: false,
      telemetryConfLoaded: false,
      loading: false
    };
  }

  componentDidMount(): void {
    this.setState({ loading: true });
    fetch('/api/telemetry/packets')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(responseJson => {
        this.setState({ decodedPackets: responseJson });
      })
      .catch(() => this.setState({ dataFetchErrored: true }))
      .finally(() => this.setState({ packetsLoaded: true }));
    fetch('/api/telemetry/configuration')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(responseJson => {
        this.setState({ telemetryConfiguration: responseJson });
      })
      .catch(() => this.setState({ dataFetchErrored: true }))
      .finally(() => this.setState({ telemetryConfLoaded: true, loading: false }));
  }

  render() {
    const { classes } = this.props;
    const {
      loading,
      decodedPackets,
      dataFetchErrored,
      packetsLoaded,
      telemetryConfLoaded,
      telemetryConfiguration
    } = this.state;
    let content;
    if (loading) {
      content = <CircularProgress />;
    } else if (!loading && dataFetchErrored) {
      content = (
        <Typography variant="h6">Could not connect to the client. Try re-launching your client to fix this.</Typography>
      );
    } else if (telemetryConfLoaded && packetsLoaded) {
      content = <Data telemetryConfiguration={telemetryConfiguration} decodedPackets={decodedPackets} />;
    }
    return (
      <div data-testid="confDiv">
        <div className={classes.topRow}>
          <div className={classes.tncConns}>
            <TNCStatus />
          </div>
          <div className={classes.flexFill} />
          <div className={classes.locationMap}>
            <LocationDataMap />
          </div>
        </div>
        {content}
      </div>
    );
  }
}

export default withStyles(styles)(MainPage);
