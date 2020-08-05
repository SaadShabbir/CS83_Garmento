import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import UserProfile from './UserProfile';
import Cart from './Cart';
import Checkout from './Checkout';

const API = `http://localhost:5000/api/`;

class AdminHome extends Component {
  render() {
    const { path } = this.props.match;

    return (
      <>
        <Route
          path={`${path}`}
          exact
          render={props => <UserProfile {...props} url={API} />}
        />
        <Route
          path={`${path}/cart`}
          exact
          render={props => <Cart {...props} url={API} />}
        />
        <Route
          path={`${path}/cart/checkout`}
          exact
          render={props => <Checkout {...props} url={API} />}
        />
      </>
    );
  }
}

export default AdminHome;
