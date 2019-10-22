import * as React from 'react';
// @ts-ignore
// eslint-disable-next-line no-unused-vars
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ConfigurationFormMSC from './ConfigurationFormMSC';
import ConfigurationFormTNC from './ConfigurationFormTNC';
// @ts-ignore
import { Paper } from '@material-ui/core';


const ConfigurationForm = () => {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        margin: theme.spacing(2),
      }
    })
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper>
        <ConfigurationFormMSC />
        <br />
        <ConfigurationFormTNC />
      </Paper>
    </div>
  );
};

export default ConfigurationForm; 