import {Product} from '../models/product.js'; 

const getAllProducts = async () => {
    try {
        const products = await Product.find({});
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
    }
};

const addProduct = async (req,res) => {
    try {
        const productData = req.body;
        const newProduct = new Product(productData);

        const savedProduct = await newProduct.save();
        return savedProduct;

    } catch (error) {
        
        console.error('Error adding product:', error);
        throw new Error('Failed to add product');
    }
};


export default {
    getAllProducts,
    addProduct
};
