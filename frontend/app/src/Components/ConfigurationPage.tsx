import * as React from 'react';
import { Configuration } from '@estcube/data-components';
import { CircularProgress, Typography } from '@material-ui/core';

type ConfigurationFormState = {
  confValues: { [key: string]: { [key: string]: string } };
  dataFetchErrored: boolean;
  loading: boolean;
  dataPosted: true | false | null;
  confPostLoading: true | false;
};

/**
 * View for configuring client
 */
class ConfigurationPage extends React.Component<{}, ConfigurationFormState> {
  constructor(props: {}) {
    super(props);
    this.state = { confValues: {}, dataFetchErrored: false, loading: false, dataPosted: null, confPostLoading: false };
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
        this.setState({ confValues: responseJson });
      })
      .catch(() => this.setState({ dataFetchErrored: true }))
      .finally(() => this.setState({ loading: false }));
  };

  // eslint-disable-next-line class-methods-use-this
  postConfValues = (event: any, data: { [key: string]: { [key: string]: any } }) => {
    event.preventDefault();
    this.setState({ confPostLoading: true });
    const dataObject = Object.assign(
      {},
      ...Object.entries(data).map(([sectionKey, section]) => ({
        [sectionKey]: Object.assign({}, ...Object.entries(section).map(([k, v]) => ({ [k]: v.value })))
      }))
    );
    fetch('/api/conf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataObject)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
      })
      .then(() => {
        this.setState({ dataPosted: true });
      })
      .catch(() => {
        this.setState({ dataPosted: false });
      })
      .finally(() => {
        this.setState({ confPostLoading: false });
      });
  };

  render() {
    const { loading, dataFetchErrored, confValues, dataPosted, confPostLoading } = this.state;
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
          <Configuration
            confValues={confValues}
            handleConfPost={this.postConfValues}
            dataPosted={dataPosted}
            confPostLoading={confPostLoading}
          />
        </div>
      );
    }
    return <div data-testid="confDiv">{content}</div>;
  }
}

export default ConfigurationPage;
