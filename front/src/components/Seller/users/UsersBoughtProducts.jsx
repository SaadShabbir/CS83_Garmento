import React from 'react';
import withFetching from '../../common/HOCs/withFetching';
import BoughtProducts from './BoughtProducts';

const UsersBoughtProducts = props => {
  const id = props.match.params.id;
  const DEFAULT_QUERY = `users/${id}`;
  const UsersBoughtProductsWithFetch = withFetching(DEFAULT_QUERY)(
    BoughtProducts
  );
  return <UsersBoughtProductsWithFetch {...props} />;
};

export default UsersBoughtProducts;
