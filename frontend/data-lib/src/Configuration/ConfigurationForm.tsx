import * as React from 'react';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { Paper, WithStyles, Typography } from '@material-ui/core';
import ConfigurationFormMSC from './ConfigurationFormMSC';
import ConfigurationFormTNC from './ConfigurationFormTNC';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2),
      textAlign: 'center'
    },
    text: {
      paddingBottom: theme.spacing(2)
    },
    papers: {
      padding: theme.spacing(4, 0)
    },
    forms: {
      maxWidth: '600px',
      textAlign: 'center',
      display: 'inline-block',
      borderStyle: 'solid',
      borderColor: 'grey',
      borderRadius: '5px',
      padding: theme.spacing(0, 2),
      margin: theme.spacing(0, 2)
    }
  });

/**
 * Component for configurations
 */
class ConfigurationForm extends React.Component<WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.papers}>
          <Typography variant="h4" className={classes.text}>
            Configuration
          </Typography>
          <div className={classes.forms}>
            <ConfigurationFormMSC />
            <ConfigurationFormTNC />
          </div>
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(ConfigurationForm);
