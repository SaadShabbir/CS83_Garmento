import React from 'react';

const TextArea = props => {
  let formControl = props.className;

  if (props.touched && !props.valid) {
    formControl = `${props.className} control-error`;
  }

  const { touched, valid, className, ...inputprops } = props;

  return <textarea className={formControl} {...inputprops} rows={8} />;
};

export default TextArea;
