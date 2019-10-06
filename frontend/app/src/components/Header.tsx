import React from 'react';
import {
  AppBar,
  Button,
  createStyles,
  makeStyles,
  Toolbar,
  Link
} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: 5
    },
    spacing: {
      flexGrow: 1,
    },
  }),
);

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link className={classes.spacing} color="inherit" variant="h6"  href='/'>EstCube 2 Telemetry</Link>
          <Button color="primary" variant="contained" className={classes.spacing}>Upload Data</Button>
          <Button color="primary" variant="contained" className={classes.spacing} href='/data'>Configure</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;