import express from 'express';
import userController from "../controller/user.js";

const router = express.Router();

router.post("/signup",userController.createUser);
router.post("/signin",userController.loginUser);

export default router;