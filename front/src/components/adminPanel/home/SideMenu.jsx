import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = props => {
  const { path } = props;
  let user = JSON.parse(localStorage.getItem("user"));
  let isAdmin = user.isAdmin;
  return (
    <nav className="side-menu sideDesgin">
      <Link to={`${path}`} className="side-menu__item">
        DashBoard
      </Link>

     {isAdmin == true && <Link to={`${path}/users`} className="side-menu__item">
        Buyers
      </Link>}

      {isAdmin == true && <Link to={`${path}/sellers`} className="side-menu__item">
        Sellers
      </Link>}

      <Link to={`${path}/products`} className="side-menu__item">
        Products
      </Link>

      <Link to={`${path}/products/add`} className="side-menu__item">
        Add Product
      </Link>

      <Link to={`${path}/products/orders`} className="side-menu__item">
        Orders
      </Link>

      {isAdmin == true &&<Link to={`${path}/messages`} className="side-menu__item">
        Messages
      </Link>}
      {/* {isAdmin == true &&<Link to={`${path}/tailors`} className="side-menu__item">
        Tailor
      </Link>} */}
      {/* {isAdmin == true &&<Link to={`${path}/offers`} className="side-menu__item">
        Wholesale
      </Link>} */}
      {isAdmin == true &&<Link to={`${path}/settings`} className="side-menu__item">
        Settings
      </Link>}
    </nav>
  );
};

export default SideMenu;
