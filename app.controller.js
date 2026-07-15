import borrowRouting from "./src/module/borrow/borrow.routing.js"
import memberRouter from "./src/module/auth/auth.routing.js"
import bookRouter from "./src/module/book/book.routing.js"
import express from "express"
import dotenv, { config } from "dotenv"
import {databaseConnection} from "./src/database/database-connection.js"
export const app =()=>{
    dotenv.config();
    databaseConnection()
    const router = express()
    router.use(express.json())
    router.use("/api/v1/borrow", borrowRouting)
    router.use("/api/v1/member", memberRouter);
     router.use("/api/v1/book", bookRouter);
    return router
}
export default app