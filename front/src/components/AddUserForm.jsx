import React from 'react';
import withFormFunctional from '../components/common/HOCs/withFormFunctional';
import RegiseterPage from './RegisterPage';

const AddUserForm = props => {
  const formControls = {
    name: {
      value: '',
      placeholder: 'Your Name',
      validationRules: {
        maxLength: 250,
        isRequired: true
      }
    },
    username: {
      value: '',
      placeholder: 'Choose an username',
      validationRules: {
        format: /^[a-zA-Z\-]+$/,
        isRequired: true
      }
    },
    email: {
      value: '',
      placeholder: 'Your Email',
      validationRules: {
        format: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        isRequired: true
      }
    },
    newPassword: {
      value: '',
      placeholder: 'Your Password',
      validationRules: {
        minLength: 8,
        maxLength: 30,
        isRequired: true
      }
    },
    repeatNewPassword: {
      value: '',
      placeholder: 'Repeat New Password',
      validationRules: {
        minLength: 8,
        maxLength: 30,
        matchPassword: true
      }
    },
    age: {
      value: '',
      placeholder: 'Age',
      validationRules: {
        format: /^[0-9]+$/,
        isRequired: true
      }
    },
    gender: {
      value: '',
      placeholder: 'Select Gender',
      validationRules: {
        // format: /^[a-zA-Z\-]+$/,
        isRequired: true
      }
    },
    userType: {
      value: '',
      placeholder: 'Select User Type',
      validationRules: {
        isRequired: true
      }
    },
    birthday: {
      value: '',
      placeholder: 'Date of your birth',
      validationRules: {
        format: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
        isRequired: true
      }
    },
    phone: {
      value: '',
      placeholder: 'Your mobile phone',
      validationRules: {
        format: /^\(?([0-9]{1})?[-. ]?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        isRequired: true
      }
    }
  };
  const UserFormWithFormFunctional = withFormFunctional(formControls)(
    RegiseterPage
  );

  return (
    <UserFormWithFormFunctional
      method="add"
      url={`${props.url}register`}
      // {...props}
    />
  );
};

export default AddUserForm;
