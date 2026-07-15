import {
    createBookService,
    getAllBooksService,
    getBookByIdService,
    updateBookService,
    deleteBookService,
} from "./book.service.js";

// CREATE BOOK
export const createBookController = async (req, res) => {
    try {
        const book = await createBookService(req.body);

        return res.status(201).json(book);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// GET ALL BOOKS
export const getAllBooksController = async (req, res) => {
    try {
        const books = await getAllBooksService();

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// GET BOOK BY ID
export const getBookByIdController = async (req, res) => {
    try {
        const book = await getBookByIdService(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// UPDATE BOOK
export const updateBookController = async (req, res) => {
    try {
        const book = await updateBookService(req.params.id, req.body);

        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// DELETE BOOK
export const deleteBookController = async (req, res) => {
    try {
        await deleteBookService(req.params.id);

        return res.status(200).json({
            message: "Book deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};