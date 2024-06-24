import express from 'express';
import multer from 'multer';
import productController from '../controller/product.js'; 

const router = express.Router();

// Configure Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define routes
router.get('/', productController.getAllProducts);
router.get('/:gender', productController.getProductByGender);
router.get('/id/:id', productController.getProductById); // Corrected this line
router.post('/', upload.array('images'), productController.addProduct);

export default router;
