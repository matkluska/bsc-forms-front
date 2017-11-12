import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Authenticated from './Authenticated';
import FormCreatorPage from './FormCreatorPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import customTheme from '../custom-theme';
import Public from './Public';
import withWidth from 'material-ui/utils/withWidth';
import FormReplyPage from './FormReplyPage';
import ListFormsPage from './ListFormsPage';
import FormStatsPage from './FormStatsPage';


class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={customTheme}>
        <Router basename='/'>
          <div>
            <Switch>
              <Authenticated path="/creator" component={FormCreatorPage}{...this.props}/>
              <Public path="/login" component={LoginPage} {...this.props}/>
              <Public path="/signup" component={SignUpPage} {...this.props}/>
              <Public path="/form/:formId" component={FormReplyPage} {...this.props}/>
              <Authenticated path="/stats/:formId" component={FormStatsPage} {...this.props}/>
              <Authenticated exac path="/" component={ListFormsPage}{...this.props}/>
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
  errorMessage: PropTypes.string,
  children: PropTypes.element,
  width: PropTypes.number
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

export default withWidth()(connect(mapStateToProps)(App));
