import * as React from 'react';
import { Data } from '@estcube/data-components';
import { CircularProgress, Typography } from '@material-ui/core';

type MainPageState = {
  decodedPackets: { [key: string]: [{ [key: string]: string | number | { [key: string]: string } }] };
  telemetryConfiguration: { [key: string]: [{ [key: string]: any }] };
  dataFetchErrored: boolean;
  packetsLoaded: boolean;
  telemetryConfLoaded: boolean;
  loading: boolean;
};

/**
 * Front-page view
 */
class MainPage extends React.Component<{}, MainPageState> {
  constructor(props: {}) {
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
        <Typography variant="h6">Something went wrong. Sorry :( Try re-launching your client to fix this.</Typography>
      );
    } else if (telemetryConfLoaded && packetsLoaded) {
      content = <Data telemetryConfiguration={telemetryConfiguration} decodedPackets={decodedPackets} />;
    }
    return <div data-testid="confDiv">{content}</div>;
  }
}

export default MainPage;
