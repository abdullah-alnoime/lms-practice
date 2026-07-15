import { Router } from "express";

import {
    createBookController,
    getAllBooksController,
    getBookByIdController,
    updateBookController,
    deleteBookController,
} from "./book.controller.js";

const router = Router();

router.post("/", createBookController);

router.get("/", getAllBooksController);

router.get("/:id", getBookByIdController);

router.put("/:id", updateBookController);

router.delete("/:id", deleteBookController);

export default router;