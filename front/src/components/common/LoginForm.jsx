import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import TextInput from './inputs/TextInput';
import PasswordInput from './inputs/PasswordInput';
import Footer from '../common/Footer';

import '../../CSS/common/login.css';

const LoginForm = ({
  formIsValid,
  formControls,
  error,
  data,
  handleChange,
  handleSubmit
}) => {
  const { username, password } = formControls;

  if (data) {
    console.log(data);
    
    localStorage.setItem('user', JSON.stringify(data));
    if(data.isAdmin === true || (data.userType !== undefined && data.userType === 'seller')){
      window.location = `/admin`;
    }else{
      window.location = `/user/profile`;
    }
    //return false;
    // window.location = data.isAdmin ? `/admin` : (!data.isAdmin && data.userType === 'seller') ?  `/admin` : `/user/profile`;
  }

  return (
    <>
      <div className="form-wrapper">
        <h1 className="form-title">Welcome</h1>
        <div className="login-icon">
          <img
            src={'../../images/login-icon.png'}
            alt="icon"
            className="login-icon--image"
          />
        </div>
        {error ? <p className="error login-error">{error}</p> : null}
        <form
          onSubmit={handleSubmit}
          className="form-container form-container--login"
        >
          <TextInput
            type="text"
            name="username"
            defaultValue={username.value}
            placeholder={username.placeholder}
            touched={username.touched}
            valid={username.valid}
            onChange={handleChange}
            className="form-input form-input--login"
          />
          <PasswordInput
            type="password"
            name="password"
            defaultValue={password.value}
            placeholder={password.placeholder}
            touched={password.touched}
            valid={password.valid}
            onChange={handleChange}
            className="form-input form-input--login"
          />
          <button
            type="submit"
            disabled={!formIsValid}
            className="form-button form-button--login"
          >
            Login
          </button>
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="link">
              Register.
            </Link>
          </p>
        </form>
        {localStorage.user && (
          <Redirect to={`/users/${JSON.parse(localStorage.user)._id}/profile`} />
        )}
      </div>
    </>
  );
};

export default LoginForm;
