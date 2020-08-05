import React from 'react';
import withFetching from '../common/HOCs/withFetching';
import '../../CSS/user/userProfile.css';

const SellerProfile = ({ data, isLoading, errors, match }) => {
  if (!data) {
    return <p>Loading ...</p>;
  }

  if (isLoading) {
    return <p>Loading ...</p>;
  }
  const { name, username, email, password, age,type, birthday, phone } = data;
  return (
    <>
      {errors
        ? errors.map(error => <p key={error.id}>{error.message}</p>)
        : null}
      <div className="user-profile--wrapper">
        <h1 className="profile-title">Your Profile</h1>
        <div className="profile-container">
          <div className="profile-input">
            <p className="profile-input__header">Name</p>
            <p>{name}</p>
          </div>
          <div className="profile-input">
            <p className="profile-input__header">Username</p>
            <p>{username}</p>
          </div>
          <div className="profile-input">
            <p className="profile-input__header">Email</p>
            <p>{email}</p>
          </div>
          {/* <div className="profile-input">
            <p className="profile-input__header">Password</p>
            <p>{password}</p>
          </div> */}
          <div className="profile-input">
            <p className="profile-input__header">Age</p>
            <p>{age}</p>
          </div>
          <div className="profile-input">
            <p className="profile-input__header">You are</p>
            <p>{type}</p>
          </div>
          <div className="profile-input">
            <p className="profile-input__header">Birthday</p>
            <p>{birthday}</p>
          </div>
          <div className="profile-input">
            <p className="profile-input__header">Type</p>
            <p>{type}</p>
          </div>
          <div className="profile-input">
            <p className="profile-input__header">Phone</p>
            <p>{phone}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const DEFAULT_QUERY = 'seller';
const SellerProfileWithFetch = withFetching(DEFAULT_QUERY)(SellerProfile);

export default SellerProfileWithFetch;
