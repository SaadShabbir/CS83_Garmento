import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import SideMenu from './SideMenu';
import UsersList from './users/UsersList';
import UsersBoughtProducts from './users/UsersBoughtProducts';
import AddProductForm from './products/AddProductForm';
import EditProductForm from './products/EditProductForm';
import Messages from './messages/Messages';
import EditAdminProfileForm from './profile/EditAdminProfileForm';
import Dashboard from './Dashboard';
import IconMenu from './IconMenu';
import ProductList from '../shop/ProductList';

const API = `http://localhost:5000/api/`;

class AdminHome2 extends Component {
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
          path={`${path}/users`}
          exact
          render={props => <UsersList {...props} url={API} />}
        />
        <Route
          path={`${path}/users/:id/boughtProducts`}
          exact
          render={props => <UsersBoughtProducts {...props} url={API} />}
        />
        <Route
          path={`${path}/products`}
          exact
          render={props => (
            <div className="admin-home__main-section admin-home__main-section--no-margin-top">
              <ProductList editable={true} URLtoEdit={`${path}/products`} />
            </div>
          )}
        />
        <Route
          path={`${path}/products/add`}
          render={props => <AddProductForm {...props} url={`${API}products`} />}
        />
        <Route
          path={`${path}/products/:id/edit`}
          exact
          render={props => (
            <EditProductForm {...props} url={`${API}products`} />
          )}
        />
        <Route
          path={`${path}/messages`}
          render={props => <Messages {...props} url={API} />}
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

export default AdminHome2;
