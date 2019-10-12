import React from 'react';
import {
  AppBar,
  Box,
  createStyles,
  makeStyles,
  Toolbar,
  Link
} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: 5,
      width: '100%',
      textAlign: 'center'
    },
    link: {
      flexGrow: 1,
      display: 'inline-block',
    }
  }),
);

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Box width={1/3}>
            <Link className={classes.link} color="inherit" variant="h6"  href='/'>EstCube 2 Telemetry</Link>
          </Box>
          <Box width={1/3}>
            <Link className={classes.link} color="inherit" variant="h6">Upload Data</Link>
          </Box><Box width={1/3}>
            <Link className={classes.link} color="inherit" variant="h6" href='/configure'>Configure</Link>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;