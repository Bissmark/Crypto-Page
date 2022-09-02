import React from 'react'
import { Route, Link } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  
  function hasJWT() {
    let flag = false;

    // Check user has a JWT token
    localStorage.getItem('token') ? flag=true : flag=false;

    return flag;
  }

  return (
    <Route
      {...rest}
      render={ props => (
        hasJWT() ?
        <Component {...props} />
        :
        <Link to={{ pathname: '/login' }} />
      )}
    />
  );
};

export default PrivateRoute;