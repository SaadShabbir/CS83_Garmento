import React, { Component } from 'react';
import withFormFunctional from '../../common/HOCs/withFormFunctional';
import ProductForm2 from './ProductForm2';
import axios from 'axios';

class EditProductForm2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      product: null,
      error: null
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    const id = this.props.match.params.id;
    axios
      .get(`${this.props.url}/${id}`)
      .then(result => {
        this.setState({ product: result.data, isLoading: false });
      })
      .catch(error => this.setState({ error: error, isLoading: false }));
  }

  render() {
    const { isLoading, error, product } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>error</p>;
    }
    if (!product) {
      return <p>Loading...</p>;
    }
    const formControls = {
      title: {
        value: product.title,
        placeholder: 'Title',
        touched: true,
        validationRules: {
          isRequired: true
        }
      },
      desc: {
        value: product.desc,
        placeholder: 'Description',
        touched: true,
        validationRules: {
          maxLength: 250,
          isRequired: true
        }
      },
      price: {
        value: product.price,
        placeholder: 'Price',
        touched: true,
        validationRules: {
          format: /^[0-9]*\.?[0-9]+$/,
          isRequired: true
        }
      },
      images: {
        value: product.images,
        placeholder: 'URLs',
        touched: true,
        validationRules: {
          isRequired: true
        }
      },
      stock: {
        value: product.stock,
        placeholder: 'Stock',
        touched: true,
        validationRules: {
          format: /^[0-9]+$/,
          isRequired: true
        }
      },
      productDescription: {
        value: product.productDescription,
        placeholder: 'Products Description'
      },
      enabled: {
        value: product.enabled
      }
    };
    const ProductFormWithFormFunctional = withFormFunctional(formControls)(
      ProductForm2
    );
    return (
      <ProductFormWithFormFunctional
        method="edit"
        url={`${this.props.url}/${product.id}`}
      />
    );
  }
}

export default EditProductForm2;
