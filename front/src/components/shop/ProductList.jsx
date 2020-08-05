import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import Product from './Product';
// import SearchBox from './searchbox';
import '../../CSS/shop/products.css';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      nav : [],
      itemId: null,
      categoryQuery: '',
      apiurl : 'http://localhost:5000/',
      user : JSON.parse(localStorage.getItem('user')),
      type : this.props.match.params.type !== undefined ? this.props.match.params.type : '',
      id : this.props.match.params.id !== undefined ? this.props.match.params.id : ''
    };
  }
  componentDidMount() {
    console.log(this.state.type, this.state.id);
    let url = '';
    if(this.state.type !== "" && this.state.id !== ""){
      url = `http://localhost:5000/api/products/${this.props.match.params.type}/${this.props.match.params.id}` 
    }else{
      url = 'http://localhost:5000/api/products';
    }
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        console.log("Item get in products",json);
        // setTimeout(() => {
        this.setState({ items: json });
        // }, 3000)
      })
      .catch((err) => console.log(err));
      fetch('http://localhost:5000/api/admin/get_nav')
        .then((res) => res.json())
        .then((json) => {
            console.log("Item get in offer",json);
            this.setState({ nav: json });
            // setTimeout(() => {
            // this.setState({ items: json });
            // }, 3000)
        })
        .catch((err) => console.log(err));
  }
  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
    });
  };

  handleDelete = itemId => {
    const confirmation = window.confirm("Are you sure?");
    if(confirmation){
      const data = this.state.items.filter(it => it._id !== itemId);
    axios
      .delete(`http://localhost:5000/api/products/${itemId}`)
      .catch(err => {
        this.handleErrors(err);
      })
      .then(res => {
        if (res.data) {
          this.setState({ data });
        }
      });
    }
    
  };

  handleClick = (event) => {
    this.setState({ categoryQuery: event.target.text });
    console.log(event.target.text);
  };

  getPagedData = () => {
    let { searchQuery, items: allProducts, categoryQuery } = this.state;
    console.log(allProducts);
    let filtered = allProducts;
    if (searchQuery)
      filtered = allProducts.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (categoryQuery)
      filtered = allProducts.filter((m) =>
        m.category.toLowerCase().startsWith(categoryQuery.toLowerCase())
      );
    else filtered = allProducts;

    console.log(filtered);
    return { data: filtered };
  };

  addToCart(itemDetail) {
    if(this.state.user !== null && this.state.user !== undefined && this.state.user.userType == "user"){
      console.log(itemDetail);
    let form = itemDetail;
    form.purchased_by = this.state.user._id;
    form.purchased_byName = this.state.user.name;
    form.payment_status = "pending";
    axios
    .post('http://localhost:5000/api/products/addtocart', form)
    .then(result => {
        console.log(result);
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
    }else{
      window.location.href = "/login";
    }
  }

  render() {
    // let { searchQuery } = this.state;
    const { nav } = this.state;
    let { data } = this.getPagedData();
    console.log(data);
    return (
      <>
        <main className="mainShop">
          {/* <div className="search">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <a class="navbar-brand" href="#">
                SHOP Products
              </a>
            </nav>
          </div> */}

          <div className="container ">
            <div className="row ">
              <div className="col-12 col-sm-3 col-md-2 border">
              <ul class="shop_ul">
                { nav.length > 0 &&
                  nav.map((list, index) => (
                    <li class="shop_ul_li">
                      <a class="shop_ul_li_link" href={`/shop/category/${list.id}`} data-toggle="dropdown" aria-expanded="false">  {list.name}  </a>
                        {list.items.length > 0 && 
                          <ul class="subMenu">
                            {list.items.map((list2, index2) => (
                              <li><a class="submenu_link" href={`/shop/subcategory/${list2.id}`}> {list2.name}</a>
                                {list2.subitems.length > 0 &&
                                  <ul class="sub_submenu">
                                    {list2.subitems.map((list3, index3) => (
                                      <li><a class="sub_submenu_link" href={`/shop/subsubcategory/${list3.id}`}>{list3.name}</a></li>
                            ))}
                                  </ul>
                                }
                              </li>
                            ))}
                          </ul>
                        }
                    </li>
                  ))
                }
                </ul>
              </div>
              <div className="col-12 col-sm-9 col-md-10">
                <div className="row">
                  
                {data.map((item) => {
              return (
                <div className="col-12 col-sm-6 col-md-3 mb-3">
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
                    {/* <button type="button" className="btn btn-block add_to_cart">Add To Cart</button> */}
                  </div>
                </div>
              </div>
              )
            })}
                </div>
              </div>
            
            </div>
          </div>
        </main>
      </>
    );
  }
}
