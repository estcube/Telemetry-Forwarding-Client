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
/**
 * Text field for configuration form
 * @param confElemRequiresRestart boolean
 * @param confElemValue string
 * @param confElemName string
 * @param textChangeHandler callback function
 * @param confElemType  string
 * @constructor
 */
const ConfigurationFormTextField = ({
  confElemRequiresRestart,
  confElemValue,
  confElemName,
  textChangeHandler,
  confElemType
}: ConfigurationFormTextFieldProps) => {
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
          className={classes.textField}
          onChange={textChangeHandler}
          margin="normal"
          value={confElemValue}
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
