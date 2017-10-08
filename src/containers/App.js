import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Authenticated from '../containers/Authenticated';
import HomePage from '../containers/HomePage';
import FormCreatorPage from '../containers/FormCreatorPage';
import LoginPage from '../containers/LoginPage';
import SignUpPage from '../containers/SignUpPage';
import Nav from '../containers/Nav';
import customTheme from '../custom-theme';
import Public from './Public';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: props.width === LARGE
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {
    const {isAuthenticated, dispatch} = this.props;
    let {navDrawerOpen} = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    };
    return (
      <MuiThemeProvider muiTheme={customTheme}>
        <Router>
          <div>
            {isAuthenticated &&
            <Nav dispatch={dispatch} isOpen={navDrawerOpen} changeNavBar={() => this.handleChangeRequestNavDrawer()}/>}
            <div style={styles.container}>
              <Switch>
                <Authenticated path="/creator" component={FormCreatorPage}{...this.props}/>
                <Public path="/login" component={LoginPage} {...this.props}/>
                <Public path="/signup" component={SignUpPage} {...this.props}/>
                <Authenticated exac path="/" component={HomePage}{...this.props}/>
              </Switch>
            </div>
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
