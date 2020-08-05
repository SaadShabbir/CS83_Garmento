import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import SideMenu from './SideMenu';
import Dashboard from './Dashboard';
import IconMenu from './IconMenu';
import EditAdminProfileForm from './../Seller/profile/EditAdminProfileForm';

const API = `http://localhost:5000/api/`;

class SellerHome extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  render() {
    const { path } = this.props.match;

    return (
      <>
        <main className="admin-home">
          {this.state.width > 570 ? (
            <SideMenu path={path} />
          ) : (
            <IconMenu path={path} />
          )}
        </main>
        <Route
          path={`${path}`}
          exact
          render={props => <Dashboard {...props} url={API} />}
        />
        <Route
          path={`${path}/settings`}
          exact
          render={props => <EditAdminProfileForm {...props} url={API} />}
        />
      </>
    );
  }
}

export default SellerHome;