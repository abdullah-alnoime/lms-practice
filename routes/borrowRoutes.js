const express = require('express');
const {
  borrowBook,
  returnBook,
  getMemberBooks,
  getBookBorrowers,
} = require('../controllers/borrowController');
const { validateBorrow, validateReturn } = require('../middleware/validation');
const router = express.Router();

router.post('/borrow', validateBorrow, borrowBook);
router.post('/return', validateReturn, returnBook);
router.get('/member/:memberId/books', getMemberBooks);
router.get('/book/:bookId/members', getBookBorrowers);

module.exports = router;