import React, { Component } from 'react';
import '../../CSS/user/checkout.css';

// import './checkout.css';
class Checkout extends Component {
  render() {
    return (
      <div className="checkout--container">
        <div className="checkout--information">
          <div className="checkout--email">
            <div className="checkout--number"> 1 </div>
            <h3> Your Email</h3>
            <input type="text" placeholder="enter your email" />
            <button className="checkout--continue">Continue</button>
          </div>
          <div className="checkout--shipping">
            <div className="checkout--number"> 2 </div>
            <h3> Shipping</h3>
            <form>
              <input
                className="checkout--shipping--first--name"
                type="text"
                placeholder="First Name"
              />
              <input
                className="checkout--shipping--last--name"
                type="text"
                placeholder="Last Name"
              />
              <input
                className="checkout--shipping--address--one"
                type="text"
                placeholder="Address 1"
              />
              <input
                className="checkout--shipping--address--two"
                type="text"
                placeholder="Address 2"
              />
              <input
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
              />
            </form>
            <button className="checkout--continue">Continue</button>
          </div>
          <div className="checkout--payment">
            <div className="checkout--number"> 3 </div>
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
