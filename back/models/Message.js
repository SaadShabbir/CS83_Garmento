class Product {
  constructor({ id, title, text, name, surname, email, dateSent }) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.dateSent = dateSent;
    this.responded = false;
  }
}

module.exports = Product;
