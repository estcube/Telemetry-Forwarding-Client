import * as React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      '@media (min-width:1000px)': {
        float: 'left'
      }
    },
    checkboxField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '90%',
      maxWidth: '400px',
      display: 'inline-block'
    }
  })
);

type ConfigurationFormRadioField = {
  confElemRequiresRestart: boolean;
  confElemValue: string;
  confElemName: string;
  radioChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ConfigurationFormRadioField = ({
  confElemRequiresRestart,
  confElemValue,
  confElemName,
  radioChangeHandler
}: ConfigurationFormRadioField) => {
  const classes = useStyles();
  return (
    <FormControlLabel
      className={classes.checkboxField}
      control={
        <Checkbox
          required={confElemRequiresRestart}
          data-testid="relayEnabled"
          checked={!!confElemValue}
          id="relay-enabled"
          onChange={radioChangeHandler}
          value={confElemValue}
          color="primary"
          inputProps={{
            'aria-label': 'primary checkbox'
          }}
        />
      }
      label={confElemName}
    />
  );
};

export default ConfigurationFormRadioField;
