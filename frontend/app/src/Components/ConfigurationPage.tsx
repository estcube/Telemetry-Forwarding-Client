import * as React from 'react';
import { Configuration } from '@estcube/data-components';

/**
 * View for configuring client
 */
class ConfigurationPage extends React.Component {
  render() {
    return (
      <div data-testid="confDiv">
        <Configuration />
      </div>
    );
  }
}

export default ConfigurationPage;
