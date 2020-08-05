import React from 'react';

const TextInput = props => {
  let formControl = props.className;

  if (props.touched && !props.valid) {
    formControl = `${props.className} control-error`;
  }

  const { touched, valid, className, ...inputprops } = props;

  return <input type="password" className={formControl} {...inputprops} />;
};

export default TextInput;
