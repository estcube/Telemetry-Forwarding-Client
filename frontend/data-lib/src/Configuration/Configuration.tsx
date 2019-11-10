import * as React from 'react';
import ConfigurationForm from './ConfigurationForm';

/**
 * Component for configuring the backend client
 */
export default class Configuration extends React.Component {
  render() {
    return (
      <div>
        <div className="conf-form" data-testid="conf-form">
          <ConfigurationForm mcsFormName="Mission Control" tncFormName="TNC Interface" formsHeader="Configuration" />
        </div>
      </div>
    );
  }
}
