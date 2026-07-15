import { Book } from "../models/book.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, isbn, totalCopies } = req.body;
    if (!title || !author || !isbn || totalCopies === undefined) {
      return res.status(400).json({
        message: "All fields are required (title, author, isbn, totalCopies)",
      });
    }
    if (totalCopies < 0) {
      return res
        .status(400)
        .json({ message: "Total copies cannot be negative" });
    }
    const newBook = new Book({
      title,
      author,
      isbn,
      totalCopies,
      availableCopies: totalCopies,
    });
    await newBook.save();
    return res.status(201).json({
      message: "Book added successfully",
      book: newBook,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "A book with this ISBN already exists" });
    }
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
