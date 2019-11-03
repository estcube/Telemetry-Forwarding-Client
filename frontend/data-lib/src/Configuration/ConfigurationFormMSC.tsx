import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Checkbox, FormControlLabel, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      padding: theme.spacing(0, 10)
    },
    container: {
      padding: theme.spacing(4, 0, 8, 0),
      borderStyle: 'solid'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '90%'
    }
  })
);

interface State {
  relayEnabled: boolean;
  mcsRelayUrl: string;
  mcsConfUrl: string;
  receiverCallsign: string;
  noradId: number;
}

/**
 * Component for configuring MSC
 */
const ConfigurationFormTNC = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    relayEnabled: false,
    mcsRelayUrl: '',
    mcsConfUrl: '',
    receiverCallsign: '',
    noradId: 2
  });
  const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleChecking = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <form className={classes.container} noValidate autoComplete="off">
        <Typography variant="h5">Mission Control</Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={values.relayEnabled}
              id="relay-enabled"
              onChange={handleChecking('relayEnabled')}
              value={values.relayEnabled}
              color="primary"
              inputProps={{
                'aria-label': 'primary checkbox'
              }}
            />
          }
          label="Relay enabled"
        />
        <TextField
          id="mcs-relay-url"
          label="MCS Relay URL"
          className={classes.textField}
          onChange={handleChange('mcsRelayUrl')}
          helperText="Enter MCS Relay URL"
          margin="normal"
          value={values.mcsRelayUrl}
        />
        <TextField
          id="mcs-conf-url"
          label="MCS Conf URL"
          className={classes.textField}
          value={values.mcsConfUrl}
          margin="normal"
          onChange={handleChange('mcsConfUrl')}
          helperText="Enter MCS Conf Url"
        />
        <TextField
          id="receiver-callsign"
          label="Receiver Callsign"
          className={classes.textField}
          value={values.receiverCallsign}
          margin="normal"
          onChange={handleChange('receiverCallsign')}
          helperText="Enter Receiver Callsign"
        />
        <TextField
          id="norad-id"
          label="Norad ID"
          className={classes.textField}
          margin="normal"
          value={values.noradId}
          onChange={handleChange('noradId')}
          helperText="Enter Norad ID"
        />
      </form>
    </div>
  );
};

export default ConfigurationFormTNC;
