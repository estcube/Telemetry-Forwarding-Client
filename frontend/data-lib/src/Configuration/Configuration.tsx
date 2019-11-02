import * as React from 'react';
import ConfigurationForm from './ConfigurationForm';


/**
 * Component for configuring the backend client
 */
// eslint-disable-next-line import/prefer-default-export
export class Configuration extends React.Component {
  render() {
    return (
      <div>
        <div className="conf-form">
          <ConfigurationForm />
        </div>
      </div>
    );
  }
}
