import * as React from 'react';
import { Configuration } from '@estcube/data-components';
import { CircularProgress, Typography } from '@material-ui/core';

type ConfigurationFormState = {
  confValues: { [key: string]: { [key: string]: string } };
  dataFetchErrored: boolean;
  loading: boolean;
};

/**
 * View for configuring client
 */
class ConfigurationPage extends React.Component<{}, ConfigurationFormState> {
  constructor(props: {}) {
    super(props);
    this.state = { confValues: {}, dataFetchErrored: false, loading: false };
  }

  componentDidMount(): void {
    this.setState({ loading: true });
    this.fetchConfValuesFull();
    this.setState({ loading: false });
  }

  fetchConfValuesFull = () => {
    fetch('http://localhost:5000/conf/full')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ confValues: responseJson });
      })
      .catch(() => this.setState({ dataFetchErrored: true }));
  };

  render() {
    const { loading, dataFetchErrored, confValues } = this.state;
    const confFetched = Object.keys(confValues).length > 0;
    let content;
    if (loading) {
      content = <CircularProgress data-testid="confDiv" />;
    } else if (!loading && dataFetchErrored) {
      content = (
        <Typography variant="h4" data-testid="confDiv">
          Connection to client has failed. Try re-launching the client to solve this.
        </Typography>
      );
    } else if (confFetched) {
      content = (
        <div data-testid="confDiv">
          <Configuration confValues={confValues} />
        </div>
      );
    }
    return <div data-testid="confDiv">{content}</div>;
  }
}

export default ConfigurationPage;
