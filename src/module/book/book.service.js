import BookModel from "../../model/book.model.js";

// CREATE BOOK
export const createBookService = async (data) => {
    return await BookModel.create(data);
};

// GET ALL BOOKS
export const getAllBooksService = async () => {
    return await BookModel.find();
};

// GET BOOK BY ID
export const getBookByIdService = async (id) => {
    return await BookModel.findById(id);
};

// UPDATE BOOK
export const updateBookService = async (id, data) => {
    return await BookModel.findByIdAndUpdate(id, data, {
        new: true,
    });
};

// DELETE BOOK
export const deleteBookService = async (id) => {
    return await BookModel.findByIdAndDelete(id);
};