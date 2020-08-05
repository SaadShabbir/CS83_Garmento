import React from 'react';
import TextInput from './common/inputs/TextInput';
import PasswordInput from './common/inputs/PasswordInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserForm = ({
  formIsValid,
  formControls,
  isLoading,
  error,
  done,
  handleChange,
  handleSubmit
}) => {
  const {
    name,
    username,
    email,
    password,
    age,
    birthday,
    phone
  } = formControls;

  return (
    <>
      <div className="form-wrapper">
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
            type="text"
            name="newPassword"
            maxLength={password.validationRules.maxLength}
            defaultValue={password.value}
            placeholder={password.placeholder}
            touched={password.touched}
            valid={password.valid}
            onChange={handleChange}
            className="form-input"
          />
          <PasswordInput
            type="text"
            name="repeatNewPassword"
            maxLength={password.validationRules.maxLength}
            defaultValue={password.value}
            placeholder={password.placeholder}
            touched={password.touched}
            valid={password.valid}
            onChange={handleChange}
            className="form-input"
          />
          <TextInput
            type="text"
            name="age"
            maxLength={age.validationRules.maxLength}
            defaultValue={age.value}
            placeholder={age.placeholder}
            touched={age.touched}
            valid={age.valid}
            onChange={handleChange}
            className="form-input"
          />
          <TextInput
            type="text"
            name="birthday"
            maxLength={birthday.validationRules.maxLength}
            defaultValue={birthday.value}
            placeholder={birthday.placeholder}
            touched={birthday.touched}
            valid={birthday.valid}
            onChange={handleChange}
            className="form-input"
          />
          <TextInput
            type="text"
            name="phone"
            maxLength={phone.validationRules.maxLength}
            defaultValue={phone.value}
            placeholder={phone.placeholder}
            touched={phone.touched}
            valid={phone.valid}
            onChange={handleChange}
            className="form-input"
          />

          <button type="submit" disabled={!formIsValid} className="form-button">
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
    </>
  );
};
export default UserForm;
