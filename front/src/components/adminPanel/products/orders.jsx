import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import '../../../CSS/adminPanel/table.css';
import axios from 'axios';
class Orders extends Component {
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
        this.getorders();
    }
    getorders(){
      let user_id = this.state.user._id;
      console.log(user_id, 'id');
        axios
        .get('http://localhost:5000/api/products/ordersbyUser/'+user_id)
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
                            <th>Purchased By</th>
                            <th>Price</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.length > 0 && this.state.data.map((item) => (
                            <tr key={item._id}>
                                <td><img width="50" height="50" src={this.state.apiurl + item.product_image} /></td>
                                <td>{item.title}</td>
                                <td>{item.purchased_byName}</td>
                                <td>Rs&nbsp;{item.price}</td>
                                <td>{item.payment_status}</td>
                                
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

export default Orders;
