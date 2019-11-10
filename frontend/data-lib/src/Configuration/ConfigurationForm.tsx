import * as React from 'react';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { Paper, WithStyles, Typography } from '@material-ui/core';
import ConfigurationFormMCS from './ConfigurationFormMCS';
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
      textAlign: 'center',
      display: 'inline-block',
      borderStyle: 'solid',
      borderColor: 'grey',
      borderRadius: '5px',
      padding: theme.spacing(0, 2),
      margin: theme.spacing(0, 2)
    }
  });
interface ConfigurationFormProps extends WithStyles<typeof styles> {
  mcsFormName: string;
  tncFormName: string;
  formsHeader: string;
}
/**
 * Component for configurations
 */
class ConfigurationForm extends React.Component<ConfigurationFormProps> {
  render() {
    const { classes, mcsFormName, tncFormName, formsHeader } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.papers}>
          <Typography variant="h4" className={classes.text}>
            {formsHeader}
          </Typography>
          <div className={classes.forms}>
            <ConfigurationFormMCS confFormName={mcsFormName} />
            <ConfigurationFormTNC confFormName={tncFormName} />
          </div>
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(ConfigurationForm);
