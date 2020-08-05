import React from 'react';
import TextInput from '../../common/inputs/TextInput';
import TextArea from '../../common/inputs/TextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../../CSS/common/form.css';

const ProductForm = ({
  formIsValid,
  formControls,
  isLoading,
  done,
  error,
  method,
  handleChange,
  handleSubmit
}) => {
  const { title, price, stock, images, desc, nutritionFacts } = formControls;

  return (
    <>
      <div className="admin-home__main-section ">
        <div className=" form-wrapper--inside form-wrapper">
          {method === 'add' ? (
            <h1 className="form-title">Add New Product</h1>
          ) : (
            <h1 className="form-title">Edit Product</h1>
          )}
          {error ? <p className="error">{error}</p> : null}

          <form onSubmit={handleSubmit} className="form-container">
            <TextInput
              type="text"
              name="title"
              defaultValue={title.value}
              placeholder={title.placeholder}
              touched={title.touched}
              valid={title.valid}
              onChange={handleChange}
              className="form-input"
            />
            <TextInput
              type="text"
              name="price"
              defaultValue={price.value}
              placeholder={price.placeholder}
              touched={price.touched}
              valid={price.valid}
              onChange={handleChange}
              className="form-input"
            />
            <TextInput
              type="text"
              name="stock"
              defaultValue={stock.value}
              placeholder={stock.placeholder}
              touched={stock.touched}
              valid={stock.valid}
              onChange={handleChange}
              className="form-input"
            />
            <TextInput
              type="text"
              name="images"
              defaultValue={images.value}
              placeholder={images.placeholder}
              touched={images.touched}
              valid={images.valid}
              onChange={handleChange}
              className="form-input"
            />
            <TextArea
              type="text"
              name="desc"
              maxLength={desc.validationRules.maxLength}
              defaultValue={desc.value}
              placeholder={desc.placeholder}
              touched={desc.touched}
              valid={desc.valid}
              onChange={handleChange}
              className="form-input"
            />
            <TextArea
              type="text"
              name="nutritionFacts"
              defaultValue={nutritionFacts.value}
              placeholder={nutritionFacts.placeholder}
              touched={nutritionFacts.touched}
              valid={nutritionFacts.valid}
              onChange={handleChange}
              className="form-input"
            />
            <div className="switch-wrapper">
              <span className="switch-text">Enable</span>
              <label className="switch">
                <input type="checkbox" name="enabled" onChange={handleChange} />
                <span className="slider round" />
              </label>
            </div>
            <button
              type="submit"
              disabled={!formIsValid}
              className="form-button"
            >
              {isLoading ? (
                <FontAwesomeIcon icon="spinner" spin />
              ) : done ? (
                <FontAwesomeIcon icon="check" />
              ) : method === 'add' ? (
                'Add'
              ) : (
                'Edit'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
