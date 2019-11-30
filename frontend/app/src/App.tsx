import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import './styles.scss';
import TNCStatus from 'Components/TNCStatus';
import Header from './Components/Header';
import MainPage from './Components/MainPage';
import ConfigurationPage from './Components/ConfigurationPage';
import PageNotFound from './Components/PageNotFound';

/**
 * Main App component
 */
export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <CssBaseline />
        <Header />
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/sids">
            <TNCStatus />
          </Route>
          <Route path="/configure" exact>
            <ConfigurationPage />
          </Route>
          <Route path="/*">
            <PageNotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
