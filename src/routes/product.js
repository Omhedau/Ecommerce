import express from 'express';
import multer from 'multer';
import productController from '../controller/product.js'; 

const router = express.Router();

// Configure Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define routes
router.get('/', productController.getAllProducts);
router.get('/:id',productController.getProductById);
router.post('/', upload.array('images'), productController.addProduct);

export default router;
