import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline, createStyles, withStyles, WithStyles } from '@material-ui/core';
import 'typeface-roboto';
import { SnackbarProvider } from 'notistack';
import './styles.scss';
import Footer from './Components/Footer';
import Header from './Components/Header';
import MainPage from './Components/MainPage';
import ConfigurationPage from './Components/ConfigurationPage';
import ControlsPage from './Components/ControlsPage';
import PageNotFound from './Components/PageNotFound';

const styles = () =>
  createStyles({
    main: {
      // minHeight: 'calc(100vh - 64px - 145px)'
      flexGrow: 1
    },
    root: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }
  });

/**
 * Main App component
 */
class App extends React.Component<WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props;

    return (
      <BrowserRouter>
        <CssBaseline />
        <SnackbarProvider>
          <div className={classes.root}>
            <Header />
            <div className={classes.main}>
              <Switch>
                <Switch path="/" exact>
                  <MainPage />
                </Route>
                <Switch path="/controls" exact>
                  <ControlsPage />
                </Route>
                <Switch path="/configure" exact>
                  <ConfigurationPage />
                </Route>
                <Switch path="/*">
                  <PageNotFound />
                </Route>
              </Switch>
            </div>
            <Footer />
          </div>
        </SnackbarProvider>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);
