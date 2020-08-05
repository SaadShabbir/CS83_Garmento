import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditableCell from '../../common/inputs/EditableCell';
import { Link } from 'react-router-dom';

class UsersTableRow extends Component {
  render() {
    const { item, onDelete, match, className } = this.props;
    console.log(item)
    return (
      <>
        {!item.isAdmin ? (
          <tr className={className}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td className="table__row__cell--fixed-width">
              <EditableCell
                onEdit={this.props.onEdit}
                item={item}
                value={item.username}
                name="username"
                className="table__row__cell--icon"
              />
            </td>
            <td>{item.email}</td>
            <td className="table__row__cell--fixed-width">{item.phone}</td>
            <td>
              {item.boughtProducts && item.boughtProducts.length > 0 ? (
                <Link
                  to={`${match.path}/${item.id}/boughtProducts`}
                  className="link--admin"
                >
                  See List
                </Link>
              ) : (
                'None'
              )}
            </td>
            <td>{item.cart.length > 0 ? 'Active' : 'Empty'}</td>
            <td className="table__row__cell--icon">
              <FontAwesomeIcon
                icon="trash-alt"
                className="icon"
                onClick={onDelete}
              />
            </td>
          </tr>
        ) : null}
      </>
    );
  }
}

export default UsersTableRow;
