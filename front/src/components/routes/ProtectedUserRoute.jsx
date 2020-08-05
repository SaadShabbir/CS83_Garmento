import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedUserRoute = ({
  component: Component,
  isAdmin,
  ...restProps
}) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Route
      {...restProps}
      render={props =>
        user && !user.isAdmin && user.userType == "user"  ? (
          <Component {...restProps} {...props} />
        ) : (
          <Redirect to={`/login`} />
        )
      }
    />
  );
};

export default ProtectedUserRoute;
