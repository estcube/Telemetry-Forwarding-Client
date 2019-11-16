import * as React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ConfigurationFormPopover from './ConfigurationFormPopover';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    checkboxField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '90%',
      maxWidth: '350px'
    }
  })
);

type ConfigurationFormRadioField = {
  confElemRequiresRestart: boolean;
  confElemValue: string;
  confElemName: string;
  radioChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ConfigurationFormRadioField = ({
  confElemRequiresRestart,
  confElemValue,
  confElemName,
  radioChangeHandler
}: ConfigurationFormRadioField) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const classes = useStyles();
  return (
    <>
      <FormControlLabel
        className={classes.checkboxField}
        control={
          <Checkbox
            required={confElemRequiresRestart}
            checked={!!confElemValue}
            id="relay-enabled"
            onChange={radioChangeHandler}
            value={!!confElemValue}
            color="primary"
            inputProps={{
              'aria-label': 'primary checkbox'
            }}
            onClick={handlePopoverClose}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            aria-haspopup="true"
            aria-owns={open ? 'mouse-over-popover' : undefined}
          />
        }
        label={confElemName}
      />
      <ConfigurationFormPopover requiresRestart={confElemRequiresRestart} anchorEl={anchorEl} />
    </>
  );
};

export default ConfigurationFormRadioField;
