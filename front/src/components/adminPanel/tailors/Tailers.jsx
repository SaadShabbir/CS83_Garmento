import React from 'react';
import withFetching from '../../common/HOCs/withFetching';
import Tailor from './Tailor';

import '../../../CSS/adminPanel/messages.css';

const Tailers = ({ data, isLoading, error, handleDelete }) => {
  if (!data) {
    return <p>Loading ...</p>;
  }

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <div className="admin-home__main-section">
        <div className="messages-wrapper">
          {error ? <p className="error">{error}</p> : null}

          {data.map(item => (
            <Tailor
              key={item.id}
              item={item}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const DEFAULT_QUERY = `admin/tailors`;
const MessagesWithFetch = withFetching(DEFAULT_QUERY)(Tailers);

export default MessagesWithFetch;
