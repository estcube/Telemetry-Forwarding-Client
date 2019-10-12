import * as React from 'react';
import { Data } from '@estcube/data-components';
import '../styles.scss';

export class MainPage extends React.Component {
  render() {
    return (
      <div className="common">
        <Data />
      </div>
    );
  }
}