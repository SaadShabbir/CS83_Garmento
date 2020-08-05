import React from 'react';

const TextInput = props => {
  let formControl = props.className;

  // props.touched &&
  if (props.touched && !props.valid) {
    formControl = `${props.className} control-error`;
  }

  const { touched, valid, className, ...inputprops } = props;

  return <input type="text" className={formControl} {...inputprops} />;
};

export default TextInput;
