import React from 'react';
import TextInput from '../../common/inputs/TextInput';
import PasswordInput from '../../common/inputs/PasswordInput';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../../CSS/common/form.css';

const AdminProfileForm = ({
  formIsValid,
  formControls,
  isLoading,
  done,
  error,
  handleChange,
  handleSubmit
}) => {
  const {
    name,
    username,
    email,
    oldPassword,
    newPassword,
    repeatNewPassword
  } = formControls;

  return (
    <>
      <div className="admin-home__main-section ">
        <div className="form-wrapper--inside form-wrapper">
          <h1 className="form-title">Edit Settings</h1>
          {error ? <p className="error">{error}</p> : null}
          <form onSubmit={handleSubmit} className="form-container">
            <TextInput
              type="text"
              name="name"
              defaultValue={name.value}
              placeholder={name.placeholder}
              touched={name.touched}
              valid={name.valid}
              onChange={handleChange}
              className="form-input"
            />
            <TextInput
              type="text"
              name="username"
              defaultValue={username.value}
              placeholder={username.placeholder}
              touched={username.touched}
              valid={username.valid}
              onChange={handleChange}
              className="form-input"
            />
            <TextInput
              type="text"
              name="email"
              defaultValue={email.value}
              placeholder={email.placeholder}
              touched={email.touched}
              valid={email.valid}
              onChange={handleChange}
              className="form-input"
            />
            <PasswordInput
              type="password"
              name="oldPassword"
              defaultValue={oldPassword.value}
              placeholder={oldPassword.placeholder}
              touched={oldPassword.touched}
              valid={oldPassword.valid}
              onChange={handleChange}
              className="form-input"
            />
            <PasswordInput
              type="password"
              name="newPassword"
              defaultValue={newPassword.value}
              placeholder={`${newPassword.placeholder} (at least 6 characters)`}
              touched={newPassword.touched}
              valid={newPassword.valid}
              onChange={handleChange}
              className="form-input"
            />
            <PasswordInput
              type="password"
              name="repeatNewPassword"
              defaultValue={repeatNewPassword.value}
              placeholder={repeatNewPassword.placeholder}
              touched={repeatNewPassword.touched}
              valid={repeatNewPassword.valid}
              onChange={handleChange}
              className="form-input"
            />
            <button
              type="submit"
              disabled={!formIsValid}
              className="form-button"
            >
              {isLoading ? (
                <FontAwesomeIcon icon="spinner" spin />
              ) : done ? (
                <FontAwesomeIcon icon="check" />
              ) : (
                'Save'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminProfileForm;
