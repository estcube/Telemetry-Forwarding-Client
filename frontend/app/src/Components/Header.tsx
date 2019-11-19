import React from 'react';
import {
  AppBar,
  Box,
  Button,
  createStyles,
  withStyles,
  Toolbar,
  WithStyles,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = () =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
      textAlign: 'center'
    },
    button: {
      flexGrow: 1,
      display: 'inline-block',
      fontSize: '18px'
    },
    linkButton: {
      flexGrow: 1,
      display: 'inline-block',
      color: 'white',
      fontSize: '18px'
    }
  });

type HeaderState = {
  confObject: { [key: string]: { [key: string]: any } };
  dataFetchErrored: boolean;
  loadingFirstTime: boolean;
  dataFetchedFirstTime: boolean;
  isAtConfPage: boolean;
  interval: any;
  fetchedOnce: boolean;
};

/**
 * Blue navigation bar on every page. This component enables toggling relay-enabled switch.
 * When user is at conf page, switch disappears (in 250ms maximum).
 * When user is at other pages, switch reappears in 250ms (maximum) and conf parameter can be changed.
 */
class Header extends React.Component<WithStyles<typeof styles>, HeaderState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isAtConfPage: false,
      confObject: {},
      dataFetchErrored: false,
      loadingFirstTime: true,
      dataFetchedFirstTime: false,
      // eslint-disable-next-line react/no-unused-state
      interval: null,
      fetchedOnce: false
    };
  }

  componentDidMount(): void {
    const someInterval = setInterval(() => {
      if (/.*configure.*/.test(window.location.href)) {
        this.setState({ isAtConfPage: true });
        this.setState({ fetchedOnce: false });
      } else {
        this.setState({ isAtConfPage: false });
      }
      const { isAtConfPage, fetchedOnce } = this.state;
      if (!isAtConfPage && !fetchedOnce) {
        this.fetchConfValues();
        this.setState({ fetchedOnce: true });
      }
    }, 250);
    // eslint-disable-next-line react/no-unused-state
    this.setState({ interval: someInterval });
  }

  componentWillUnmount(): void {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ interval: null });
  }

  fetchConfValues = () => {
    fetch('/api/conf/full')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(responseJson => {
        this.setState({ confObject: responseJson });
        this.setState({ dataFetchedFirstTime: true });
      })
      .catch(() => this.setState({ dataFetchErrored: true }))
      .finally(() => this.setState({ loadingFirstTime: false }));
  };

  postConfValues = (data: { [key: string]: { [key: string]: any } }) => {
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
    });
  };

  handleRelayChange(event: any, confElemName: string, sectionName: string) {
    const { confObject } = this.state;
    const copyOfConfObject = JSON.parse(JSON.stringify(confObject));
    if (event.target.checked) {
      copyOfConfObject[sectionName][confElemName].value = 'True';
    } else {
      copyOfConfObject[sectionName][confElemName].value = 'False';
    }
    this.setState({ confObject: copyOfConfObject });
    this.postConfValues(copyOfConfObject);
  }

  // eslint-disable-next-line class-methods-use-this
  renderRelaySwitch() {
    const { loadingFirstTime, dataFetchErrored, confObject, dataFetchedFirstTime } = this.state;
    if (!loadingFirstTime && !dataFetchErrored && dataFetchedFirstTime) {
      let { value } = confObject['Mission Control']['relay-enabled'];
      value = value === 'True' || value === true;
      const requiresRestart = !!confObject['Mission Control']['relay-enabled'].requiresRestart;
      const relayLabel = confObject['Mission Control']['relay-enabled'].label;
      return (
        <FormControlLabel
          control={
            <Checkbox
              required={requiresRestart}
              checked={value}
              id="relay-enabled"
              onChange={event => this.handleRelayChange(event, 'relay-enabled', 'Mission Control')}
              value={value}
              style={{ color: '#54ebff' }}
              inputProps={{
                'aria-label': 'primary checkbox'
              }}
            />
          }
          label={relayLabel}
        />
      );
    }
    return <></>;
  }

  render() {
    const { classes } = this.props;
    const { isAtConfPage } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Box width={1 / 3}>
              <Link to="/">
                <Button className={classes.linkButton} color="default">
                  EstCube 2 Telemetry
                </Button>
              </Link>
            </Box>
            <Box width={1 / 3}>{!isAtConfPage && this.renderRelaySwitch()}</Box>
            <Box width={1 / 3}>
              <Link to="/configure">
                <Button className={classes.linkButton} color="default">
                  Configure
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
