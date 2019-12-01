import React from 'react';
import { AppBar, Box, Button, createStyles, withStyles, Toolbar, WithStyles } from '@material-ui/core';
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

/**
 * Blue navigation bar on every page.
 */
class Header extends React.Component<WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Box width={1 / 3}>
              <Link to="/">
                <Button className={classes.linkButton} color="default">
                  Telemetry client
                </Button>
              </Link>
            </Box>
            <Box width={1 / 3} />
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
