import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route} from 'react-router-dom';

const Authenticated = ({isFetching, isAuthenticated, component, path, ...rest}) => (
  <Route path={path} render={() => {
    return isAuthenticated ?
      (React.createElement(component, {...rest, isFetching, isAuthenticated})) :
      (<Redirect to="/login"/>);
  }}/>
);

Authenticated.propTypes = {
  isFetching: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired
};

export default Authenticated;
