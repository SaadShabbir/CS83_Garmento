import React from 'react';
import withFetching from '../../common/HOCs/withFetching';
import SellerTableRow from './SellerTableRow';

import '../../../CSS/adminPanel/table.css';

const SellersList = ({
  data,
  isLoading,
  error,
  handleDelete,
  handleEdit,
  changeStatus,
  match,
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
                {/* <th>ID</th> */}
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <SellerTableRow
                  key={item.id}
                  item={item}
                  onDelete={() => handleDelete(item.id)}
                  changeStatus = {() => changeStatus(item._id, item.approved_status)}
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

const DEFAULT_QUERY = `sellers`;
const SellersListWithFetch = withFetching(DEFAULT_QUERY)(SellersList);

export default SellersListWithFetch;
