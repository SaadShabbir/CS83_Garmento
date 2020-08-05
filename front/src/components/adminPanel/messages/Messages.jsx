import React from 'react';
import withFetching from '../../common/HOCs/withFetching';
import Message from './Message';

import '../../../CSS/adminPanel/messages.css';

const Messages = ({ data, isLoading, error, handleDelete }) => {
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
            <Message
              key={item._id}
              item={item}
              onDelete={() => handleDelete(item._id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const DEFAULT_QUERY = `admin/messages`;
const MessagesWithFetch = withFetching(DEFAULT_QUERY)(Messages);

export default MessagesWithFetch;
