import React, { Component } from 'react';
import withFormFunctional from '../../common/HOCs/withFormFunctional';
import AdminProfileForm from './AdminProfileForm';
import axios from 'axios';

class EditAdminProfileForm extends Component {
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
    // const id = this.props.match.params.id;
    axios
      .get(`${this.props.url}users/0`)
      .then(result => {
        this.setState({ user: result.data, isLoading: false });
      })
      .catch(error =>
        this.setState({ error: error.response.data.message, isLoading: false })
      );
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
        placeholder: 'Name',
        validationRules: {
          format: /^[a-zA-Z][a-zA-Z\s]*$/,
          isRequired: true
        },
        touched: true
      },
      username: {
        value: user.username,
        placeholder: 'Username',
        validationRules: {
          isRequired: true
        },
        touched: true
      },
      email: {
        value: user.email,
        placeholder: 'Email',
        validationRules: {
          format: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          isRequired: true
        },
        touched: true
      },
      oldPassword: {
        value: '',
        placeholder: 'Old Password'
      },
      newPassword: {
        value: '',
        placeholder: 'New Password',
        validationRules: {
          minLength: 6,
          maxLength: 30
        }
      },
      repeatNewPassword: {
        value: '',
        placeholder: 'Repeat New Password',
        validationRules: {
          minLength: 6,
          maxLength: 30,
          matchPassword: true
        }
      }
    };
    const AdminProfileFormWithFormFunctional = withFormFunctional(formControls)(
      AdminProfileForm
    );
    return (
      <AdminProfileFormWithFormFunctional
        method="edit"
        url={`${this.props.url}users/0`}
        // {...this.props}
      />
    );
  }
}

export default EditAdminProfileForm;
