class Product {
  constructor({ id, title, desc, price, images, stock,category,productDescription }) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.price = price;
    this.images = images;
    this.stock = stock;
    this.category = category;
    this.timesBought = '0';
    this.productDescription = productDescription;
    this.reviews = [];
    this.enabled = true;
  }

  static update(
    oldProd,
    { title, desc, price, images, stock, category,productDescription, timesBought }
  ) {
    oldProd.title = title || oldProd.title;
    oldProd.desc = desc || oldProd.desc;
    oldProd.price = price || oldProd.price;
    oldProd.images = images || oldProd.images;
    oldProd.stock = stock || oldProd.stock;
    oldProd.category = category || oldProd.category;
    oldProd.productDescription = productDescription || oldProd.productDescription;
    oldProd.timesBought = timesBought || oldProd.timesBought;
  }

  static updateReviews(product, review) {
    product.reviews.push(review);
  }

  static updateAvrStars(product, avrStars) {
    product.avrStars = product.avrStars || avrStars;
  }

  static updateTimesBought(product, timesBought) {
    product.timesBought = product.timesBought || timesBought;
  }

  static updateStock(product, stock) {
    product.stock = product.stock || stock;
  }
}

module.exports = Product;
