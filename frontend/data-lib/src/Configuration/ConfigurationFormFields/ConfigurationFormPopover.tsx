import * as React from 'react';
import { Popover } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none'
    },
    paper: {
      padding: theme.spacing(1)
    }
  })
);

interface ConfigurationFormPopoverProps {
  requiresRestart: boolean;
  anchorEl: HTMLElement | null;
}

const ConfigurationFormPopover = ({ requiresRestart, anchorEl }: ConfigurationFormPopoverProps) => {
  const classes = useStyles();
  let localAnchorEl = anchorEl;

  const setAnchorEl = (value: any) => {
    localAnchorEl = value;
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(localAnchorEl);

  const renderPopover = () => {
    if (requiresRestart) {
      return (
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper
          }}
          open={open}
          anchorEl={localAnchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          Client needs to be restarted if this parameter is changed
        </Popover>
      );
    }
    return <></>;
  };

  return <>{renderPopover()}</>;
};

export default ConfigurationFormPopover;
