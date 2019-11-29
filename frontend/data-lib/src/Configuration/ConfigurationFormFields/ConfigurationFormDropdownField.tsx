import * as React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, TextField, Tooltip } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '90%',
      maxWidth: '350px'
    },
    menu: {
      width: '100%'
    }
  })
);

type ConfigurationFormDropdownFieldProps = {
  confElemRequiresRestart: boolean;
  confElemValue: string;
  confElemName: string;
  confElemDescription: string;
  confElemOptions: { [key: string]: any };
  confElemDisabledOptions: Array<string>;
  dropdownChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Dropdown field for configuration form
 * @param confElemRequiresRestart boolean
 * @param confElemValue string
 * @param confElemName  string
 * @param confElemOptions array of objects
 * @param dropdownChangeHandler callback function
 * @param confElemDisabledOptions array
 * @param confElemDescription string
 * @constructor
 */
const ConfigurationFormDropdownField = ({
  confElemRequiresRestart,
  confElemValue,
  confElemName,
  confElemOptions,
  dropdownChangeHandler,
  confElemDisabledOptions,
  confElemDescription
}: ConfigurationFormDropdownFieldProps) => {
  const classes = useStyles();

  const renderField = (isRecursive: boolean) => {
    const popoverMessage = 'Client needs to be restarted if this parameter is changed';
    if (!confElemRequiresRestart || isRecursive) {
      return (
        <TextField
          required={confElemRequiresRestart}
          id={confElemName}
          select
          label={confElemName}
          className={classes.textField}
          SelectProps={{ MenuProps: { className: classes.menu } }}
          onChange={dropdownChangeHandler}
          margin="normal"
          value={confElemValue}
          helperText={confElemDescription}
        >
          {confElemOptions.map((option: any) => (
            <MenuItem key={option.value} value={option.value} disabled={confElemDisabledOptions.includes(option.value)}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
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

ConfigurationFormDropdownField.propTypes = {
  confElemDisabledOptions: PropTypes.arrayOf(PropTypes.string),
  confElemOptions: PropTypes.arrayOf(PropTypes.object)
};

ConfigurationFormDropdownField.defaultProps = {
  confElemDisabledOptions: [],
  confElemOptions: []
};

export default ConfigurationFormDropdownField;
