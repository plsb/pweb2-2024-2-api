import Product from '../models/product.js';
import productRepository from '../repositories/productRepository.js';

export const getProductById = (req, res) => {
    const { id } = req.params; 
  
    // Converta o id para número para comparação
    const product = productRepository.getById(Number(id));
  
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
  
    res.json(product);
  };

export const listProducts = (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;

  let products = productRepository.getAll();

  // Filter by category
  if (category) {
    products = products.filter(product =>
      product.getCategory().toLowerCase() === category.toLowerCase()
    );
  }

  // Pagination
  const start = (page - 1) * limit;
  const paginatedProducts = products.slice(start, start + parseInt(limit));

  res.json({ total: products.length, page, limit, data: paginatedProducts });
};

export const createProduct = (req, res) => {
  const { name, category, price } = req.body;

  if (!name || !category || !price) {
    return res.status(400).json({ error: 'Name, category, and price are required!' });
  }

  const newProduct = new Product(null, name, category, price);
  const addedProduct = productRepository.add(newProduct);
  res.status(201).json(addedProduct);
};

export const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, category, price } = req.body;

  const updatedProduct = productRepository.update(id, { name, category, price });

  if (!updatedProduct) {
    return res.status(404).json({ error: 'Product not found!' });
  }

  res.json(updatedProduct);
};

export const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);

  const deletedProduct = productRepository.delete(id);

  if (!deletedProduct) {
    return res.status(404).json({ error: 'Product not found!' });
  }

  res.status(204).send();
};
