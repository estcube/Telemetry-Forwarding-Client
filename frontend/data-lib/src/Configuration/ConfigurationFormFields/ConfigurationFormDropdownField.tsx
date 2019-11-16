import * as React from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ConfigurationFormPopover from './ConfigurationFormPopover';

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
  confElemOptions: { [key: string]: any };
  confElemDisabledOptions: Array<string>;
  dropdownChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ConfigurationFormDropdownField = ({
  confElemRequiresRestart,
  confElemValue,
  confElemName,
  confElemOptions,
  dropdownChangeHandler,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  confElemDisabledOptions
}: ConfigurationFormDropdownFieldProps) => {
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
        onClick={handlePopoverClose}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        aria-haspopup="true"
        aria-owns={open ? 'mouse-over-popover' : undefined}
      >
        {confElemOptions.map((option: any) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <ConfigurationFormPopover requiresRestart={confElemRequiresRestart} anchorEl={anchorEl} />
    </>
  );
};

export default ConfigurationFormDropdownField;
