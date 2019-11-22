import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import './styles.scss';
import Header from './Components/Header';
import MainPage from './Components/MainPage';
import ConfigurationPage from './Components/ConfigurationPage';

/**
 * Main App component
 */
export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <CssBaseline />
        <Header />
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/configure" exact>
          <ConfigurationPage />
        </Route>
      </BrowserRouter>
    );
  }
}
