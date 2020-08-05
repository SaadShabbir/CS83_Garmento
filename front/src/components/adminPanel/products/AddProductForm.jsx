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
    imageUrl : {
      value : '',
    },
    imagePath : {
      value : 'new',
    },
    otherImagesPath : {
      value : []
    },
    sizeList : {
      value : []
    },
    colorList : {
      value : []
    },
    // images: {
    //   value: '',
    //   placeholder: 'URLs',
    //   validationRules: {
    //     isRequired: true
    //   }
    // },
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
    category: {
      value: '',
      placeholder: 'Category',
      validationRules: {
        maxLength: 250,
        isRequired: true
      }
    },
    subcategory: {
      value: '',
      placeholder: 'Category',
    },
    subsubcategory: {
      value: '',
      placeholder: 'Category',
    },
    category_name: {
      value: '',
      placeholder: 'Category',
    },
    subcategory_name: {
      value: '',
      placeholder: 'Category',
    },
    subsubcategory_name: {
      value: '',
      placeholder: 'Category',
    },
    productDescription: {
      value: '',
      placeholder: 'Products Description'
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
