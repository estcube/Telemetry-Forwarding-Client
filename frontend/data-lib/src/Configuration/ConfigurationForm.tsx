import * as React from 'react';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { Paper, WithStyles } from '@material-ui/core';
import ConfigurationFormMSC from './ConfigurationFormMSC';
import ConfigurationFormTNC from './ConfigurationFormTNC';

const styles = ((theme: Theme) => createStyles({
  root: {
    margin: theme.spacing(2),
  },
})
);

/**
 * Component for configurations
 */
class ConfigurationForm extends React.Component<WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper>
          <ConfigurationFormMSC />
          <br />
          <ConfigurationFormTNC />
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(ConfigurationForm);
