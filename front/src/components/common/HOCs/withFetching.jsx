import React, { Component } from 'react';
import axios from 'axios';

const withFetching = query => Comp => {
  return class WithFetching extends Component {
    constructor(props) {
    super(props);
     console.log(this.props);
      // if(query === 'sellers'){
      //   query = 'http://localhost:5000/api/admin/sellers'
      // }
      this.state = {
        data: null,
        isLoading: false,
        error: null
      };
    }

    handleErrors = err => {
      const error = err.response.data.message;
      this.setState({ error });
    };

    // handleDelete = itemId => {
    //   const data = this.state.data.filter(it => it._id !== itemId);
    //   axios
    //     .delete(`${this.props.url}${query}/${itemId}`)
    //     .catch(err => {
    //       this.handleErrors(err);
    //     })
    //     .then(res => {
    //       if (res.data) {
    //         this.setState({ data });
    //       }
    //     });
    // };
    changeStatus = (itemId, value) => {
      console.log(itemId, value);
      axios
        .put(`${this.props.url}${query}/${itemId}/${value}`)
        .then(result => {
          console.log(result);
          
          this.getSellers();
        })
        .catch(err => {
          this.handleErrors(err);
          return true;
        })
    }
    handleEdit = (itemId, value, property) => {
      let data;
      if (this.state.data.length > 0) {
        const match = this.state.data.find(
          item => item[property] === value && item._id !== itemId
        );
        if (match) {
          const error = 'Property with this value already exists';
          this.setState({ error });
          return null;
        }
        data = [...this.state.data];
        const item = data.find(item => item._id === itemId);
        item[property] = value;
        axios
          .put(`${this.props.url}${query}/${itemId}`, item)
          .catch(err => {
            this.handleErrors(err);
            return true;
          })
          .then(errorOcured => {
            if (errorOcured.data) {
              this.setState({ data, error: null });
            }
          });
      } else {
        data = { ...this.state.data };
        data[property] = value;
        axios
          .put(`${this.props.url}${query}`, data)
          .catch(err => {
            this.handleErrors(err);
          })
          .then(errorOcured => {
            if (errorOcured.data) {
              this.setState({ data, error: null });
            }
          });
      }
    };

    componentDidMount() {
      this.setState({ isLoading: true });
      this.getUsers();
      if(query === 'sellers'){
        this.getSellers();
      }
    }

    getUsers(){
      axios
      .get(`${this.props.url}${query}`)
      .then(result => {
        this.setState({
          data: result.data,
          isLoading: false
        });
      })
      .catch(err => {
        this.handleErrors(err);
        this.setState({ isLoading: false });
      });
    }

    getSellers(){
      axios
      .get(`${this.props.url}${query}`)
      .then(result => {
        this.setState({
          data: result.data,
          isLoading: false
        });
      })
      .catch(err => {
        this.handleErrors(err);
        this.setState({ isLoading: false });
      });
    }

    render() {
      return (
        <Comp
          {...this.props}
          {...this.state}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          changeStatus = {this.changeStatus}
        />
      );
    }
  };
};

export default withFetching;
