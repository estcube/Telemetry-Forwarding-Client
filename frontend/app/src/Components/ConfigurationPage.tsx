import * as React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import ConfigurationForms from './Configuration/ConfigurationForms';

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
class ConfigurationPage extends React.Component<WithSnackbarProps, ConfigurationPageState> {
  constructor(props: WithSnackbarProps) {
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

  postConfValues = (event: React.MouseEvent<HTMLButtonElement>, data: { [key: string]: { [key: string]: any } }) => {
    event.preventDefault();
    const { enqueueSnackbar } = this.props;
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
            enqueueSnackbar(body.Error, { variant: 'error', autoHideDuration: 10000 });
          });
          throw Error(response.statusText);
        } else {
          this.setState({ dataPosted: true });
          enqueueSnackbar('Configuration parameters updated.', { variant: 'success' });
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
        <Typography variant="h6">Could not connect to the client. Try re-launching your client to fix this.</Typography>
      );
    } else if (confFetched) {
      content = (
        <div>
          <ConfigurationForms
            confValues={confValues}
            handleConfPost={this.postConfValues}
            dataPosted={dataPosted}
            errorMessage={errorMessage}
            confPostLoading={confPostLoading}
          />
        </div>
      );
    }
    return <div data-testid="conf-form">{content}</div>;
  }
}

export default withSnackbar(ConfigurationPage);
