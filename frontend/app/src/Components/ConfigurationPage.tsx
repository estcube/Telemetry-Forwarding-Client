import * as React from 'react';
import { Configuration } from '@estcube/data-components';
import { CircularProgress, Typography } from '@material-ui/core';

type ConfigurationPageState = {
  confValues: { [key: string]: { [key: string]: string } };
  dataFetchErrored: boolean;
  loading: boolean;
  dataPosted: true | false | null;
  confPostLoading: true | false;
  errorMessage: string | null;
};

/**
 * View for configuring client
 */
class ConfigurationPage extends React.Component<{}, ConfigurationPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      errorMessage: null,
      confValues: {},
      dataFetchErrored: false,
      loading: false,
      dataPosted: null,
      confPostLoading: false
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
        this.setState({ confValues: responseJson });
      })
      .catch(() => this.setState({ dataFetchErrored: true }))
      .finally(() => this.setState({ loading: false }));
  };

  postConfValues = (event: any, data: { [key: string]: { [key: string]: any } }) => {
    event.preventDefault();
    this.setState({ confPostLoading: true });
    const dataObject = Object.assign(
      {},
      ...Object.entries(data).map(([sectionKey, section]) => ({
        [sectionKey]: Object.assign({}, ...Object.entries(section).map(([k, v]) => ({ [k]: v.value })))
      }))
    );
    this.setState({ errorMessage: null });
    fetch('/api/conf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataObject)
    })
      .then(response => {
        if (!response.ok) {
          response.json().then(body => {
            this.setState({ dataPosted: false, errorMessage: body.Error });
          });
          throw Error(response.statusText);
        } else {
          this.setState({ dataPosted: true });
        }
      })
      .finally(() => {
        this.setState({ confPostLoading: false });
      });
  };

  render() {
    const { loading, dataFetchErrored, confValues, dataPosted, confPostLoading, errorMessage } = this.state;
    const confFetched = Object.keys(confValues).length > 0;
    let content;
    if (loading) {
      content = <CircularProgress />;
    } else if (!loading && dataFetchErrored) {
      content = (
        <Typography variant="h6">Something went wrong. Sorry :( Try re-launching your client to fix this.</Typography>
      );
    } else if (confFetched) {
      content = (
        <div>
          <Configuration
            confValues={confValues}
            handleConfPost={this.postConfValues}
            dataPosted={dataPosted}
            errorMessage={errorMessage}
            confPostLoading={confPostLoading}
          />
        </div>
      );
    }
    return <div data-testid="confDiv">{content}</div>;
  }
}

export default ConfigurationPage;
