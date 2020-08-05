import React from 'react';
import withFetching from '../../common/HOCs/withFetching';
import UsersTableRow from './UsersTableRow';

import '../../../CSS/adminPanel/table.css';

const UsersList = ({
  data,
  isLoading,
  error,
  handleDelete,
  handleEdit,
  match
}) => {
  if (!data) {
    return <p>Loading ...</p>;
  }

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <div className="admin-home__main-section">
        <div className="table-wrapper">
          {error ? <p className="error">{error}</p> : null}
          <table className="table">
            <thead className="table__head">
              <tr className="table__row">
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Products</th>
                <th>Cart Stat</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <UsersTableRow
                  key={item.id}
                  item={item}
                  onDelete={() => handleDelete(item.id)}
                  onEdit={handleEdit}
                  match={match}
                  className="table__row"
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const DEFAULT_QUERY = `users`;
const UsersListWithFetch = withFetching(DEFAULT_QUERY)(UsersList);

export default UsersListWithFetch;
