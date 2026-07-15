import { Router } from "express";

import {
    createMemberController,
    getAllMembersController,
    getMemberByIdController
} from "./auth.controller.js";

const router = Router();

router.post("/", createMemberController);

router.get("/", getAllMembersController);

router.get("/:id", getMemberByIdController);

export default router;