import * as React from 'react';
import { createStyles, Typography, withStyles, WithStyles } from '@material-ui/core';

const styles = () =>
  createStyles({
    divBox: {
      display: 'block',
      paddingTop: '5%'
    },
    logo: {
      maxHeight: '100px',
      maxWidth: '100px',
      margin: 'auto',
      display: 'block'
    },
    notFoundText: {
      color: 'black',
      textAlign: 'center'
    }
  });

class PageNotFound extends React.Component<WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.divBox}>
        <img src="././images/estcube.png" alt="logo" className={classes.logo} />
        <Typography variant="h2" className={classes.notFoundText}>
          Page not found
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(PageNotFound);
