import express from "express";
import connectDB from "./config/connection.js";
import memberRouter from "./routes/member.js";
import bookRouter from "./routes/book.js";

const app = express();
app.use(express.json());

app.use("/api/v1/member", memberRouter);
app.use("/api/v1/book", bookRouter);

connectDB();

app.listen(5000, () => {
  console.log("listening on port 5000");
});