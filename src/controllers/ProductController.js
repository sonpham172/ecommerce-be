const ProductService = require("../services/ProductService")

const createProduct = async (req, res) => {
  try {
    const {image, name, type, price, countInStock, rating} = req.body;
    if(!image || !name || !type || !price || !countInStock || !rating) {
      return res.status(200).json({
        message: 'The input is required',
        data: null
      })
    }
    const resCreateProduct = await ProductService.createProduct(req.body);
    return res.status(200).json(resCreateProduct)
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const payload = req.body;
    if(!productId) {
      return res.status(200).json({
        message: 'The productId is required!',
        data: null
      }) 
    }

    const resUpdateProduct = await ProductService.updateProduct(productId, payload);
    return res.status(200).json(resUpdateProduct)
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

const getDetailProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if(!productId) {
      return res.status(200).json({
        message: 'The productId is required!',
        data: null
      }) 
    }

    const resgetDetailProduct = await ProductService.getDetailProduct(productId);
    return res.status(200).json(resgetDetailProduct)
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if(!productId) {
      return res.status(200).json({
        message: 'The productId is required!',
        data: null
      }) 
    }

    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response)
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

const getAllProduct = async (req, res) => {
  try {
    const {limit, page, sort, filter} = req.query;
    const response = await ProductService.getAllProduct(Number(limit) || 5, Number(page) || 1, sort, filter);
    return res.status(200).json(response)
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

module.exports = {
  createProduct,
  updateProduct,
  getDetailProduct,
  deleteProduct,
  getAllProduct
}