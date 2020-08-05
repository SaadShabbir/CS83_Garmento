import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import '../../CSS/adminPanel/products.css';

export default class Product extends Component {
    constructor(props) {
        super(props);
          this.state = {
            product: [],
            isLoading: false,
            error: null,
            user : JSON.parse(localStorage.getItem('user')),
            apiurl : 'http://localhost:5000/',
            images : [],
            slderimages : [],
            sizes : [],
            colors : [],
            selectedSize : '',
            selectedColor : ''
          };
          this.setSize = this.setSize.bind(this);
          this.setColor = this.setColor.bind(this);
    }
    async componentDidMount() {
        this.setState({ isLoading: true });
        const id = this.props.match.params.id;
        axios
          .get(`${this.state.apiurl}api/products/${id}`)
          .then(result => {
            console.log(result);
            let imgArray = [];
            for(let i =0; i < result.data.otherImages.length; i++){
              let imgObj = { original: '',thumbnail: ''};
              imgObj.original = this.state.apiurl+result.data.otherImages[i];
              imgObj.thumbnail = this.state.apiurl+result.data.otherImages[i];
              imgArray.push(imgObj);
              console.log(imgObj);
              console.log('Image Array in loop',imgArray);
            }
          console.log(this.state.slderimages);
            this.setState({ 
              product: result.data, 
              slderimages : imgArray,
              sizes : result.data.sizeList,
              colors : result.data.colorList,
              isLoading: false 
            });
            console.log(this.state.sizes, 'length');
          })
          .catch(error => this.setState({ error: error, isLoading: false }));
          
      }

      setSize(e){
        // console.log(e.target.value);
        this.setState({selectedSize: e.target.value});
      }
      setColor(e){
        // console.log(e.target.value);
        this.setState({selectedColor: e.target.value});
      }

      addToCart(itemDetail) {
        if(this.state.user !== null && this.state.user !== undefined && this.state.user.userType == "user"){
          console.log(itemDetail);
        let form = itemDetail;
        form.purchased_by = this.state.user._id;
        form.purchased_byName = this.state.user.name;
        form.payment_status = "pending";
        form.sizeSelected = this.state.selectedSize;
        form.colorSelected = this.state.selectedColor;
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
    // console.log(this.state.slderimages);
    return (
      <>
      <main className="mainShop">
        <div className="container">  
          <div className="row mb-4 border-bottom pb-3">
            <div className="col-12 col-sm-6 mt-5">
              <ImageGallery items={this.state.slderimages} />
            </div>
            <div className="col-12 col-sm-6 mt-5">
              <h2>{this.state.product.title}</h2>
              <p><strong>Category :</strong> {this.state.product.category_name} {this.state.product.subcategory_name != '' ? '> '+this.state.product.subcategory_name : ''} {this.state.product.subsubcategory_name !== '' ? '> '+this.state.product.subsubcategory_name : ''}</p>
              <p><strong>Price :</strong> Rs&nbsp;{this.state.product.price}</p>
              <p><strong>Description :</strong> {this.state.product.desc}</p> 
              <p><strong>Stock Available :</strong> {this.state.product.stock}</p> 
              <p><strong>Available Sizes :</strong>
                <select className="ml-2" onChange={this.setSize} value={this.state.selectedSize}>
                  <option value="">Select Size</option>
                  {
                    this.state.sizes.length > 0 && this.state.sizes.map((item, index) => (
                      < option value={item}>{item}</option>
                    )
                      // < option value="">{}</option>
                    )
                  }
                  
                </select>
              </p>
              <p><strong>Available Colors :</strong>
                <select className="ml-2" onChange={this.setColor} value={this.state.selectedColor}>
                  <option value="">Select Color</option>
                  {
                    this.state.colors.length > 0 && this.state.colors.map((item, index) => (
                      < option value={item}>{item}</option>
                    )
                      // < option value="">{}</option>
                    )
                  }
                  
                </select>
              </p>
              <p><strong>Product Added By :</strong> {this.state.product.added_name}</p> 
              <div className="addTOcart">
              {<button type="button" className="btn btn-block add_to_cart" onClick={() => {this.addToCart(this.state.product)}}>Add To Cart</button>}
              </div>
            </div>  
          </div>  
        </div>
      </main>
      </>
    );
  }
}
