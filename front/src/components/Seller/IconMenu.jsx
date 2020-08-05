import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconMenu = props => {
  const { path } = props;

  return (
    <nav className="icon-menu">
      <Link to={`${path}`} className="icon-menu__item">
        <FontAwesomeIcon icon="th-large" />
      </Link>

      <Link to={`${path}/users`} className="icon-menu__item">
        <FontAwesomeIcon icon="users" />
      </Link>

      <Link to={`${path}/products`} className="icon-menu__item">
        <FontAwesomeIcon icon="boxes" />
      </Link>

      <Link to={`${path}/products/add`} className="icon-menu__item">
        <FontAwesomeIcon icon="plus-square" />
      </Link>

      <Link to={`${path}/messages`} className="icon-menu__item">
        <FontAwesomeIcon icon="envelope" />
      </Link>

      <Link to={`${path}/profile`} className="icon-menu__item">
        <FontAwesomeIcon icon="user-cog" />
      </Link>
    </nav>
  );
};

export default IconMenu;
