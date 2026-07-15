// middleware/validation.js
const { body, param, validationResult } = require('express-validator');

// معالج النتائج
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// قواعد التحقق لكل مسار
exports.validateBook = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('ISBN').notEmpty().withMessage('ISBN is required'),
  body('totalCopies').isInt({ min: 1 }).withMessage('Total copies must be at least 1'),
  handleValidation,
];

exports.validateMember = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  handleValidation,
];

exports.validateBorrow = [
  body('memberId').isMongoId().withMessage('Invalid member ID'),
  body('bookId').isMongoId().withMessage('Invalid book ID'),
  handleValidation,
];

exports.validateReturn = [
  body('memberId').isMongoId().withMessage('Invalid member ID'),
  body('bookId').isMongoId().withMessage('Invalid book ID'),
  handleValidation,
];