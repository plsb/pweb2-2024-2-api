//controllers/categoryController.js
import db from '../models/index.js';

export const createCategory = async (req, res) => {
  const { description } = req.body;

  try {
    const newCategory = await db.Category.create({ description });
    res.status(201).json({ message: 'Categoria criada com sucesso', category: newCategory });
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ message: 'Erro ao criar categoria' });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await db.Category.findAll();
    res.status(200).json({ message: 'Categorias recuperadas com sucesso', categories });
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    res.status(500).json({ message: 'Erro ao listar categorias' });
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await db.Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.status(200).json({ message: 'Categoria recuperada com sucesso', category });
  } catch (error) {
    console.error('Erro ao buscar categoria por ID:', error);
    res.status(500).json({ message: 'Erro ao buscar categoria por ID' });
  }
};

export const getCategoryByName = async (req, res) => {
  const { description } = req.query;
  
  if (!description) {
    return res.status(400).json({ message: 'Parâmetro description é obrigatório' });
  }

  try {
    const categories = await db.Category.findAll({
        where: {
          description: {
            [db.Sequelize.Op.like]: `%${description}%`
          }
        }
      });
    res.status(200).json({ message: 'Categorias recuperadas com sucesso', categories });
  } catch (error) {
    console.error('Erro ao buscar categorias por nome:', error);
    res.status(500).json({ message: 'Erro ao buscar categorias por nome' });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const category = await db.Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    category.description = description;
    await category.save();

    res.status(200).json({ message: 'Categoria atualizada com sucesso', category });
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(500).json({ message: 'Erro ao atualizar categoria' });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await db.Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    await category.destroy();
    res.status(200).json({ message: 'Categoria deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    res.status(500).json({ message: 'Erro ao deletar categoria' });
  }
};