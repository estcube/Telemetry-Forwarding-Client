import * as React from 'react';
import { TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ConfigurationFormPopover from './ConfigurationFormPopover';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      '@media (min-width:1000px)': {
        float: 'left'
      }
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '90%',
      maxWidth: '400px'
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

const ConfigurationFormTextField = ({
  confElemRequiresRestart,
  confElemValue,
  confElemName,
  textChangeHandler,
  confElemType
}: ConfigurationFormTextFieldProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <TextField
        type={confElemType === 'int' ? 'number' : 'text'}
        id={confElemName}
        required={confElemRequiresRestart}
        label={confElemName}
        className={classes.textField}
        onChange={textChangeHandler}
        margin="normal"
        value={confElemValue}
        onClick={handlePopoverClose}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        aria-haspopup="true"
        aria-owns={open ? 'mouse-over-popover' : undefined}
      />
      <ConfigurationFormPopover requiresRestart={confElemRequiresRestart} anchorEl={anchorEl} />
    </>
  );
};

export default ConfigurationFormTextField;
