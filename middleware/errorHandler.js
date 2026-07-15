// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err);

  // أخطاء مخصصة
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  // أخطاء Mongoose (مثل التكرار)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({ message: `Duplicate value for ${field}` });
  }

  // أخطاء التحقق من صحة Mongoose
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ messages });
  }

  // خطأ عام
  res.status(500).json({ message: 'Internal server error' });
};

module.exports = errorHandler;