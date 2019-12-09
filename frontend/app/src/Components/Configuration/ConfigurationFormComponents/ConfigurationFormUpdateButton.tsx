import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';

interface ConfigurationFormUpdateButtonProps {
  confPostLoading: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  allowPosting: boolean;
  classes: { [key: string]: any };
}

/**
 * Component for rendering update button on configuration page.
 */
class ConfigurationFormUpdateButton extends React.Component<ConfigurationFormUpdateButtonProps> {
  render() {
    const { confPostLoading, classes, handleClick, allowPosting } = this.props;
    if (!allowPosting) {
      return null;
    }
    if (!confPostLoading) {
      return (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={event => {
            handleClick(event);
          }}
        >
          Update configuration
        </Button>
      );
    }
    return <CircularProgress data-testid="confDiv" />;
  }
}

export default ConfigurationFormUpdateButton;
