import * as React from 'react';
import './counter.scss';
import { Data } from '@estcube/data-components';
import Button from '@material-ui/core/Button';

export class Counter extends React.Component {
  render() {
    return (
      <div className="counter common">
        This is the Counter component with a Material button!
		<Button variant="contained" color="primary">
			A button!
		</Button>	
        <Data />
      </div>
    );
  }
}