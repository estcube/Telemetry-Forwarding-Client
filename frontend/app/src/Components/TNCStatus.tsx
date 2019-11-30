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

interface SIDSStatus {
  lastStatus: SIDSStatusType;
  requestCount: number;
}

interface TNCCheck {
  isAlive: boolean;
  name: string;
}

interface TNCStatusState {
  sidsStatus: SIDSStatus | null;
  tncAlive: boolean;
  sidsTimeout?: number;
  tncTimeout?: number;
  tncBtnEnabled: boolean;
}

const styles = () =>
  createStyles({
    row: {
      display: 'flex',
      'flex-direction': 'row',
      'align-items': 'center',
      'margin-top': 6
    },
    rowFill: {
      'flex-grow': 1
    },
    lowerPadding: {
      padding: '10 14'
    }
  });

const CHECK_TIMER = 10000;

class TNCStatus extends React.Component<WithStyles<typeof styles>, TNCStatusState> {
  constructor(props: WithStyles<typeof styles>) {
    super(props);
    this.state = {
      sidsStatus: null,
      tncAlive: false,
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
        if (keepGoing) {
          const sidsTimeout = window.setTimeout(this.checkSidsStatus, CHECK_TIMER);
          this.setState({ sidsStatus: res, sidsTimeout });
        } else {
          this.setState({ sidsStatus: res });
        }
      });
  };

  checkTNCStatus = () => {
    fetch('/api/tnc/Main/check')
      .then(res => res.json() as Promise<TNCCheck>)
      .then((res: TNCCheck) => {
        const tncTimeout = window.setTimeout(this.checkTNCStatus, CHECK_TIMER);
        this.setState({ tncAlive: res.isAlive, tncTimeout, tncBtnEnabled: true });
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

  handleTncToggle = () => {
    const { tncAlive } = this.state;
    if (tncAlive) {
      fetch('/api/tnc/Main/stop', { method: 'POST' });
      this.setState({ tncBtnEnabled: false });
    } else {
      // TODO
    }
  };

  render() {
    const { classes } = this.props;
    const { sidsStatus, tncAlive, tncBtnEnabled } = this.state;

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
                {tncAlive ? 'Connected' : 'Not connected'}
              </Typography>
            </div>
            <div className={classes.rowFill} />
            <IconButton disabled={!tncBtnEnabled} onClick={this.handleTncToggle}>
              {tncAlive ? <StopIcon /> : <PlayCircleOutlineIcon />}
            </IconButton>
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
