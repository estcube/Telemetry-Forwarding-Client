import * as React from 'react';
import { TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    diferentWidth: {
      maxWidth: '100px',
      marginTop: '0px'
    }
  })
);

type LimitTextFieldProps = {
  fieldValue: string;
  textChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
/**
 * Text field for choosing data limit
 * @param fieldValue string
 * @param textChangeHandler callback function
 * @constructor
 */
const LimitTextField = ({ fieldValue, textChangeHandler }: LimitTextFieldProps) => {
  const isNumber = (toCheck: string) => {
    return /^(-?(0|[1-9][0-9]*)(\.|,)?[0-9]*)|(?![\s\S])$/.test(toCheck);
  };
  // Validate if field contains only numbers (and is smaller than max) or is a string
  const localTextChangeHandler = (event: any) => {
    const { value } = event.target;
    if (isNumber(value) || value === '') {
      textChangeHandler(event);
    }
  };
  const classes = useStyles();

  return (
    <TextField
      type="number"
      label="Limit"
      className={classes.diferentWidth}
      onChange={localTextChangeHandler}
      margin="normal"
      value={fieldValue}
    />
  );
};

export default LimitTextField;
