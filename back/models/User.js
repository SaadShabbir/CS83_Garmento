class User {
  constructor({
    id,
    name,
    username,
    email,
    password,
    age,
    birthday,
    adress,
    phone,
    gender,
    userType
  }) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.age = age;
    this.birthday = birthday;
    this.adress = adress;
    this.phone = phone;
    this.gender = gender;
    this.userType = userType;
    this.balance = '0';
    this.broughtProducts = [];
    this.cart = {
      active: false,
      products: []
    };
  }

  static update(
    oldUser,
    { name, email, password, age, birthday, adress, phone }
  ) {
    oldUser.name = name || oldUser.name;
    oldUser.email = email || oldUser.email;
    oldUser.password = password || oldUser.password;
    oldUser.age = age || oldUser.age;
    oldUser.birthday = birthday || oldUser.birthday;
    oldUser.adress = adress || oldUser.adress;
    oldUser.phone = phone || oldUser.phone;
  }

  static updateBalance(user, balance) {
    user.balance = balance || user.balance;
  }
  static updateUserName(user, username) {
    user.username = username || user.username;
  }
  static updatebroughtProducts(user, broughtProducts) {
    user.broughtProducts = broughtProducts || user.broughtProducts;
  }
  static addToCart(user, product) {
    const updatedItem = user.cart.find(item => product.productId === item.id);
    console.log(user.cart, product);
    if (updatedItem) {
      updatedItem.quantity = product.quantity;
    } else {
      user.cart.push({ id: product.productId, quantity: product.quantity });
    }
  }
  static removeFromCart(user, product) {
    user.cart.splice(user.cart.indexOf(product), 1);
  }
  static emptyCart(user) {
    user.cart.length = 0;
  }
}

module.exports = User;
