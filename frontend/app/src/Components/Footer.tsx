import React from 'react';
import { AppBar, Box, createStyles, Toolbar, withStyles, WithStyles, Typography } from '@material-ui/core';

const styles = () =>
  createStyles({
    rootFooter: {
      position: 'absolute',
      textAlign: 'right',
      right: '0',
      bottom: '0',
      left: '0',
      padding: '1rem'
    },
    footerBar: {
      minHeight: '120px',
      display: 'block'
    },
    footerBox: {
      display: 'inline-block',
      paddingTop: '1%',
      paddingBottom: '0.5%'
    },
    logo: {
      maxHeight: '60px',
      maxWidth: '60px',
      marginLeft: '0px',
      marginTop: '1px',
      marginBottom: '11px',
      display: 'block'
    },
    footerText: {
      color: 'white',
      textAlign: 'left'
    }
  });

class Footer extends React.Component<WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rootFooter}>
        <AppBar position="static">
          <Toolbar className={classes.footerBar}>
            <Box className={classes.footerBox}>
              <img src="././images/estcube.png" alt="logo" className={classes.logo} />
              <Typography variant="body2" className={classes.footerText}>
                ESTCube Telemetry Forwarding Client
              </Typography>
              <Typography variant="body2" className={classes.footerText}>
                © Eesti Tudengisatelliidi Sihtasutus (Estonian Student Satellite Foundation)
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(styles)(Footer);
