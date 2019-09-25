import * as React from 'react';
import './counter.scss';
import { Data } from '@estcube/data-components';

export class Counter extends React.Component {
    render() {
        return (
            <div className="counter common">
                This is the Counter component.

                <Data />
            </div>
        );
    }
}