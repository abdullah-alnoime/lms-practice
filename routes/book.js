import express from "express";
import { addBook } from "../controllers/book.js";

const router = express.Router();

router.post("/", addBook);

export default router;
