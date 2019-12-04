import * as React from 'react';
import { Checkbox, FormControlLabel, Tooltip, FormHelperText, FormControl } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    checkboxField: {}
  })
);

type ConfigurationFormRadioField = {
  confElemRequiresRestart: boolean;
  confElemValue: boolean;
  confElemName: string;
  confElemDescription: string;
  radioChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Radio button for configuration form
 * @param confElemRequiresRestart boolean
 * @param confElemValue boolean
 * @param confElemName  string
 * @param radioChangeHandler  callback function
 * @param confElemDescription string
 * @constructor
 */
const ConfigurationFormRadioField = ({
  confElemRequiresRestart,
  confElemValue,
  confElemName,
  radioChangeHandler,
  confElemDescription
}: ConfigurationFormRadioField) => {
  const classes = useStyles();
  const renderField = (isRecursive: boolean) => {
    const popoverMessage = 'Client needs to be restarted for changes to this to apply.';
    if (!confElemRequiresRestart || isRecursive) {
      return (
        <FormControl>
          <FormControlLabel
            className={classes.checkboxField}
            control={
              <Checkbox
                required={confElemRequiresRestart}
                checked={confElemValue}
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
          <FormHelperText>{confElemDescription}</FormHelperText>
        </FormControl>
      );
    }
    return (
      <Tooltip placement="top-start" title={popoverMessage}>
        {renderField(true)}
      </Tooltip>
    );
  };

  return <>{renderField(false)}</>;
};

export default ConfigurationFormRadioField;
