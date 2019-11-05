import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, MenuItem, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center'
    },
    container: {
      padding: theme.spacing(4, 0, 8, 0)
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '90%'
    },
    menu: {
      width: '100%'
    }
  })
);

const tncProtocolTypes = [
  {
    value: 'KISS',
    label: 'KISS'
  },
  {
    value: 'AGW',
    label: 'AGW'
  }
];

const tncConnectionTypes = [
  {
    value: 'TCP/IP',
    label: 'TCP/IP'
  },
  {
    value: 'RS232',
    label: 'RS232'
  }
];

interface State {
  tncProtocolType: string;
  tncConnectionType: string;
  tncIp: number;
  tncPort: string;
  tncDevice: string;
}

/**
 * Component for configuring TNC
 */
const ConfigurationFormTNC = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    tncProtocolType: 'KISS',
    tncConnectionType: 'RS232',
    tncIp: 0,
    tncPort: '',
    tncDevice: ''
  });
  const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div className={classes.root}>
      <form className={classes.container} noValidate autoComplete="off">
        <Typography variant="h5">TNC Interface</Typography>
        <TextField
          id="tnc-protocol-type"
          select
          label="TNC Protocol Type"
          className={classes.textField}
          SelectProps={{ MenuProps: { className: classes.menu } }}
          onChange={handleChange('tncProtocolType')}
          helperText="Select TNC Protocol Type"
          margin="normal"
          value={values.tncProtocolType}
        >
          {tncProtocolTypes.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="tnc-connection-type"
          select
          label="TNC Connection Type"
          className={classes.textField}
          SelectProps={{ MenuProps: { className: classes.menu } }}
          onChange={handleChange('tncConnectionType')}
          helperText="Select TNC Connection Type"
          margin="normal"
          value={values.tncConnectionType}
        >
          {tncConnectionTypes.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="tnc-ip"
          label="TNC IP"
          className={classes.textField}
          value={values.tncIp}
          margin="normal"
          onChange={handleChange('tncIp')}
          helperText="Enter TNC IP"
        />
        <TextField
          id="tnc-port"
          label="TNC Port"
          className={classes.textField}
          value={values.tncPort}
          margin="normal"
          onChange={handleChange('tncPort')}
          helperText="Enter TNC Port"
        />
        <TextField
          id="tnc-device"
          label="TNC Device"
          className={classes.textField}
          margin="normal"
          value={values.tncDevice}
          onChange={handleChange('tncDevice')}
          helperText="Enter TNC Device"
        />
      </form>
    </div>
  );
};

export default ConfigurationFormTNC;
