// controllers/productController.js
import db from '../models/index.js';

export const createProduct = async (req, res) => {
  const { name, categoryId, price } = req.body;

  try {
    const newProduct = await db.Product.create({ name, categoryId, price });
    res.status(201).json({ message: 'Produto criado com sucesso', product: newProduct });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ message: 'Erro ao criar produto' });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll({
      include: [{ model: db.Category, as: 'Category' }], // Inclui a categoria associada
    });
    res.status(200).json({ message: 'Produtos recuperados com sucesso', products });
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ message: 'Erro ao listar produtos' });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await db.Product.findByPk(id, {
      include: [{ model: db.Category, as: 'Category' }], // Inclui a categoria associada
    });
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.status(200).json({ message: 'Produto recuperado com sucesso', product });
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    res.status(500).json({ message: 'Erro ao buscar produto por ID' });
  }
};

export const getProductsByName = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: 'Parâmetro name é obrigatório' });
  }

  try {
    const products = await db.Product.findAll({
      where: {
        name: {
          [db.Sequelize.Op.like]: `%${name}%`, // Busca produtos com nome semelhante
        },
      },
      include: [{ model: db.Category, as: 'Category' }], // Inclui a categoria associada
    });
    res.status(200).json({ message: 'Produtos recuperados com sucesso', products });
  } catch (error) {
    console.error('Erro ao buscar produtos por nome:', error);
    res.status(500).json({ message: 'Erro ao buscar produtos por nome' });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.query;

  if (!categoryId) {
    return res.status(400).json({ message: 'Parâmetro categoryId é obrigatório' });
  }

  try {
    const products = await db.Product.findAll({
      where: { categoryId }, // Filtra produtos pela categoria
      include: [{ model: db.Category, as: 'Category' }], // Inclui a categoria associada
    });
    res.status(200).json({ message: 'Produtos recuperados com sucesso', products });
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error);
    res.status(500).json({ message: 'Erro ao buscar produtos por categoria' });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, categoryId, price } = req.body;

  try {
    const product = await db.Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    product.name = name;
    product.categoryId = categoryId;
    product.price = price;
    await product.save();

    res.status(200).json({ message: 'Produto atualizado com sucesso', product });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ message: 'Erro ao atualizar produto' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await db.Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    await product.destroy();
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ message: 'Erro ao deletar produto' });
  }
};