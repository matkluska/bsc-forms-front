import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route, withRouter} from 'react-router-dom';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import Nav from './Nav';


class Authenticated extends React.Component {
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
    const {isAuthenticated, isFetching, dispatch, component, path} = this.props;
    let {navDrawerOpen} = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    };

    return (
      <div>
        {isAuthenticated &&
        <Nav dispatch={dispatch} isOpen={navDrawerOpen} changeNavBar={() => this.handleChangeRequestNavDrawer()}/>}
        <div style={styles.container}>
          <Route path={path} render={() => {
            return isAuthenticated ?
              (React.createElement(withRouter(component), {...this.props, isFetching, isAuthenticated})) :
              (<Redirect to="/login"/>)
          }}/>
        </div>
      </div>
    )
  }
}

Authenticated.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired
};

export default withWidth()(Authenticated);
