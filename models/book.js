import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    isbn: { type: String, required: true, unique: true },
    totalCopies: { type: Number, required: true, min: 0 },
    availableCopies: {
      type: Number,
      required: true,
      min: [0, "No copies available to borrow"],
    },
  },
  { timestamps: true },
);

export const Book = mongoose.model("Book", bookSchema);
