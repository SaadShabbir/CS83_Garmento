import React, { Component } from 'react';
import withFormFunctional from '../../common/HOCs/withFormFunctional';
import ProductForm from './ProductForm';
import axios from 'axios';

class EditProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      product: null,
      error: null,
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
      // images: {
      //   value: product.images,
      //   placeholder: 'URLs',
      //   touched: true,
      //   validationRules: {
      //     isRequired: true
      //   }
      // },
      imageUrl : {
        value : {},
      },
      imagePath : {
        value : product.imageUrl,
      },
      otherImagesPath : {
        value : product.otherImages
      },
      sizeList : {
        value : product.sizeList
      },
      colorList : {
        value : product.colorList
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
      category: {
        value: product.category+'__'+product.category_name,
        placeholder: 'Category',
        touched: true,
        validationRules: {
          maxLength: 250,
          isRequired: true
        }
      },
      subcategory: {
        value: product.subcategory+'__'+product.subcategory_name,
        placeholder: 'Category',
        validationRules: {
          maxLength: 250,
          isRequired: false
        }
      },
      subsubcategory: {
        value: product.subsubcategory+'__'+product.subsubcategory_name,
        placeholder: 'Category',
        validationRules: {
          maxLength: 250,
          isRequired: false
        }
      },
      category_name: {
        value: product.category_name,
        placeholder: 'Category',
        validationRules: {
          maxLength: 250,
          isRequired: false
        }
      },
      subcategory_name: {
        value: product.subcategory_name,
        placeholder: 'Category',
        validationRules: {
          maxLength: 250,
          isRequired: false
        }
      },
      subsubcategory_name: {
        value: product.subsubcategory_name,
        placeholder: 'Category',
        validationRules: {
          maxLength: 250,
          isRequired: false
        }
      },
      productDescription: {
        value: product.productDescription,
        placeholder: 'Products Description',
        touched: true,
      },
      enabled: {
        value: product.enabled,
        touched: true,
      }
    };
    const ProductFormWithFormFunctional = withFormFunctional(formControls)(
      ProductForm
    );
    return (
      <ProductFormWithFormFunctional
        method="edit"
        url={`${this.props.url}/${product._id}`}
      />
    );
  }
}

export default EditProductForm;
