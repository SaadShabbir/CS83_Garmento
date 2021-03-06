import React from 'react';
import withFormFunctional from '../../common/HOCs/withFormFunctional';
import ProductForm2 from './ProductForm2';

const AddProductForm2 = props => {
  console.log(props);
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
    imagePath : {
      value : 'new',
    },
    otherImagesPath : {
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
      validationRules: {
        maxLength: 250,
        isRequired: false
      }
    },
    subsubcategory: {
      value: '',
      placeholder: 'Category',
      validationRules: {
        maxLength: 250,
        isRequired: false
      }
    },
    category_name: {
      value: '',
      placeholder: 'Category',
      validationRules: {
        maxLength: 250,
        isRequired: false
      }
    },
    subcategory_name: {
      value: '',
      placeholder: 'Category',
      validationRules: {
        maxLength: 250,
        isRequired: false
      }
    },
    subsubcategory_name: {
      value: '',
      placeholder: 'Category',
      validationRules: {
        maxLength: 250,
        isRequired: false
      }
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
    ProductForm2
  );
  return (
    <ProductFormWithFormFunctional
      method="add"
      url={`${props.url}offers`}
      {...props}
    />
  );
};

export default AddProductForm2;
