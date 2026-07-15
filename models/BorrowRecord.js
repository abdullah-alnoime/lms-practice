// models/BorrowRecord.js
const mongoose = require('mongoose');

const borrowRecordSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowDate: { type: Date, default: Date.now },
  returnDate: { type: Date, default: null },
}, { timestamps: true });

// فهرس فريد شرطي: يمنع وجود أكثر من سجل نشط (returnDate=null) لنفس العضو والكتاب
borrowRecordSchema.index(
  { member: 1, book: 1, returnDate: 1 },
  { unique: true, partialFilterExpression: { returnDate: { $eq: null } } }
);

module.exports = mongoose.model('BorrowRecord', borrowRecordSchema);