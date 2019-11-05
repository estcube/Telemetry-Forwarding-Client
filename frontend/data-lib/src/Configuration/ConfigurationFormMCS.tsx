import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Checkbox, FormControlLabel, Typography } from '@material-ui/core';

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
    checkboxField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '90%',
      display: 'inline-block'
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
const ConfigurationFormMCS = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    relayEnabled: false,
    mcsRelayUrl: '',
    mcsConfUrl: '',
    receiverCallsign: '',
    noradId: 0
  });
  const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleChecking = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <form className={classes.container} noValidate autoComplete="off" data-testid="mcsConfForm">
        <Typography variant="h5">Mission Control</Typography>
        <FormControlLabel
          className={classes.checkboxField}
          control={
            <Checkbox
              data-testid="relayEnabled"
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
          data-testid="mcsRelayUrl"
          label="MCS Relay URL"
          className={classes.textField}
          onChange={handleChange('mcsRelayUrl')}
          helperText="Enter MCS Relay URL"
          margin="normal"
          value={values.mcsRelayUrl}
        />
        <TextField
          id="mcs-conf-url"
          data-testid="mcsConfUrl"
          label="MCS Conf URL"
          className={classes.textField}
          value={values.mcsConfUrl}
          margin="normal"
          onChange={handleChange('mcsConfUrl')}
          helperText="Enter MCS Conf Url"
        />
        <TextField
          id="receiver-callsign"
          data-testid="receiverCallsign"
          label="Receiver Callsign"
          className={classes.textField}
          value={values.receiverCallsign}
          margin="normal"
          onChange={handleChange('receiverCallsign')}
          helperText="Enter Receiver Callsign"
        />
        <TextField
          id="norad-id"
          data-testid="noradId"
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

export default ConfigurationFormMCS;
