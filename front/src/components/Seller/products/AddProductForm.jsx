import React from 'react';
import withFormFunctional from '../../common/HOCs/withFormFunctional';
import ProductForm from './ProductForm';

const AddProductForm = props => {
  const formControls = {
    title: {
      value: '',
      placeholder: 'Title',
      validationRules: {
        isRequired: true
      }
    },
    desc: {
      value: '',
      placeholder: 'Description',
      validationRules: {
        maxLength: 250,
        isRequired: true
      }
    },
    price: {
      value: '',
      placeholder: 'Price',
      validationRules: {
        format: /^[0-9]*\.?[0-9]+$/,
        isRequired: true
      }
    },
    images: {
      value: '',
      placeholder: 'URLs',
      validationRules: {
        isRequired: true
      }
    },
    // image2: {
    //   value: '',
    //   placeholder: 'URL'
    // },
    stock: {
      value: '',
      placeholder: 'Stock',
      validationRules: {
        format: /^[0-9]+$/,
        isRequired: true
      }
    },
    nutritionFacts: {
      value: '',
      placeholder: 'Nutrition Facts'
    },
    enabled: {
      value: false
    }
  };
  const ProductFormWithFormFunctional = withFormFunctional(formControls)(
    ProductForm
  );
  return (
    <ProductFormWithFormFunctional
      method="add"
      url={`${props.url}products`}
      {...props}
    />
  );
};

export default AddProductForm;
