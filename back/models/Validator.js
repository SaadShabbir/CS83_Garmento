const validator = require("validator");

// checking if variable is string and if it excits at all
// if it is a large object or something else it might be problematic
// (kinda protecting database)
function isString(str) {
  return typeof str === "string" || str instanceof String;
}

// checking if date is in YYYY-MM-DD format
function isCorrectDate(date) {
  return /^\d{4}-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(date);
}

// checking if age is greater than 18 and two digits
function isCorrectAge(age) {
  return age > 18 && /^\d{2}$/.test(age);
}

// product validation
function validateProduct(product) {
  const {
    title,
    desc,
    price,
    imageUrl,
    otherImages,
    sizeList,
    colorList,
    stock,
    category,
    subcategory,
    subsubcategory,
    category_name,
    subcategory_name,
    subsubcategory_name,
    productDescription,
    enabled,
  } = product;
  if (!isString(title)) {
    return {
      error: "product must have title property and it must be in string format",
    };
  }
  if (!isString(desc)) {
    return {
      error: "product must have desc property and it must be in string format",
    };
  }
  if (!isString(imageUrl)) {
    return {
      error:
        "product must have imageUrl property and it must be in string format",
    };
  }
  if (!isString(price) || !isString(stock)) {
    return { error: "product must have price and stock properties" };
  }
  if (!isString(category)) {
    return {
      error:
        "product must have category property and it must be in string format",
    };
  }

  // if (typeof enabled !== "boolean") {
  //   return {
  //     error:
  //       "product must have enabled property and it must be in boolean format",
  //   };
  // }
  return {
    title,
    desc,
    price,
    imageUrl,
    otherImages,
    sizeList,
    colorList,
    stock,
    category,
    subcategory,
    subsubcategory,
    category_name,
    subcategory_name,
    subsubcategory_name,
    productDescription,
    enabled,
  };
}

function validateCartProduct(product) {
  const { productId, quantity } = product;

  if (!isString(productId)) {
    return {
      error: "product must have id property and it must be in string format",
    };
  }
  if (!isString(quantity)) {
    return {
      error:
        "product must have quantity property and it must be in string format",
    };
  }
  return { productId, quantity };
}

function validateOffers(offers) {
  const {
    title,
    desc,
    price,
    imageUrl,
    stock,
    category,
    productDescription,
    enabled,
  } = offers;
  if (!isString(title)) {
    return {
      error: "product must have title property and it must be in string format",
    };
  }
  if (!isString(desc)) {
    return {
      error: "product must have desc property and it must be in string format",
    };
  }
  if (!isString(imageUrl)) {
    return {
      error:
        "product must have imageUrl property and it must be in string format",
    };
  }
  if (!isString(price) || !isString(stock)) {
    return { error: "product must have price and stock properties" };
  }
  if (!isString(category)) {
    return {
      error:
        "product must have category property and it must be in string format",
    };
  }

  if (typeof enabled !== "boolean") {
    return {
      error:
        "product must have enabled property and it must be in boolean format",
    };
  }
  return {
    title,
    desc,
    price,
    imageUrl,
    stock,
    category,
    productDescription,
    enabled,
  };
}

function validateAdminUser(user) {
  const { name, username } = user;
  const email = user.email || "";
  const password = user.password || "";
  if (!isString(name) || !isString(username)) {
    return {
      error:
        "user must have name/username properties and they must be in string format",
    };
  }
  if (!validator.isEmail(email)) {
    return {
      error: "user must have email poperty and it must be in correct format",
    };
  }
  // if (!validator.isLength(password, { min: 6, max: 30 })) {
  //   return {
  //     error: 'password must be at least 6 and less than 30 characters long'
  //   };
  // }
  return { name, username, email, password };
}

function validateUser(user) {
  console.log('In validation ',user);
  const { name, username, age, birthday, phone } = user;
  // const { country, region, street, suite, zipcode } = address;

  // validator syntax
  const email = user.email || "";
  const password = user.password || "";

  if (!isString(name) || !isString(username)) {
    return {
      error:
        "user must have name/username properties and they must be in string format",
    };
  }

  if (!isString(age) || !isCorrectAge(age)) {
    return {
      error:
        "user must have age property it must be greater than 18 and a two digit number",
    };
  }

  if (!isCorrectDate(birthday)) {
    return {
      error:
        "user must have birthday property and it must be YYYY-MM-DD format",
    };
  }

  if (!validator.isEmail(email)) {
    return {
      error: "user must have email poperty and it must be in correct format",
    };
  }

  // if (!validator.isLength(password, { min: 6, max: 30 })) {
  //   return {
  //     error: 'password must be at least 6 and less than 30 characters long'
  //   };
  // }

  if (
    !isString(phone)
    // !isString(country) ||
    // !isString(region) ||
    // !isString(street) ||
    // !isString(suite) ||
    // !isString(zipcode)
  ) {
    return {
      error:
        "user must have phone/address(country/region/street/suite/zipcode) properties and they must be in string format",
    };
  }

  return { name, username, email, password, age, birthday, phone };
}

function validatePayment(data) {
  const { balance, products } = data;
  if (!isString(balance)) {
    return {
      error:
        "payment must have balance property and it must be in string format",
    };
  }
  if (!(products instanceof Array)) {
    return {
      error:
        "payment must have products property and it must be in array format",
    };
  }
  for (prod of products) {
    const res = validateCartProduct(prod);
  }

  return { balance, products };
}

function validateMessage(message) {
  const { title, text, dateSent, name, surname, email } = message;

  if (!isString(title) || !isString(text)) {
    return {
      error:
        "message must have title/text properties and they must be in string format",
    };
  }

  if (!isCorrectDate(dateSent)) {
    return {
      error:
        "message must have dateSent property and it must be YYYY-MM-DD format",
    };
  }

  if (!isString(name) || !isString(surname)) {
    return {
      error:
        "message must have sender property and it must contain name and surname properties in string format",
    };
  }

  if (!validator.isEmail(email)) {
    return {
      error:
        "message must have sender poperty containig email property in correct format",
    };
  }

  return { title, text, name, surname, email, dateSent };
}

// function validateLogin(data) {
//   const email = data.usrname || '';
//   const password = data.password || '';
//   if (!validator.isEmail(email)) {
//     return {
//       error: 'login must have email poperty in correct format'
//     };
//   }
//   if (!validator.isLength(password, { min: 6, max: 30 })) {
//     return {
//       error: 'password must be at least 6 and less than 30 characters long'
//     };
//   }
//   return { email, password };
// }

module.exports = {
  validateProduct,
  validateCartProduct,
  validateAdminUser,
  validateUser,
  validatePayment,
  validateMessage,
  validateOffers,
  // validateLogin
};
