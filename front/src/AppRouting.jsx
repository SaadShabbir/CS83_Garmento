import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import './App.css';
import './fontAwesome';
import Footer from './components/common/Footer';

class AppRouting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    };
  }
  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({ location: location.pathname });
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    return (
      <div className="App">
        {this.props.children}
        {this.state.location.includes('admin') ? (
          <Footer className="footer--wrapper--admin" />
        ) : (
          <Footer />
        )}
      </div>
    );
  }
}
export default withRouter(AppRouting);
