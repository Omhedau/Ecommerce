import express from 'express';
import userController from "../controller/user.js";

const router = express.Router();

router.post("/signup",userController.createUser);
router.post("/signin",userController.loginUser);
router.get("/profile",userController.getUser);

export default router;