import React, { useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import SnackbarContentWrapper from './SnackbarContentWrapper';

interface ConfigurationSnackbarProps {
  type: 'success' | 'error';
  text: string;
}

/**
 * Component for displaying success/error messages when updating conf
 * @param type  string ('success'|'error')
 */
export default function ConfigurationSnackbar({ type, text }: ConfigurationSnackbarProps) {
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
      return <SnackbarContentWrapper onClose={handleClose} variant="success" message={text} />;
    }
    if (type === 'error') {
      return (
        <SnackbarContentWrapper onClose={handleClose} variant="error" message={`Configuration not updated! ${text}`} />
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
        autoHideDuration={10000}
        onClose={handleClose}
      >
        {renderCorrectType()}
      </Snackbar>
    </div>
  );
}
