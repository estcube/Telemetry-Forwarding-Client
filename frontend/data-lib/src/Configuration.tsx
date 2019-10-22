import * as React from 'react';
import ConfigurationForm from './Configurations/ConfigurationForm';

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