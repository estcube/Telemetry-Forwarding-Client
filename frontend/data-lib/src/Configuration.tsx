import * as React from 'react';
import ConfigurationForm from './configurations/ConfigurationForm';
// @ts-ignore
import { Paper } from '@material-ui/core';


export class Configuration extends React.Component {
  render() {
    return (
      <div>
        <Paper>
          <ConfigurationForm />
        </Paper>
      </div>
    );
  }
}