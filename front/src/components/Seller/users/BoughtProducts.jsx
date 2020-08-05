import React from 'react';
import { Link } from 'react-router-dom';

import '../../../CSS/adminPanel/table.css';

const BoughtProducts = ({ data, isLoading, error }) => {
  if (!data) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading ...</p>;
  }
  return (
    <div className="admin-home__main-section">
      <div className="table-wrapper">
        {error ? <p className="error">{error}</p> : null}
        <table className="table">
          <thead className="table__head">
            <tr className="table__row">
              <th>ID</th>
              <th>Title</th>
              <th>Quantity</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.boughtProducts.map(item => (
              <tr key={item.id} className="table__row">
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>
                  <Link
                    to={`/products/${item.id}`}
                    className="link--admin"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BoughtProducts;
