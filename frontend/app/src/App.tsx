import * as React from 'react';
import './styles.scss';

import { Counter } from './components/Counter';

export class App extends React.Component {
    render() {
        return (
            <div className="app-root">
                <h1>Hello, World!</h1>
                <Counter />
            </div>
        )
    }
}
