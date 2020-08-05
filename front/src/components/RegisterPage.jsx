import React, {useState} from "react";
import TextInput from "./common/inputs/TextInput";
import PasswordInput from "../components/common/inputs/PasswordInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from 'react-select';
import "../CSS/common/form.css";

const RegisteForm = ({
  formIsValid,
  formControls,
  isLoading,
  method,
  error,
  done,
  handleChange,
  handleSelectChange,
  handleSubmit
}) => {
  const {
    name,
    username,
    email,
    newPassword,
    repeatNewPassword,
    age,
    birthday,
    phone,
    gender,
    userType,
    selectedOption
  } = formControls;

  // const [selectedOption, setSelectedOption] = useState(null);
  // const handleSelectChange = selectedOption => {
  //   setSelectedOption({ selectedOption });
  //   console.log(`Option selected:`, selectedOption);
  // };
  
  const options = [
    { value: 'buyer', label: 'Buyer' },
    { value: 'seller', label: 'Seller' },
    // { value: 'admin', label: 'Admin' },
  ];
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    // { value: 'admin', label: 'Admin' },
  ];
  console.log(handleSelectChange);
console.log(formControls,handleSelectChange)
  return (
    <>
      <div className="form-wrapper">
        <h1 className="form-title">Register Page</h1>

        {error ? <p className="error">{error}</p> : null}
        <form onSubmit={handleSubmit} method="add" className="form-container">
          <TextInput
            type="text"
            name="name"
            defaultValue={name.value}
            placeholder={name.placeholder}
            touched={name.touched}
            valid={name.valid}
            onChange={handleChange}
            className="form-input"
          />
          <TextInput
            type="text"
            name="username"
            defaultValue={username.value}
            placeholder={username.placeholder}
            touched={username.touched}
            valid={username.valid}
            onChange={handleChange}
            className="form-input"
          />
          <TextInput
            type="text"
            name="email"
            defaultValue={email.value}
            placeholder={email.placeholder}
            touched={email.touched}
            valid={email.valid}
            onChange={handleChange}
            className="form-input"
          />
          <PasswordInput
            type="password"
            name="newPassword"
            maxLength={newPassword.validationRules.maxLength}
            defaultValue={newPassword.value}
            placeholder={newPassword.placeholder}
            touched={newPassword.touched}
            valid={newPassword.valid}
            onChange={handleChange}
            className="form-input"
          />
          <PasswordInput
            type="password"
            name="repeatNewPassword"
            maxLength={repeatNewPassword.validationRules.maxLength}
            defaultValue={repeatNewPassword.value}
            placeholder={repeatNewPassword.placeholder}
            touched={repeatNewPassword.touched}
            valid={repeatNewPassword.valid}
            onChange={handleChange}
            className="form-input"
          />
          <TextInput
            type="text"
            name="age"
            maxLength={age.validationRules.maxLength}
            defaultValue={age.value}
            placeholder={age.placeholder}
            touched={age.touched}
            valid={age.valid}
            onChange={handleChange}
            className="form-input"
          />
          {/* <Select
            className="form-select"
            // value={userType.value}
            name= "selectUserType"
            placeholder= {userType.placeholder}
            touched={userType.touched}
            valid={userType.valid}
            onChange={handleSelectChange}
            options={options}
          /> */}
          <select className="form-select" name= "userType" onChange={handleChange}  >
            <option value="">Select User Type</option>
            <option value="user">User</option>
            <option value="seller">Seller</option>
          </select>
           {/* <TextInput
            type="text"
            name="type"
            maxLength={type.validationRules.maxLength}
            defaultValue={type.value}
            placeholder={type.placeholder}
            touched={type.touched}
            valid={type.valid}
            onChange={handleChange}
            className="form-input"
          /> */}
          {/* <Select
            className="form-select"
            // value={userType.value}
            name= "gender"
            placeholder= {gender.placeholder}
            onChange={handleSelectChange}
            options={genderOptions}
          /> */}
          <select className="form-select" name= "gender" onChange={handleChange}  >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <TextInput
            type="date"
            name="birthday"
            maxLength={birthday.validationRules.maxLength}
            defaultValue={birthday.value}
            placeholder={birthday.placeholder}
            touched={birthday.touched}
            valid={birthday.valid}
            onChange={handleChange}
            className="form-input"
          />
          <TextInput
            type="text"
            name="phone"
            maxLength={phone.validationRules.maxLength}
            defaultValue={phone.value}
            placeholder={phone.placeholder}
            touched={phone.touched}
            valid={phone.valid}
            onChange={handleChange}
            className="form-input"
          />

          <button type="submit" disabled={!formIsValid} className="form-button" >
            {isLoading ? (
              <FontAwesomeIcon icon="spinner" spin />
            ) : done ? (
              <FontAwesomeIcon icon="check" />
            ) : method === "add" ? (
              "Register"
            ) : (
              "Edit"
            )}
          </button>
        </form>
      </div>
    </>
  );
};
export default RegisteForm;
