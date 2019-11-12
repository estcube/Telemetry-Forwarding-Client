import * as React from 'react';
import { MenuItem, TextField } from '@material-ui/core';
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
    },
    menu: {
      width: '100%'
    },
    checkboxField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '90%',
      display: 'inline-block'
    }
  })
);

type ConfigurationFormDropdownFieldProps = {
  confElemRequiresRestart: boolean;
  confElemValue: string;
  confElemName: string;
  confElemOptions: { [key: string]: any };
  confElemDisabledOptions: Array<string>;
  dropdownChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ConfigurationFormDropdownField = ({
  confElemRequiresRestart,
  confElemValue,
  confElemName,
  confElemOptions,
  dropdownChangeHandler,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  confElemDisabledOptions
}: ConfigurationFormDropdownFieldProps) => {
  const classes = useStyles();
  return (
    <TextField
      required={confElemRequiresRestart}
      id={confElemName}
      select
      label={confElemName}
      className={classes.textField}
      SelectProps={{ MenuProps: { className: classes.menu } }}
      onChange={dropdownChangeHandler}
      helperText={confElemName}
      margin="normal"
      value={confElemValue}
    >
      {confElemOptions.map((option: any) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default ConfigurationFormDropdownField;
