import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../CSS/adminPanel/products.css';

export default class Product2 extends Component {
  render() {
    const { _id, title, images, price } = this.props.item;
    const { onProductClick, editable, URLtoEdit } = this.props;
    const imagesArr = images.split(',');
    if (!imagesArr) {
      return <p>Loading...</p>;
    }
    const editableClass = editable ? 'product-editable' : ' ';
    return (
      <>
        <div
          // onClick={() => {
          //   onProductClick(id);
          // }}
          className={`main--container--product ${editableClass}`}
          id="main--container--product"
        >
          <img
            className={`main--container--product--image `}
            id="first--img"
            src={`../${imagesArr[0]}`}
            alt="sdv"
          />
          {editable && (
            <div className="edit-product">
              <Link to={`${URLtoEdit}/${_id}/edit`}>
                <FontAwesomeIcon icon="edit" className="edit-product__icon" />
              </Link>
            </div>
          )}
          <img
            className="main--container--product--image display--none"
            id="hover--img"
            src={`../${imagesArr[1]}`}
            alt="sdv"
          />

          <div className="main--container--product--information">
            <h3 className="main--container--product--name">{title}</h3>
            <p className="main--container--product--price">${price}</p>
          </div>
        </div>
      </>
    );
  }
}
