import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedAdminRoute = ({
  component: Component,
  isAdmin,
  ...restProps
}) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Route
      // exact
      {...restProps}
      render={props =>
        user && user.isAdmin || user.userType == "seller" ? (
          <Component {...restProps} {...props} />
        ) : (
          <Redirect to={`/login`} />
        )
      }
    />
  );
};

export default ProtectedAdminRoute;
