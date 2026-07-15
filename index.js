import dotenv from "dotenv";
dotenv.config();

import app from "./app.controller.js";

const PORT = process.env.SERVER_PORT ;

app().listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});