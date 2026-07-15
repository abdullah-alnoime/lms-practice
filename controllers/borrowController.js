// controllers/borrowController.js
const BorrowRecord = require('../models/BorrowRecord.js');
const Book = require('../models/Book');
const Member = require('../models/Member');
const mongoose = require('mongoose');

// استعارة كتاب
exports.borrowBook = async (req, res, next) => {
  const { memberId, bookId } = req.body;

  // بدء جلسة (Session) للمعاملة
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. التحقق من وجود العضو والكتاب
    const member = await Member.findById(memberId).session(session);
    if (!member) {
      throw { status: 404, message: 'Member not found' };
    }

    const book = await Book.findById(bookId).session(session);
    if (!book) {
      throw { status: 404, message: 'Book not found' };
    }

    // 2. التحقق من توفر نسخ
    if (book.availableCopies <= 0) {
      throw { status: 409, message: 'No available copies of this book' };
    }

    // 3. التحقق من أن العضو لم يستعر هذا الكتاب مسبقاً (وهو لم يرده)
    const activeBorrow = await BorrowRecord.findOne({
      member: memberId,
      book: bookId,
      returnDate: null,
    }).session(session);

    if (activeBorrow) {
      throw { status: 409, message: 'You already borrowed this book and have not returned it yet' };
    }

    // 4. التحقق من عدد الكتب المستعارة حالياً (حد أقصى 5)
    const activeCount = await BorrowRecord.countDocuments({
      member: memberId,
      returnDate: null,
    }).session(session);

    if (activeCount >= 5) {
      throw { status: 409, message: 'You have reached the maximum of 5 borrowed books' };
    }

    // 5. إنشاء سجل إعارة جديد وتقليل النسخ المتاحة
    const borrowRecord = new BorrowRecord({
      member: memberId,
      book: bookId,
    });

    book.availableCopies -= 1;
    await book.save({ session });
    await borrowRecord.save({ session });

    // إنهاء المعاملة بنجاح
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: 'Book borrowed successfully',
      borrowRecord,
    });

  } catch (error) {
    // إلغاء المعاملة في حالة الخطأ
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// إرجاع كتاب
exports.returnBook = async (req, res, next) => {
  const { memberId, bookId } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. البحث عن سجل الإعارة النشط
    const borrowRecord = await BorrowRecord.findOne({
      member: memberId,
      book: bookId,
      returnDate: null,
    }).session(session);

    if (!borrowRecord) {
      throw { status: 404, message: 'No active borrow record found for this member and book' };
    }

    // 2. تحديث سجل الإعارة: تعيين تاريخ الإرجاع
    borrowRecord.returnDate = new Date();
    await borrowRecord.save({ session });

    // 3. زيادة النسخ المتاحة
    const book = await Book.findById(bookId).session(session);
    book.availableCopies += 1;
    await book.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: 'Book returned successfully',
      borrowRecord,
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// الحصول على جميع الكتب المستعارة من قبل عضو معين
exports.getMemberBooks = async (req, res, next) => {
  const { memberId } = req.params;
  try {
    const records = await BorrowRecord.find({ member: memberId, returnDate: null })
      .populate('book', 'title author ISBN')
      .lean();

    res.status(200).json(records);
  } catch (error) {
    next(error);
  }
};

// الحصول على جميع الأعضاء الذين يستعرون كتاب معين حالياً
exports.getBookBorrowers = async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const records = await BorrowRecord.find({ book: bookId, returnDate: null })
      .populate('member', 'name email')
      .lean();

    res.status(200).json(records);
  } catch (error) {
    next(error);
  }
};