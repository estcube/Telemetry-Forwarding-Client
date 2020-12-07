import * as React from 'react';
import { CircularProgress, Typography, createStyles, WithStyles, withStyles } from '@material-ui/core';

type MainPageState = {
  dataFetchErrored: boolean;
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
      dataFetchErrored: false,
      loading: false
    };
  }

  render() {
    const { loading, dataFetchErrored } = this.state;
    let content;
    if (loading) {
      content = <CircularProgress />;
    } else if (!loading && dataFetchErrored) {
      content = (
        <Typography variant="h6">Could not connect to the client. Try re-launching your client to fix this.</Typography>
      );
    } else {
      content = (
        <div>
          <iframe
            title="grafana"
            src="http://localhost:3000/d/P3JF_FpMz/estcube?orgId=2&theme=light&kiosk"
            width="100%"
            height="2000"
          />
        </div>
      );
    }
    return <div data-testid="grafanaDiv">{content}</div>;
  }
}

export default withStyles(styles)(MainPage);
