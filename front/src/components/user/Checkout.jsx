import React, { Component } from 'react';
import '../../CSS/user/checkout.css';
import axios from 'axios';
// import './checkout.css';
class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: [],
      user : JSON.parse(localStorage.getItem('user')),
      apiurl : 'http://localhost:5000/',
      address : []
    };
  }

  handleChange = (e) => {
    let address = this.state.address;
    address[e.target.name] = e.target.value;
    this.setState({
      address : address
    })
  }
  componentDidMount() {
    if (this.state.user && this.state.user.userType == "user") {
      let address = this.state.address;
      address.email = this.state.user.email;
      address.name = this.state.user.name;
      this.setState({address : address});
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
  checkout = () => {
    if (this.state.user && this.state.user.userType == "user") {
      let form = {};
      form.name = this.state.address.name;
      form.email = this.state.address.email;
      form.address1 = this.state.address.address1;
      form.address2 = this.state.address.address2;
      form.zipcode = this.state.address.zipcode;
      form.cart_data = this.state.cartList;
      form.payment_status = "completed";
      form.userid = this.state.user._id;
      axios
      .post('http://localhost:5000/api/products/checkout', form)
      .then(result => {
          console.log(result);
          alert('Successfull!');
          window.location.href = '/';
        this.setState({
          isLoading: false
        });
        console.log('Data ',this.state.data);
      })
      .catch(err => {
        this.handleErrors(err);
        this.setState({ isLoading: false });
      });
    }else{
      window.location.href = '/login';
    }
  }
  render() {
    return (
      <div className="checkout--container">
        <div className="checkout--information">
          <div className="checkout--email">
            <div className="checkout--number"> 1 </div>
            <h3> Your Email</h3>
            <input type="text" placeholder="enter your email"
            name="email"
            value={this.state.address.email}
            onChange={(e) => {this.handleChange(e)}}
            />
          </div>
          <div className="checkout--shipping">
            <div className="checkout--number"> 2 </div>
            <h3> Shipping</h3>
            <form>
              <input
                className="checkout--shipping--first--name"
                type="text"
                placeholder="Name"
                name="name"
                value={this.state.address.name}
                onChange={(e) => {this.handleChange(e)}}
              />
              {/* <input
                className="checkout--shipping--last--name"
                type="text"
                placeholder="Last Name"
              /> */}
              <input
                className="checkout--shipping--address--one"
                type="text"
                placeholder="Address 1"
                name="address1"
                value={this.state.address.address1}
                onChange={(e) => {this.handleChange(e)}}
              />
              <input
                className="checkout--shipping--address--two"
                type="text"
                placeholder="Address 2"
                name="address2"
                value={this.state.address.address2}
                onChange={(e) => {this.handleChange(e)}}
              />
              <input
                className="checkout--shipping--zip--code"
                type="text"
                placeholder="Zip Code"
                name="zipcode"
                value={this.state.address.zipcode}
                onChange={(e) => {this.handleChange(e)}}
              />
              {/* <input
                className="checkout--shipping--country"
                type="text"
                placeholder="Country"
              />
              <input
                className="checkout--shipping--zip--code"
                type="text"
                placeholder="Zip Code"
              />
              <input
                className="checkout--shipping--state"
                type="text"
                placeholder="State"
              /> */}
            </form>
            <button  className="checkout--continue"
            disabled={this.state.address.address1 == undefined || this.state.address.address1.length <= 0}
            onClick={() => {this.checkout()}}
            >BUY NOW</button>
          </div>
          <div className="checkout--payment">
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;

/* <form>
<h1>Fancy Text Inputs</h1>
<div class="question">
  <input type="text" required/>
  <label>First Name</label>
</div>
<div class="question">
  <input type="text" required/>
  <label>Last Name</label>
</div>
<div class="question">
  <input type="text" required/>
  <label>Email Address</label>
</div>
<div class="question">
  <input type="text" required/>
  <label>Email Confirm</label>
</div>
<button>Submit</button>
</form> */
