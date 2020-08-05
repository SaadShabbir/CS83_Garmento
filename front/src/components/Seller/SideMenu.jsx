import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = props => {
  const { path } = props;

  return (
    <nav className="side-menu sideDesgin">
      <Link to={`${path}`} className="side-menu__item">
        DashBoard
      </Link>

      <Link to={`${path}/users`} className="side-menu__item">
        Users
      </Link>

      <Link to={`${path}/products`} className="side-menu__item">
        Products
      </Link>

      <Link to={`${path}/products/add`} className="side-menu__item">
        Add Product
      </Link>

      <Link to={`${path}/messages`} className="side-menu__item">
        Messages
      </Link>
      <Link to={`${path}/tailors`} className="side-menu__item">
        Tailor
      </Link>
      <Link to={`${path}/offers`} className="side-menu__item">
        Offers
      </Link>
      <Link to={`${path}/settings`} className="side-menu__item">
        Settings
      </Link>
    </nav>
  );
};

export default SideMenu;
