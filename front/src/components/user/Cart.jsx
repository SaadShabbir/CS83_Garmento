import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CartItem from './CartItem';
import '../../CSS/user/cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: [],
      cartProducts: [],
      user : JSON.parse(localStorage.getItem('user')),
      apiurl : 'http://localhost:5000/'
    };
  }
  subTotalprice = 0;
  componentDidMount() {
    if (this.state.user && this.state.user.userType == "user") {
      const id = this.state.user._id;
      axios
        .get(`http://localhost:5000/api/users/${id}/cart`)
        .then(result => {
            console.log(result);
          this.setState({
            cartList: result.data !== undefined ? result.data : [] ,
          });
          console.log(this.state.cartList);
        })
        .catch(err => {
          this.handleErrors(err);
          this.setState({ isLoading: false });
        });
    }
  }

  handleDelete = itemId => {
    const confirmation = window.confirm("Are you sure?");
    if(confirmation){
      const data = this.state.cartList.filter(it => it._id !== itemId);
    axios
      .delete(`http://localhost:5000/api/products/delcartitem/${itemId}`)
      .catch(err => {
        this.handleErrors(err);
      })
      .then(res => {
        console.log(res.data, data);
        if (res.data) {
          this.subTotalprice = 0;
          this.setState({ cartList : data });
        }
      });
    }
    
  };

  subTotal = () => {
    let sumcartitems = 0;
    this.state.cartProducts.forEach((cartItem) => {
      const quantity = this.state.cartList.find(
        (item) => item.id == cartItem.id
      ).quantity;
      if (quantity < 5) {
        const price = cartItem.price;
        sumcartitems += parseFloat(price) * parseFloat(quantity);
      } else if (quantity >= 5 && quantity <=9) {
        const price = cartItem.price-(cartItem.price * 0.05);
        sumcartitems += parseFloat(price) * parseFloat(quantity);
      }
      else if (quantity >= 10 && quantity <=14) {
        const price = cartItem.price-(cartItem.price * 0.08);
        sumcartitems += parseFloat(price) * parseFloat(quantity);
      }
      else if (quantity >= 15 && quantity <=19) {
        const price = cartItem.price-(cartItem.price * 0.12);
        sumcartitems += parseFloat(price) * parseFloat(quantity);
      }
      else if (quantity >= 20 && quantity <=29) {
        const price = cartItem.price-(cartItem.price * 0.20);
        sumcartitems += parseFloat(price) * parseFloat(quantity);
      }
    });
    this.state.subTotal = sumcartitems;
    // this.setState({ subTotal: sumcartitems });
  };
  render() {
    const { cartList, cartProducts } = this.state;
    if (!cartList || !cartProducts) {
      return <p>Loading...</p>;
    }
    console.log(this.state.cartList);
    return (
      <div className="cart-container">
        <div className="cartIcon">
        <div className="table-wrapper">
                <table className="table">
                    <thead className="table__head">
                        <tr className="table__row">
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Action</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                      {/* {JSON.stringify(cartList)} */}
                        {cartList.length > 0 && cartList.map((item) => 
                        {
                          this.subTotalprice = this.subTotalprice + item.price;
                          return(
                          
                            <tr key={item._id}>
                                <td><img width="50" height="50" src={this.state.apiurl + item.product_image} /></td>
                                <td>{item.title}</td>
                                <td>Rs&nbsp;{item.price}</td>
                                <td><a href="javascript:;"><FontAwesomeIcon
                                  className="delete-product__icon"
                                  icon="trash-alt"
                                  className="icon"
                                  onClick={() => this.handleDelete(item._id)}
                                  // {...data.map((item) => (
                                  //   <Product
                                  //     key={item.id}
                                  //     item={item}
                                  //     onDelete={() => handleDelete(item._id)}
                                  //   />
                                  // ))}
                                />
                              </a></td>
                            </tr>
                        )})}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="2">
                          <Link to={`/user/cart/checkout`}>
                            <button className="button--checkout">Proceed To Checkout</button>
                          </Link>
                        </td>
                        <td colSpan="2">subtotal: Rs {this.subTotalprice}</td>
                      </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        {/* {this.subTotal()} */}

        
      </div>
    );
  }
}

export default Cart;
