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
  confElemMinValue?: number | null;
  confElemMaxValue?: number | null;
  confElemMaxLen?: number | null;
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
 * @param confElemMinValue integer
 * @param confElemMaxValue integer
 * @param confElemMaxLen integer
 * @constructor
 */
const ConfigurationFormTextField = ({
  confElemRequiresRestart,
  confElemValue,
  confElemName,
  textChangeHandler,
  confElemType,
  confElemDescription,
  diferentWidth,
  confElemMinValue,
  confElemMaxValue,
  confElemMaxLen
}: ConfigurationFormTextFieldProps) => {
  const isNumber = (toCheck: string) => {
    return /^(-?(0|[1-9][0-9]*)(\.|,)?[0-9]*)|(?![\s\S])$/.test(toCheck);
  };
  // Validate if field contains only numbers (and is smaller than max) or is a string
  const localTextChangeHandler = (event: any) => {
    const { value } = event.target;
    if (confElemType === 'int' || confElemType === 'float') {
      if (isNumber(value)) {
        if (confElemMinValue && confElemMaxValue) {
          if (parseInt(value, 10) <= confElemMaxValue) {
            textChangeHandler(event);
          }
        } else {
          textChangeHandler(event);
        }
      }
      if (value === '') {
        textChangeHandler(event);
      }
    } else if (confElemMaxLen) {
      if (value.length <= confElemMaxLen) {
        textChangeHandler(event);
      }
    } else {
      textChangeHandler(event);
    }
  };
  const classes = useStyles();

  const renderField = (isRecursive: boolean) => {
    const popoverMessage = 'Client needs to be restarted if this parameter is changed.';
    const advancedPopoverMessage = `${confElemRequiresRestart ? popoverMessage : ''}${
      confElemMinValue && confElemMaxValue ? ` Must be in range: ${confElemMinValue}...${confElemMaxValue}` : ''
    }${confElemMaxLen ? ` Maximum length can be ${confElemMaxLen}` : ''}`;
    if (isRecursive) {
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
      <Tooltip placement="top-start" title={advancedPopoverMessage}>
        {renderField(true)}
      </Tooltip>
    );
  };

  return <>{renderField(false)}</>;
};

export default ConfigurationFormTextField;
