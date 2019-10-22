import React from 'react';
import {
  AppBar,
  Box,
  Button,
  createStyles,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
// @ts-ignore
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
      textAlign: 'center',
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
  }),
);

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Box width={1/3}>
            <Link to="/">
              <Button className={classes.linkButton} color="default" >EstCube 2 Telemetry</Button>
            </Link>
          </Box>
          <Box width={1/3}>
            <Button className={classes.button} color="inherit">Upload Data</Button>
          </Box>
          <Box width={1/3}>
            <Link to="/configure">
              <Button className={classes.linkButton} color="default" >Configure</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;