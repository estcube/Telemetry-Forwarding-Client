import React from 'react';
import {
  AppBar,
  Box,
  Button,
  createStyles,
  withStyles,
  Toolbar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = (() => createStyles({
  root: {
    flexGrow: 1,
    width: '100%',
    textAlign: 'center',
  },
  button: {
    flexGrow: 1,
    display: 'inline-block',
    fontSize: '18px',
  },
  linkButton: {
    flexGrow: 1,
    display: 'inline-block',
    color: 'white',
    fontSize: '18px',
  },
})
);

type MyProps = { classes: any };

/**
 * Blue navigation bar on every page
 */
class Header extends React.Component<MyProps> {
  render() {
    const { classes } = this.props;
    return (

      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Box width={1 / 3}>
              <Link to="/">
                <Button className={classes.linkButton} color="default">EstCube 2 Telemetry</Button>
              </Link>
            </Box>
            <Box width={1 / 3}>
              <Button className={classes.button} color="inherit">Upload Data</Button>
            </Box>
            <Box width={1 / 3}>
              <Link to="/configure">
                <Button className={classes.linkButton} color="default">Configure</Button>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
