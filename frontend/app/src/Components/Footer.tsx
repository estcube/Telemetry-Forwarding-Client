import React from 'react';
import { createStyles, withStyles, WithStyles, Typography } from '@material-ui/core';

const styles = () =>
  createStyles({
    rootFooter: {
      height: 90,
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      backgroundColor: '#3f51b5',
      color: '#fff'
    },
    logo: {
      maxHeight: '60px',
      maxWidth: '60px',
      marginLeft: '0px',
      marginTop: '1px',
      display: 'block'
    },
    imageDiv: {
      marginLeft: '10px'
    },
    textDiv: {
      textAlign: 'right'
    }
  });

class Footer extends React.Component<WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rootFooter}>
        <div className={classes.textDiv}>
          <Typography variant="body2">ESTCube Telemetry Forwarding Client</Typography>
          <Typography variant="body2">
            © Eesti Tudengisatelliidi Sihtasutus (Estonian Student Satellite Foundation)
          </Typography>
        </div>
        <div className={classes.imageDiv}>
          <img src="./images/estcube.png" alt="logo" className={classes.logo} />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Footer);
