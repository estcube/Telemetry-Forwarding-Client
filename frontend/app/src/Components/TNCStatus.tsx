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
  Switch
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import StopIcon from '@material-ui/icons/Stop';

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
    }
  });

const CHECK_TIMER = 10000;

class TNCStatus extends React.Component<WithStyles<typeof styles>, TNCStatusState> {
  constructor(props: WithStyles<typeof styles>) {
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
    fetch('/api/tnc/Main/status')
      .then(res => res.json() as Promise<TNCCheck>)
      .then((res: TNCCheck) => {
        this.setState({ tncStatus: res.status, tncBtnEnabled: true });
      })
      .finally(() => {
        const tncTimeout = window.setTimeout(this.checkTNCStatus, CHECK_TIMER);
        this.setState({ tncTimeout });
      });
  };

  handleRelayToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    fetch('/api/conf', {
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

    return (
      <Card>
        <CardContent className={classes.lowerPadding}>
          <div className={classes.row}>
            {/* Do not skip heading levels. */}
            <div>
              <Typography component="h3" variant="h5">
                Main TNC
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {/* {tncAlive ? 'Connected' : 'Not connected'} */}
                {tncStatus}
              </Typography>
            </div>
            <div className={classes.rowFill} />
            {tncAlive ? (
              <IconButton disabled={tncBtnDisabled} onClick={this.handleTncStop}>
                <StopIcon />
              </IconButton>
            ) : (
              <IconButton disabled={tncBtnDisabled} onClick={this.handleTncStart}>
                <PlayCircleOutlineIcon />
              </IconButton>
            )}
            <IconButton>
              <SettingsIcon />
            </IconButton>
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
            <Switch checked={sidsStatus?.lastStatus !== SIDSStatusType.TURNED_OFF} onChange={this.handleRelayToggle} />
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(TNCStatus);
