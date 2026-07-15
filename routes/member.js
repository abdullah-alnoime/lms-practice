import express from "express";
import { registerMember } from "../controllers/member.js";

const router = express.Router();

router.post("/", registerMember);

export default router;
