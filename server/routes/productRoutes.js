const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const {
  productIdRules,
  createProductRules,
  updateProductRules,
} = require('../validators/productValidator');
const validate = require('../middleware/validateMiddleware');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', productIdRules, validate, getProductById);

// Protected routes
router.post('/', authenticate, createProductRules, validate, createProduct);
router.put('/:id', authenticate, updateProductRules, validate, updateProduct);
router.delete('/:id', authenticate, productIdRules, validate, deleteProduct);

module.exports = router;
