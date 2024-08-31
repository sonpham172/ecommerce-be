const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {image, name, type, price, countInStock, rating, description} = newProduct;

      const createdProduct = await Product.create({
        image, name, type, price, countInStock, rating, description
      })
      if(createdProduct) {
        resolve({
          status: 'OK',
          message: "Success",
          data: createdProduct
        })
      }

    } catch (error) {
      reject(error)
    }
  })
}

const updateProduct = (id, newProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, newProduct, {new: true})
      console.log('updatedProduct', updatedProduct);
      if(updatedProduct) {
        resolve({
          status: 'OK',
          message: "Success",
          data: updatedProduct
        })
      }

    } catch (error) {
      reject(error)
    }
  })
}

const getDetailProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const detailProduct = await Product.findById(id)
      console.log('detailProduct', detailProduct);
      if(detailProduct) {
        resolve({
          status: 'OK',
          message: "Success",
          data: detailProduct
        })
      }

    } catch (error) {
      reject(error)
    }
  })
}

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id)
      if(deletedProduct) {
        resolve({
          status: 'OK',
          message: "Delete success"
        })
      }

    } catch (error) {
      reject(error)
    }
  })
}

const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allItem = await Product.countDocuments();
      if(filter) {
        const allProductFilter = await Product.find({
          [filter[0]]: {'$regex': filter[1]}
        }).limit(limit).skip((page-1) * limit);
        if(allProductFilter) {
          resolve({
            status: 'OK',
            message: "Success",
            data: allProductFilter,
            pagination: {
              currentPage: page,
              total: allItem,
              totalPage: Math.ceil(allItem/limit)
            }
          })
        }
      }

      const objectSort = {};
      if(Array.isArray(sort)) {
        objectSort[sort[1]] = sort[0];
      } else {
        objectSort['name'] = sort || 'asc';
      }

      const allProduct = await Product.find().limit(limit).skip((page-1) * limit)
      .sort(objectSort);
      if(allProduct) {
        resolve({
          status: 'OK',
          message: "Success",
          data: allProduct,
          pagination: {
            currentPage: page,
            total: allItem,
            totalPage: Math.ceil(allItem/limit)
          }
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  createProduct, 
  updateProduct,
  getDetailProduct,
  deleteProduct,
  getAllProduct
}