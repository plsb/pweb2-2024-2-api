class Product {
    constructor(id, name, category, price) {
      this._id = id;
      this._name = name;
      this._category = category;
      this._price = price;
    }
  
    // Getters
    get id() {
      return this._id;
    }
  
    get name() {
      return this._name;
    }
  
    get category() {
      return this._category;
    }
  
    get price() {
      return this._price;
    }
  
    // Setters
    set id(value) {
      this._id = value;
    }
  
    set name(value) {
      this._name = value;
    }
  
    set category(value) {
      this._category = value;
    }
  
    set price(value) {
      this._price = value;
    }
  }
  
export default Product;
  