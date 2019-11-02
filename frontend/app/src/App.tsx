import * as React from 'react';
// @ts-ignore
import { BrowserRouter, Route } from 'react-router-dom';
// @ts-ignore
import { CssBaseline } from '@material-ui/core';

import './styles.scss';
import Header from './Components/Header';
import MainPage from './Components/MainPage';
import ConfigurationPage from './Components/ConfigurationPage';


/**
 * Main App component
 */
// eslint-disable-next-line import/prefer-default-export
export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <CssBaseline />
        <Header />
        <Route path="/" exact component={MainPage} />
        <Route path="/configure" exact component={ConfigurationPage} />
      </BrowserRouter>
    );
  }
}
