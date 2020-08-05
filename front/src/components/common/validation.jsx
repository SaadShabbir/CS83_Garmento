const validate = (value, rules, password) => {
  let isValid = true;

  for (let rule in rules) {
    switch (rule) {
      case 'maxLength':
        isValid = isValid && maxLengthValidator(value, rules[rule]);
        break;
      case 'minLength':
        isValid = isValid && minLengthValidator(value, rules[rule]);
        break;
      case 'format':
        isValid = isValid && formatValidator(value, rules[rule]);
        break;
      case 'isRequired':
        isValid = isValid && requiredValidator(value);
        break;
      case 'matchPassword':
        isValid = isValid && passwordValidator(value, password);
        break;
      default:
        isValid = true;
    }
  }

  return isValid;
};

const maxLengthValidator = (value, maxLength) => {
  return value.length <= maxLength;
};

const minLengthValidator = (value, minLength) => {
  return value.length >= minLength;
};

const formatValidator = (value, format) => {
  return format.test(value);
};

const requiredValidator = value => {
  return value.trim() !== '';
};

const passwordValidator = (value, password) => {
  return value === password;
};

export default validate;
