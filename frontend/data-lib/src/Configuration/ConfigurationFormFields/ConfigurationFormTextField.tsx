import * as React from 'react';
import { TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      '@media (min-width:1000px)': {
        float: 'left'
      }
    },
    container: {
      padding: theme.spacing(4, 0, 8, 0)
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '90%',
      maxWidth: '400px'
    }
  })
);

type ConfigurationFormTextFieldProps = {
  confElemRequiresRestart: boolean;
  confElemValue: string;
  confElemName: string;
  confElemType: string;
  textChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ConfigurationFormTextField = ({
  confElemRequiresRestart,
  confElemValue,
  confElemName,
  textChangeHandler,
  confElemType
}: ConfigurationFormTextFieldProps) => {
  const classes = useStyles();
  return (
    <TextField
      type={confElemType === 'int' ? 'number' : 'text'}
      id={confElemName}
      required={confElemRequiresRestart}
      data-testid="mcsRelayUrl"
      label={confElemName}
      className={classes.textField}
      onChange={textChangeHandler}
      helperText={`Enter ${confElemName}`}
      margin="normal"
      value={confElemValue}
    />
  );
};

export default ConfigurationFormTextField;
