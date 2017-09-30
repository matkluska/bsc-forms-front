import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route} from 'react-router-dom';

const Authenticated = ({isFetching, isAuthenticated, component, ...rest}) => (
  <Route {...rest} render={(props) => {
    return isAuthenticated ?
      (React.createElement(component, {...props, isFetching, isAuthenticated})) :
      (<Redirect to="/login"/>);
  }}/>
);

Authenticated.propTypes = {
  isFetching: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  component: PropTypes.func
};

export default Authenticated;
