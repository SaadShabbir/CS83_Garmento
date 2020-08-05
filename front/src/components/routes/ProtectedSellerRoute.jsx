import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedSellerRoute = ({
  component: Component,
  seller,
  ...restProps
}) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Route
      {...restProps}
      render={props =>
        user && !user.seller ? (
          <Component {...restProps} {...props} />
        ) : (
          <Redirect to={`/login`} />
        )
      }
    />
  );
};

export default ProtectedSellerRoute;
