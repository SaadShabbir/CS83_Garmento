import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Message extends Component {
  render() {
    const { item, onDelete } = this.props;
    const { title, name, surname, email, dateSent, text } = item;
    return (
      <>
        <div className="message">
          <div className="message__item">
            <p className="message__item__content--title">Title</p>{' '}
            <p className="message__item__content--value">{title}</p>
          </div>
          <div className="message__item">
            <p className="message__item__content--title">Name</p>{' '}
            <p className="message__item__content--value">{`${name} ${surname}`}</p>
          </div>
          <div className="message__item">
            <p className="message__item__content--title">Email</p>{' '}
            <p className="message__item__content--value">{email}</p>
          </div>
          <div className="message__item">
            <p className="message__item__content--title">Date Sent</p>{' '}
            <p className="message__item__content--value">{dateSent}</p>
          </div>
          <div className="message__item message__item__content--messaage-text">
            {text}
          </div>
          <div>
            <FontAwesomeIcon
              icon="trash-alt"
              className="icon message__item__content--delete"
              onClick={onDelete}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Message;
