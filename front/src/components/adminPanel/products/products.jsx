import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import '../../../CSS/adminPanel/table.css';
import axios from 'axios';
class Products extends Component {
    constructor(props) {
        super(props);
          this.state = {
            data: [],
            isLoading: false,
            error: null,
            user : JSON.parse(localStorage.getItem('user')),
            apiurl : 'http://localhost:5000/'
          };
    }

    componentDidMount(){
        this.setState({ isLoading: true });
        this.getProducts();
    }
    getProducts(){
      let user_id = this.state.user._id;
        axios
        .get('http://localhost:5000/api/products/byUser/'+user_id)
        .then(result => {
            console.log(result);
          this.setState({
            data: result.data !== undefined ? result.data : [] ,
            isLoading: false
          });
          console.log(this.state.data);
        })
        .catch(err => {
          this.handleErrors(err);
          this.setState({ isLoading: false });
        });
      }

      handleDelete = itemId => {
        const confirmation = window.confirm("Are you sure?");
        if(confirmation){
          const data = this.state.data.filter(it => it._id !== itemId);
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
  render() {
    if(this.state.isLoading === true){
        return <p>Loading ...</p>;
    }
    return (
      <>
        <div className="customTableMargin">
            <div className="table-wrapper">
                <table className="table">
                    <thead className="table__head">
                        <tr className="table__row">
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>Sub Category</th>
                            <th>Sub Sub Category</th>
                            <th>Action</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.length > 0 && this.state.data.map((item) => (
                            <tr key={item._id}>
                                <td><img width="50" height="50" src={this.state.apiurl + item.imageUrl} /></td>
                                <td>{item.title}</td>
                                <td>Rs&nbsp;{item.price}</td>
                                <td>{item.stock}</td>
                                <td>{item.category_name}</td>
                                <td>{item.subcategory_name}</td>
                                <td>{item.subsubcategory_name}</td>
                                <td><Link to={`./products/${item._id}/edit`}>
                                    <FontAwesomeIcon icon="edit" className="icon delete-product__icon" />
                                  </Link>
                                  <a href="javascript:;"><FontAwesomeIcon
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </>
    );
  }
}

export default Products;
