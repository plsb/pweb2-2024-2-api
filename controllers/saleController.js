// controllers/saleController.js
import db from '../models/index.js';

export const createSale = async (req, res) => {
  const { saleDate, discount, products } = req.body; // products será um array de { productId, unitPrice, quantity }

  try {
    // Validar se os produtos foram enviados
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'É necessário informar ao menos um produto para a venda' });
    }

    // Criar a venda
    const newSale = await db.Sale.create({
      saleDate: saleDate || new Date(),
      discount: discount || 0.00,
      totalAmount: 0 // Será calculado após adicionar os produtos
    });

    // Adicionar produtos à venda e calcular o total
    let totalAmount = 0;
    for (const product of products) {
      const { productId, unitPrice, quantity } = product;
      const dbProduct = await db.Product.findByPk(productId);
      if (!dbProduct) {
        return res.status(404).json({ message: `Produto com ID ${productId} não encontrado` });
      }

      await newSale.addProduct(dbProduct, {
        through: { unitPrice: unitPrice || dbProduct.price, quantity: quantity || 1 }
      });
      totalAmount += (unitPrice || dbProduct.price) * (quantity || 1);
    }

    // Atualizar o totalAmount com o desconto aplicado
    newSale.totalAmount = totalAmount - (discount || 0);
    await newSale.save();

    // Buscar a venda com os produtos incluídos
    const saleWithProducts = await db.Sale.findByPk(newSale.id, {
      include: [{ model: db.Product, through: { attributes: ['unitPrice', 'quantity'] } }]
    });

    res.status(201).json({ message: 'Venda criada com sucesso', sale: saleWithProducts });
  } catch (error) {
    console.error('Erro ao criar venda:', error);
    res.status(500).json({ message: 'Erro ao criar venda' });
  }
};

export const getAllSales = async (req, res) => {
  try {
    const sales = await db.Sale.findAll({
      include: [{ model: db.Product, through: { attributes: ['unitPrice', 'quantity'] } }]
    });
    res.status(200).json({ message: 'Vendas recuperadas com sucesso', sales });
  } catch (error) {
    console.error('Erro ao listar vendas:', error);
    res.status(500).json({ message: 'Erro ao listar vendas' });
  }
};

export const getSaleById = async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await db.Sale.findByPk(id, {
      include: [{ model: db.Product, through: { attributes: ['unitPrice', 'quantity'] } }]
    });
    if (!sale) {
      return res.status(404).json({ message: 'Venda não encontrada' });
    }
    res.status(200).json({ message: 'Venda recuperada com sucesso', sale });
  } catch (error) {
    console.error('Erro ao buscar venda por ID:', error);
    res.status(500).json({ message: 'Erro ao buscar venda por ID' });
  }
};

export const getSalesByDate = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: 'Parâmetro date é obrigatório' });
  }

  try {
    const sales = await db.Sale.findAll({
      where: {
        saleDate: {
          [db.Sequelize.Op.between]: [
            new Date(date + ' 00:00:00'),
            new Date(date + ' 23:59:59')
          ]
        }
      },
      include: [{ model: db.Product, through: { attributes: ['unitPrice', 'quantity'] } }]
    });
    res.status(200).json({ message: 'Vendas recuperadas com sucesso', sales });
  } catch (error) {
    console.error('Erro ao buscar vendas por data:', error);
    res.status(500).json({ message: 'Erro ao buscar vendas por data' });
  }
};

export const updateSale = async (req, res) => {
  const { id } = req.params;
  const { saleDate, discount, products } = req.body;

  try {
    const sale = await db.Sale.findByPk(id);
    if (!sale) {
      return res.status(404).json({ message: 'Venda não encontrada' });
    }

    // Atualizar os campos básicos
    sale.saleDate = saleDate || sale.saleDate;
    sale.discount = discount !== undefined ? discount : sale.discount;

    // Se produtos forem enviados, atualizar a lista de produtos
    if (products && Array.isArray(products)) {
      // Remover produtos existentes
      await db.SaleProduct.destroy({ where: { saleId: id } });

      // Adicionar novos produtos e recalcular o total
      let totalAmount = 0;
      for (const product of products) {
        const { productId, unitPrice, quantity } = product;
        const dbProduct = await db.Product.findByPk(productId);
        if (!dbProduct) {
          return res.status(404).json({ message: `Produto com ID ${productId} não encontrado` });
        }

        await sale.addProduct(dbProduct, {
          through: { unitPrice: unitPrice || dbProduct.price, quantity: quantity || 1 }
        });
        totalAmount += (unitPrice || dbProduct.price) * (quantity || 1);
      }
      sale.totalAmount = totalAmount - sale.discount;
    }

    await sale.save();

    const updatedSale = await db.Sale.findByPk(id, {
      include: [{ model: db.Product, through: { attributes: ['unitPrice', 'quantity'] } }]
    });

    res.status(200).json({ message: 'Venda atualizada com sucesso', sale: updatedSale });
  } catch (error) {
    console.error('Erro ao atualizar venda:', error);
    res.status(500).json({ message: 'Erro ao atualizar venda' });
  }
};

export const deleteSale = async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await db.Sale.findByPk(id);
    if (!sale) {
      return res.status(404).json({ message: 'Venda não encontrada' });
    }

    await sale.destroy();
    res.status(200).json({ message: 'Venda deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar venda:', error);
    res.status(500).json({ message: 'Erro ao deletar venda' });
  }
};