import React from 'react';
import SweetAlert from 'sweetalert2-react';
import TextInput from './../common/inputs/PasswordInput';
import '../../CSS/contact/ContactForm.css';

class TailorForm extends React.Component {
  state = {
    show: false,
    message: null,
    notSend: 'Please check your email!',
    formControls: {
      title: '',
      text: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
    },
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const date = new Date();
    const dateString = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split('T')[0];
    const body = {
      ...this.state.formControls,
      dateSent: dateString,
    };
    fetch('http://localhost:5000/api/admin/tailors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  };
  onChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    const formControls = { ...this.state.formControls };
    formControls[name] = value;
    if (name == 'email') {
      if (this.validateEmail(value)) {
        this.state.message = 'Your message has been sent succesfully!';
      } else {
        this.state.message = this.state.notSend;
      }
    }

    this.setState({ formControls });
  };
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  formAlert() {
    this.setState({ show: false });
  }
  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row ml-auto mr-5">
            <form action="" method="POST" onSubmit={this.handleSubmit}>
              <div className="form__row--nameTitle">
                <label className="label">Name *</label>
              </div>
              <div className="form__row--name">
                <div className="form__row--left">
                  <input
                    name="name"
                    type="text"
                    onChange={(event) => this.onChange(event)}
                    className="contact-input"
                  />
                  <label className="label" className="label__little">
                    First Name
                  </label>
                </div>
                <div className="form__row--right">
                  <input
                    name="surname"
                    type="text"
                    onChange={(event) => this.onChange(event)}
                    className="contact-input"
                  />
                  <label className="label" className="label__little">
                    Last Name
                  </label>
                </div>
              </div>
              <div className="form__row">
                <label className="label">Email Address *</label>
              </div>
              <div className="form__row">
                <input
                  name="email"
                  type="text"
                  onChange={(event) => this.onChange(event)}
                  className="contact-input"
                />
              </div>
              <div className="form__row">
                <label className="label">House Address *</label>
              </div>
              <div className="form__row">
                <input
                  name="title"
                  type="text"
                  onChange={(event) => this.onChange(event)}
                  className="contact-input"
                />
              </div>
              <div className="form__row">
                <label className="label">Phone number *</label>
              </div>
              <div className="form_row">
                <input
                  name="title"
                  type="text"
                  onChange={(event) => this.onChange(event)}
                  className="contact-input"
                />
              </div>
              <div className="form__row">
                <button
                  className="black-white-button"
                  type="submit"
                  onClick={() => this.setState({ show: true })}
                >
                  Submit
                </button>
                <SweetAlert
                  show={this.state.show}
                  title="Notification"
                  text={this.state.message}
                  onConfirm={() => this.formAlert()}
                />
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default TailorForm;
