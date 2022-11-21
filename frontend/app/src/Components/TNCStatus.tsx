import * as React from 'react';
import {
  Card,
  CardContent,
  Typography,
  createStyles,
  WithStyles,
  IconButton,
  withStyles,
  Divider,
  Tooltip
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import StopIcon from '@material-ui/icons/Stop';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

enum SIDSStatusType {
  NO_REQUESTS = 'NO_REQUESTS',
  TURNED_OFF = 'TURNED_OFF',
  SUCCESS = 'SUCCESS',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  TIMEOUT = 'TIMEOUT',
  NOT_FOUND = 'NOT_FOUND',
  REQUEST_EXCEPTION = 'REQUEST_EXCEPTION',
  UNKNOWN_EXCEPTION = 'UNKNOWN_EXCEPTION'
}

enum TNCStatusType {
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  DISCONNECTING = 'DISCONNECTING',
  DISCONNECTED = 'DISCONNECTED'
}

interface SIDSStatus {
  lastStatus: SIDSStatusType;
  requestCount: number;
}

interface TNCCheck {
  status: TNCStatusType;
  name: string;
}

interface TNCStatusState {
  sidsStatus: SIDSStatus | null;
  tncStatus: TNCStatusType | null;
  sidsTimeout?: number;
  tncTimeout?: number;
  tncBtnEnabled: boolean;
}

interface UpdateFailResponse {
  error: string;
  statusCode?: number;
  exitCode?: number;
}

const styles = () =>
  createStyles({
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 6
    },
    rowFill: {
      'flex-grow': 1
    },
    lowerPadding: {
      padding: '6px 14px',
      '&:last-child': {
        paddingBottom: 10
      }
    },
    rootCard: {
      minWidth: 300,
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      '&:hover': {
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
      }
    }
  });

const CHECK_TIMER = 10000;

interface Props extends WithStyles<typeof styles>, WithSnackbarProps {}

class TNCStatus extends React.Component<Props, TNCStatusState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sidsStatus: null,
      tncStatus: null,
      tncBtnEnabled: true
    };
  }

  componentDidMount(): void {
    this.checkSidsStatus();
    this.checkTNCStatus();
  }

  // TODO: Do we have to unsub from running requests?
  componentWillUnmount(): void {
    const { sidsTimeout, tncTimeout } = this.state;
    clearTimeout(sidsTimeout);
    clearTimeout(tncTimeout);
  }

  checkSidsStatus = (keepGoing = true) => {
    fetch('/api/sids/status')
      .then(res => res.json() as Promise<SIDSStatus>)
      .then((res: SIDSStatus) => {
        this.setState({ sidsStatus: res });
      })
      .finally(() => {
        if (keepGoing) {
          const sidsTimeout = window.setTimeout(this.checkSidsStatus, CHECK_TIMER);
          this.setState({ sidsTimeout });
        }
      });
  };

  checkTNCStatus = () => {
    const { enqueueSnackbar } = this.props;

    fetch('/api/tnc/Main/status')
      .then(res => res.json() as Promise<TNCCheck>)
      .then((res: TNCCheck) => {
        this.setState({ tncStatus: res.status, tncBtnEnabled: true });
      })
      .catch(() => {
        enqueueSnackbar("Couldn't connect to the api.", { variant: 'error', preventDuplicate: true });
      })
      .finally(() => {
        const tncTimeout = window.setTimeout(this.checkTNCStatus, CHECK_TIMER);
        this.setState({ tncTimeout });
      });
  };

  handleRelayToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    fetch('/api/sids/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'Mission Control': {
          'relay-enabled': checked
        }
      })
    });
    this.checkSidsStatus(false);
  };

  handleTncStop = () => {
    fetch('/api/tnc/Main/stop', { method: 'POST' }).then(() => {
      this.setState({ tncStatus: TNCStatusType.DISCONNECTING });
    });
    this.setState({ tncBtnEnabled: false });
  };

  handleTncStart = () => {
    fetch('/api/tnc/Main/start', { method: 'POST' }).then(() => {
      this.setState({ tncStatus: TNCStatusType.CONNECTING });
    });
    this.setState({ tncBtnEnabled: false });
  };

  // TODO: Redirect to configuration page.
  render() {
    const { classes } = this.props;
    const { sidsStatus, tncStatus, tncBtnEnabled } = this.state;
    const tncAlive = tncStatus === TNCStatusType.CONNECTED || tncStatus === TNCStatusType.CONNECTING;
    const tncBtnDisabled = !tncBtnEnabled || tncStatus === TNCStatusType.DISCONNECTING;

    // Div wrappers for buttons that can be disabled, because disabled buttons don't
    //  fire the necessary events for the tooltip.
    return (
      <Card className={classes.rootCard}>
        <CardContent className={classes.lowerPadding}>
          <div className={classes.row}>
            {/* Do not skip heading levels. */}
            <div>
              <Typography component="h3" variant="h5">
                TNC Connection
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {/* {tncAlive ? 'Connected' : 'Not connected'} */}
                {tncStatus}
              </Typography>
            </div>
            <div className={classes.rowFill} />
            {tncAlive ? (
              <Tooltip placement="top" title="Disconnect">
                <div>
                  <IconButton disabled={tncBtnDisabled} onClick={this.handleTncStop}>
                    <StopIcon />
                  </IconButton>
                </div>
              </Tooltip>
            ) : (
              <Tooltip placement="top" title="Connect">
                <div>
                  <IconButton disabled={tncBtnDisabled} onClick={this.handleTncStart}>
                    <PlayCircleOutlineIcon />
                  </IconButton>
                </div>
              </Tooltip>
            )}
            <Tooltip placement="top" title="Connection settings">
              <Link to="/configure">
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </Link>
            </Tooltip>
          </div>
        </CardContent>
        <Divider />
        <CardContent className={classes.lowerPadding}>
          <div className={classes.row}>
            <div>
              <Typography variant="body2">SIDS Relay: {sidsStatus?.lastStatus}</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Relayed messages: {sidsStatus?.requestCount}
              </Typography>
            </div>
            <div className={classes.rowFill} />
            <Tooltip title={sidsStatus?.lastStatus !== SIDSStatusType.TURNED_OFF ? 'Disable relay' : 'Enable relay'}>
                <Route checked={sidsStatus?.lastStatus !== SIDSStatusType.TURNED_OFF}
                  onChange={this.handleRelayToggle}
                />
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withSnackbar(withStyles(styles)(TNCStatus));
