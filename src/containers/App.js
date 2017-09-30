import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Authenticated from '../containers/Authenticated';
import HomePage from '../containers/HomePage';
import FormCreatorPage from '../containers/FormCreatorPage';
import LoginPage from '../containers/LoginPage';
import Nav from '../containers/Nav';
import customTheme from '../custom-theme';

class App extends React.Component {
  render() {
    const {isAuthenticated, dispatch} = this.props;
    return (
      <MuiThemeProvider muiTheme={customTheme}>
        <Router>
          <div className="container">
            {isAuthenticated && <Nav dispatch={dispatch}/>}
            <Switch>
              <Authenticated path="/creator" component={FormCreatorPage}{...this.props}/>
              <Route path="/login" render={() => (
                <LoginPage dispatch={dispatch}
                           isAuthenticated={isAuthenticated}/>
              )}/>
              <Authenticated exac path="/" component={HomePage}{...this.props}/>
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool,
  errorMessage: PropTypes.string
};

function mapStateToProps(state) {

  const {auth} = state;
  const {isAuthenticated, isFetching, errorMessage} = auth;

  return {
    isAuthenticated,
    isFetching,
    errorMessage
  }
}

export default connect(mapStateToProps)(App)
