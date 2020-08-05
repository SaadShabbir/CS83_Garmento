import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../CSS/adminPanel/products.css';
import withFetching from './../common/HOCs/withFetching';

export default class Product extends Component {
  render() {
    console.log(this.props.item);
    const { _id, title, otherImages, price, category } = this.props.item;
    const { onProductClick, editable, URLtoEdit, onDelete } = this.props;
    const imagesArr = otherImages;
    let apiurl = 'http://localhost:5000/';
    if (!imagesArr) {
      return <p>Loading...</p>;
    }
    const Product = ({ data, isLoading, error, handleDelete }) => {
      if (!data) {
        return <p>Loading ...</p>;
      }

      if (isLoading) {
        return <p>Loading ...</p>;
      }
    };
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
            src={`${apiurl}/${imagesArr[0]}`}
            alt="sdv"
          />
          {editable && (
            <div className="edit-product">
              <Link to={`${URLtoEdit}/${_id}/edit`}>
                <FontAwesomeIcon icon="edit" className="edit-product__icon" />
              </Link>
            </div>
          )}
          {editable && (
            <div className="delete-product">
              <Link to={`${URLtoEdit}/${_id}/delete`}>
                <FontAwesomeIcon
                  className="delete-product__icon"
                  icon="trash-alt"
                  className="icon"
                  onClick={() => onDelete(_id)}
                  // {...data.map((item) => (
                  //   <Product
                  //     key={item.id}
                  //     item={item}
                  //     onDelete={() => handleDelete(item._id)}
                  //   />
                  // ))}
                />
              </Link>
            </div>
          )}
          <img
            className="main--container--product--image display--none"
            id="hover--img"
            src={`${apiurl}/${imagesArr[0]}`}
            alt="sdv"
          />

          <div className="main--container--product--information">
            <h3 className="main--container--product--name">{title}</h3>
            <p className="main--container--product--price">${price}</p>
            <p className="main--container--product--price">{category}</p>
          </div>
        </div>
      </>
    );
  }
}
const DEFAULT_QUERY = `admin/products`;
const ProductWithFetch = withFetching(DEFAULT_QUERY)(Product);
