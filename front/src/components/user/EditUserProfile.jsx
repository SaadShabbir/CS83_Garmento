import React, { Component } from 'react';
import withFormFunctional from '../common/HOCs/withFormFunctional';
import UserForm from '../UserForm';
import axios from 'axios';

class EditUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      user: null,
      error: null
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    console.log(this.props);
    const id = this.props.match.params.id;
    axios
      .get(`${this.props.url}/${id}`)
      .then(result => {
        this.setState({ user: result.data, isLoading: false });
      })
      .catch(error => this.setState({ error: error, isLoading: false }));
  }

  render() {
    const { isLoading, error, user } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>error</p>;
    }
    if (!user) {
      return <p>Loading...</p>;
    }
    const formControls = {
      name: {
        value: user.name,
        placeholder: 'Your Name',
        validationRules: {
          maxLength: 250,
          isRequired: true
        }
      },
      username: {
        value: user.username,
        placeholder: 'Choose an username',
        validationRules: {
          format: /^[a-zA-Z\-]+$/,
          isRequired: true
        }
      },
      email: {
        value: user.email,
        placeholder: 'Your Email',
        validationRules: {
          format: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          isRequired: true
        }
      },

      age: {
        value: user.age,
        placeholder: 'Age',
        validationRules: {
          format: /^[0-9]+$/,
          isRequired: true
        }
      },
      birthday: {
        value: user.birthday,
        placeholder: 'Date of your birth',
        validationRules: {
          format: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
          isRequired: true
        }
      },
      phone: {
        value: user.phone,
        placeholder: 'Your mobile phone',
        validationRules: {
          format: /^\(?([0-9]{1})?[-. ]?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
          isRequired: true
        },
        oldPassword: {
          value: '',
          placeholder: 'Old Password'
        },
        newPassword: {
          value: '',
          placeholder: 'New Password',
          validationRules: {
            minLength: 8,
            maxLength: 30
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
        }
      }
    };
    const UserFormWithFormFunctional = withFormFunctional(formControls)(
      UserForm
    );
    return (
      <UserFormWithFormFunctional
        method="edit"
        url={`${this.props.url}/users/${user.id}`}
      />
    );
  }
}

export default EditUserForm;
