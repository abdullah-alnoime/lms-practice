import {getBooksByMemberController,getMembersByBookController,createBorrowController} from "./borrow.controller.js"
import express from "express"
const borrowRouter = express.Router()
// http://localhost:4000/api/v1/borrow//member/:memberId
borrowRouter.get("/member/:memberId",getBooksByMemberController);
// http://localhost:4000/api/v1/borrow//member/:memberId
borrowRouter.get("/book/:bookId",getMembersByBookController);
// http://localhost:4000/api/v1/borrow/
borrowRouter.post("/", createBorrowController);
export default borrowRouter;