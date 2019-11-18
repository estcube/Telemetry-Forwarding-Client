import React, { useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import SnackbarContentWrapper from './SnackbarContentWrapper';

interface ConfigurationSnackbarProps {
  type: 'success' | 'error';
}

/**
 * Component for displaying success/error messages when updating conf
 * @param type  string ('success'|'error')
 */
export default function ConfigurationSnackbar({ type }: ConfigurationSnackbarProps) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(true);
  });

  const handleClose = (event?: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const renderCorrectType = () => {
    if (type === 'success') {
      return (
        <SnackbarContentWrapper onClose={handleClose} variant="success" message="Configuration parameters updated!" />
      );
    }
    if (type === 'error') {
      return (
        <SnackbarContentWrapper
          onClose={handleClose}
          variant="error"
          message="Configuration parameters have not been updated!"
        />
      );
    }
    return <></>;
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {renderCorrectType()}
      </Snackbar>
    </div>
  );
}
