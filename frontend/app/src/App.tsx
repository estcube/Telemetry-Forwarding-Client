import * as React from 'react';
// @ts-ignore
import { Router, Route } from 'react-router-dom';
// @ts-ignore
import { createBrowserHistory } from 'history';
import { CssBaseline } from '@material-ui/core';

import './styles.scss';
import Header from 'components/Header';
import { MainPage } from 'components/MainPage';
import { ConfigurationPage } from 'components/ConfigurationPage';


export class App extends React.Component {

  customHistory = createBrowserHistory();
  render() {
    return (
      /*<Container maxWidth="xl" className="app-root">*/
      <Router history={this.customHistory}>
        <CssBaseline />
        <Header />
        <Route path="/" exact component={MainPage}/>
        <Route path="/configure" exact component={ConfigurationPage}/>
      </Router>
      /*</Container>*/
    );
  }
}
