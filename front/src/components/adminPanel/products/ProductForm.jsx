import React from 'react';
import TextInput from '../../common/inputs/TextInput';
import TextArea from '../../common/inputs/TextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import colors from '../../common/colors';
import '../../../CSS/common/form.css';
const ProductForm = ({
  formIsValid,
  formControls,
  isLoading,
  done,
  error,
  method,
  handleChange,
  handleSubmit,
  handleNavChange,
  handleImgChange,
  handleDelete, 
  nav,
  subnav,
  subsubnav
}) => {
  const { title, price, stock, images, desc, productDescription,category, subcategory, subsubcategory, category_name, subcategory_name, subsubcategory_name, imageUrl, imagePath, otherImagesPath, colorList, sizeList, enabled} = formControls;
  console.log("isEnabled",enabled.value)
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
            {/* <TextInput
              type="text"
              name="images"
              defaultValue={images.value}
              placeholder={images.placeholder}
              touched={images.touched}
              valid={images.valid}
              onChange={handleChange}
              className="form-input"
            /> */}
            <input type="file" className="form-input" name="imageUrl" accept="image/*" multiple onChange={handleImgChange} /> 
            {/* <TextInput
              type="text"
              name="category"
              defaultValue={category.value}
              placeholder={category.placeholder}
              touched={category.touched}
              valid={category.valid}
              onChange={handleChange}
              className="form-input"
            /> */}
            <select name="sizeList" defaultValue={sizeList.value} onChange={handleChange} className="form-input" multiple>
              {/* <option value="">None</option> */}
              <option value="Extra Small">Extra Small</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Extra Large">Extra Large</option>
            </select>

            <select name="colorList" defaultValue={colorList.value} onChange={handleChange} className="form-input" multiple>
              {/* <option value="">None</option> */}
              {colors.map((item, index) => (<option value={item.name}>{item.name}</option>))}
            </select>
            {nav.length > 0 &&
              <select name="category" defaultValue={category.value} onChange={handleNavChange} className="form-input">
              <option value="">Select</option>
              {nav.map((item, index) => (<option value={item.id+'__'+item.name}>{item.name}</option>))}
            </select>}
            {subnav.length > 0 &&
            <select name="subcategory" defaultValue={subcategory.value} onChange={handleNavChange} className="form-input">
              <option value="">Select</option>
              {subnav.map((item, index) => (<option value={item.id+'__'+item.name}>{item.name}</option>))}
            </select>}
            {subsubnav.length > 0 &&
              <select name="subsubcategory" defaultValue={subsubcategory.value} onChange={handleNavChange} className="form-input">
              <option value="">Select</option>
              {subsubnav.map((item, index) => (<option value={item.id+'__'+item.name}>{item.name}</option>))}
            </select>}
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
            {/* <TextArea
              type="text"
              name="Products Description"
              defaultValue={productDescription.value}
              placeholder={productDescription.placeholder}
              touched={productDescription.touched}
              valid={productDescription.valid}
              onChange={handleChange}
              className="form-input"
            /> */}
            <div className="switch-wrapper">
              <span className="switch-text">Enable</span>
              <label className="switch">
                <input type="checkbox" name="enabled" checked={enabled.value} onChange={handleChange} />
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
