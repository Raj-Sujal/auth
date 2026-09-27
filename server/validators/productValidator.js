const { body, param } = require('express-validator');

const productIdRules = [
  param('id').isMongoId().withMessage('Invalid product ID'),
];

const createProductRules = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0.01 }).withMessage('Price must be a number greater than 0'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
];

const updateProductRules = [
  param('id').isMongoId().withMessage('Invalid product ID'),
  body('name').optional().trim().notEmpty().withMessage('Product name cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('price').optional().isFloat({ min: 0.01 }).withMessage('Price must be greater than 0'),
  body('category').optional().trim().notEmpty().withMessage('Category cannot be empty'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
];

module.exports = {
  productIdRules,
  createProductRules,
  updateProductRules,
};
