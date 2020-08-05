import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CartItem extends Component {
  render() {
    const { id, images, title, price } = this.props.cartitem;
    const { removeItem, quantity } = this.props;
    const imagesArr = images.split(',');

    return (
      <div className="list">
        <div className="list--titels">
          <p className="list--titels--item">item</p>
          <p className="list--titels--qty"> QTY.</p>
          <p className="list--titels--price"> Price</p>
        </div>
        <div className="list--product">
          <hr />
          <FontAwesomeIcon
            onClick={() => {
              removeItem(id);
            }}
            className="list-product--remove icon"
            icon="trash-alt"
          />
          <img className="list-product--img" src={imagesArr[0]} alt="" />
          <div className="list-product--img--title"> {title}</div>
          {/* <form>
            <input
              className="list--product--input"
              type="number"
              min="1"
              placeholder="1"
              defaultValue={quantity}
            />
          </form> */}
          <div className="list-product--qnt">{quantity}</div>
          <div className="list--product--sum">
            $ {parseFloat(quantity) * parseFloat(price)}
          </div>
        </div>
        {/* <h3>Value:{this.props.value} </h3> */}
      </div>
    );
  }
}

export default CartItem;
