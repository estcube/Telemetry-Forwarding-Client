import React from 'react';
import { createStyles, withStyles, WithStyles, Typography } from '@material-ui/core';

const styles = () =>
  createStyles({
    rootFooter: {
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      backgroundColor: '#3f51b5',
      color: '#fff'
    },
    logo: {
      maxHeight: '60px',
      maxWidth: '60px',
      marginLeft: '0px',
      marginTop: '1px',
      marginBottom: '11px',
      display: 'block'
    }
  });

class Footer extends React.Component<WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rootFooter}>
        <img src="././images/estcube.png" alt="logo" className={classes.logo} />
        <Typography variant="body2">ESTCube Telemetry Forwarding Client</Typography>
        <Typography variant="body2">
          © Eesti Tudengisatelliidi Sihtasutus (Estonian Student Satellite Foundation)
        </Typography>
      </div>
    );
  }
}
export default withStyles(styles)(Footer);
