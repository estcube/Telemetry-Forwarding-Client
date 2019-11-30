import * as React from 'react';
import { TextField, Tooltip } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '90%',
      maxWidth: '350px'
    },
    diferentWidth: {
      maxWidth: '100px',
      marginTop: '0px'
    }
  })
);

type ConfigurationFormTextFieldProps = {
  confElemRequiresRestart: boolean;
  confElemValue: string;
  confElemName: string;
  confElemType: string;
  confElemDescription: string;
  textChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  diferentWidth?: boolean;
};
/**
 * Text field for configuration form
 * @param confElemRequiresRestart boolean
 * @param confElemValue string
 * @param confElemName string
 * @param textChangeHandler callback function
 * @param confElemType  string
 * @param confElemDescription string
 * @param diferentWidth boolean
 * @constructor
 */
const ConfigurationFormTextField = ({
  confElemRequiresRestart,
  confElemValue,
  confElemName,
  textChangeHandler,
  confElemType,
  confElemDescription,
  diferentWidth
}: ConfigurationFormTextFieldProps) => {
  const isNumber = (toCheck: string) => {
    return /^((0|[1-9][0-9]*)(\.|,)?[0-9]*)|(?![\s\S])$/.test(toCheck);
  };
  // Validate if field contains only numbers or is a string
  const localTextChangeHandler = (event: any) => {
    const { value } = event.target;
    if (confElemType === 'int' || confElemType === 'float') {
      if (isNumber(value)) {
        textChangeHandler(event);
      }
    } else {
      textChangeHandler(event);
    }
  };
  const classes = useStyles();

  const renderField = (isRecursive: boolean) => {
    const popoverMessage = 'Client needs to be restarted if this parameter is changed';
    if (!confElemRequiresRestart || isRecursive) {
      return (
        <TextField
          type={confElemType === 'int' || confElemType === 'float' ? 'number' : 'text'}
          id={confElemName}
          required={confElemRequiresRestart}
          label={confElemName}
          className={diferentWidth ? classes.diferentWidth : classes.textField}
          onChange={localTextChangeHandler}
          margin="normal"
          value={confElemValue}
          helperText={confElemDescription}
        />
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

export default ConfigurationFormTextField;
