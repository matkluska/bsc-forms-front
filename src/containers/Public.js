import React from 'react';
import PropTypes from 'prop-types';
import {Route, withRouter} from 'react-router-dom';

const Public = ({component, path, ...rest}) => (
  <Route path={path} render={() => {
    return React.createElement(withRouter(component), {...rest})
  }}/>
);

Public.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired
};

export default Public;
