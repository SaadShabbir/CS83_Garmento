import React from 'react';
import withFormFunctional from './HOCs/withFormFunctional';
import LoginForm from './LoginForm';

const Login = props => {
  const formControls = {
    username: {
      value: '',
      placeholder: 'Username',
      validationRules: {
        isRequired: true
      }
    },
    password: {
      value: '',
      placeholder: 'Password',
      validationRules: {
        isRequired: true
      }
    }
  };

  const LoginWithFormFunctional = withFormFunctional(formControls)(LoginForm);
  return <LoginWithFormFunctional method="add" {...props} />;
};

export default Login;
