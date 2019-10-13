import * as React from 'react';
import { Configuration } from '@estcube/data-components';
import '../styles.scss';

export class ConfigurationPage extends React.Component {
  render() {
    return (
      <div className="common">
        <Configuration />
      </div>
    );
  }
}