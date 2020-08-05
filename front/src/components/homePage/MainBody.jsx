import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../CSS/homePage/mainBody.css';
import axios from 'axios';
import { toast } from 'react-toastify';
class MainBody extends Component {
  constructor(props) {
    super(props);
      this.state = {
        data: [],
        isLoading: false,
        error: null,
        apiurl : 'http://localhost:5000/',
        user : JSON.parse(localStorage.getItem('user')),
      };
  }
  componentDidMount(){
    this.setState({ isLoading: true });
    this.getProducts();
  }
  getProducts(){
      axios
      .get('http://localhost:5000/api/products')
      .then(result => {
          console.log(result);
        this.setState({
          data: result.data !== undefined ? result.data : [] ,
          isLoading: false
        });
        console.log('Data ',this.state.data);
      })
      .catch(err => {
        this.handleErrors(err);
        this.setState({ isLoading: false });
      });
    }

    addToCart(itemDetail) {
      console.log(itemDetail);
      let form = itemDetail;
      form.purchased_by = this.state.user._id;
      form.purchased_byName = this.state.user.name;
      form.payment_status = "pending";
      axios
      .post('http://localhost:5000/api/products/addtocart', form)
      .then(result => {
          console.log(result);
          toast.success('Product added to cart!');
          alert('Product added to cart!');
        this.setState({
          isLoading: false
        });
        console.log('Data ',this.state.data);
      })
      .catch(err => {
        this.handleErrors(err);
        this.setState({ isLoading: false });
      });
    }
  render() {
    return (
      <div className="mainBody--wrapper">
        <div className="batch__section--wrapper batch__section--wrapper-1">
          <div className="batch__section">
            <div className="batch__content">
              <div className="shop__button">
                <h3>
                  
                  <Link to="/shop" className="shop_button--text">
                    Women Wear
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="main-content--wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 catSections">
                <img
                  src={'../../images/denim-jacket.jpg'}
                  alt=""
                />
              </div>
              <div className="col-12 col-md-6 catSections">
                <img
                  src={'../../images/women-dress.jpg'}
                  alt=""
                  className="main-content__section-2__img-2"
                />
              </div>
              <div className="col-12 col-md-6 catSections">
                <img
                  src={'../../images/trouser.jpg'}
                  alt=""
                />
              </div>
              <div className="col-12 col-md-6 catSections">
                <img
                  src={'../../images/women.jpg'}
                  alt=""
                />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12">
                <h2 className="text-center">New Arrival</h2>
              </div>
            </div>
          </div>
          <div className="container-fluid mt-5">
            <div className="row">
            {this.state.data.length > 0 && this.state.data.map((item) => (
                <div className="col-12 col-sm-6 col-md-3 col-lg-2 mb-3">
                  <div className="box">
                    <div className="img">
                        {/* <img
                        src={'../../images/denim-jacket.jpg'}
                        alt=""
                      /> */}
                      <img src={this.state.apiurl + item.imageUrl} alt={item.title} />
                    </div>
                    <div className="product_data text-center mt-2">
                    <Link to={`/product/${item._id}`} ><span class="title" itemprop="name">{item.title}</span> </Link>
                      <span class="price"> 
                        <span class="current_price">
                          <span class="money" data-currency-pkr="Rs.7,990" data-currency="PKR">Rs&nbsp;{item.price}</span>
                        </span> 
                        <span class="was_price"></span> 
                        <div class="sold_out"></div>
                      </span>
                    </div>
                    <div className="addedBy text-center">
                      <span>Added By : </span>{item.added_name}
                    </div>
                    
                    <div className="btnBox">
                      {<button type="button" className="btn btn-block add_to_cart" onClick={() => {this.addToCart(item)}}>Add To Cart</button>}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                <div className="box">
                  <div className="img">
                      <img
                      src={'../../images/denim-jacket.jpg'}
                      alt=""
                    />
                  </div>
                  <div className="product_data text-center mt-2">
                    <span class="title" itemprop="name">Sage Grey (S &amp; T)</span> 
                    <span class="price"> 
                      <span class="current_price">
                        <span class="money" data-currency-pkr="Rs.7,990" data-currency="PKR">Rs.7,990</span>
                      </span> 
                      <span class="was_price"></span> 
                      <div class="sold_out"></div>
                    </span>
                  </div>
                  <div className="sizeBox mb-2">
                    <div className="option_title">
                      size
                    </div>
                  </div>
                  <div className="btnBox">
                    <button type="button" className="btn btn-block add_to_cart">Add To Cart</button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                <div className="box">
                  <div className="img">
                      <img
                      src={'../../images/denim-jacket.jpg'}
                      alt=""
                    />
                  </div>
                  <div className="product_data text-center mt-2">
                    <span class="title" itemprop="name">Sage Grey (S &amp; T)</span> 
                    <span class="price"> 
                      <span class="current_price">
                        <span class="money" data-currency-pkr="Rs.7,990" data-currency="PKR">Rs.7,990</span>
                      </span> 
                      <span class="was_price"></span> 
                      <div class="sold_out"></div>
                    </span>
                  </div>
                  <div className="sizeBox mb-2">
                    <div className="option_title">
                      size
                    </div>
                  </div>
                  <div className="btnBox">
                    <button type="button" className="btn btn-block add_to_cart">Add To Cart</button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                <div className="box">
                  <div className="img">
                      <img
                      src={'../../images/denim-jacket.jpg'}
                      alt=""
                    />
                  </div>
                  <div className="product_data text-center mt-2">
                    <span class="title" itemprop="name">Sage Grey (S &amp; T)</span> 
                    <span class="price"> 
                      <span class="current_price">
                        <span class="money" data-currency-pkr="Rs.7,990" data-currency="PKR">Rs.7,990</span>
                      </span> 
                      <span class="was_price"></span> 
                      <div class="sold_out"></div>
                    </span>
                  </div>
                  <div className="sizeBox mb-2">
                    <div className="option_title">
                      size
                    </div>
                  </div>
                  <div className="btnBox">
                    <button type="button" className="btn btn-block add_to_cart">Add To Cart</button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                <div className="box">
                  <div className="img">
                      <img
                      src={'../../images/denim-jacket.jpg'}
                      alt=""
                    />
                  </div>
                  <div className="product_data text-center mt-2">
                    <span class="title" itemprop="name">Sage Grey (S &amp; T)</span> 
                    <span class="price"> 
                      <span class="current_price">
                        <span class="money" data-currency-pkr="Rs.7,990" data-currency="PKR">Rs.7,990</span>
                      </span> 
                      <span class="was_price"></span> 
                      <div class="sold_out"></div>
                    </span>
                  </div>
                  <div className="sizeBox mb-2">
                    <div className="option_title">
                      size
                    </div>
                  </div>
                  <div className="btnBox">
                    <button type="button" className="btn btn-block add_to_cart">Add To Cart</button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3 col-lg-2"> 
                <div className="box">
                  <div className="img">
                      <img
                      src={'../../images/denim-jacket.jpg'}
                      alt=""
                    />
                  </div>
                  <div className="product_data text-center mt-2">
                    <span class="title" itemprop="name">Sage Grey (S &amp; T)</span> 
                    <span class="price"> 
                      <span class="current_price">
                        <span class="money" data-currency-pkr="Rs.7,990" data-currency="PKR">Rs.7,990</span>
                      </span> 
                      <span class="was_price"></span> 
                      <div class="sold_out"></div>
                    </span>
                  </div>
                  <div className="sizeBox mb-2">
                    <div className="option_title">
                      size
                    </div>
                  </div>
                  <div className="btnBox">
                    <button type="button" className="btn btn-block add_to_cart">Add To Cart</button>
                  </div>
                </div>
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainBody;
