import { Product } from '../models/product.js';
import Category from '../models/category.js';

const productController = {
    getAllProducts: async (req, res) => {
        try {
            console.log("Fetching all products...");
            const products = await Product.find().populate('category');
            console.log("Products fetched:", products);
            res.status(200).json(products);
        } catch (error) {
            console.error("Error retrieving products:", error);
            res.status(500).json({ message: 'Error retrieving products', error });
        }
    },

    addProduct: async (req, res) => {
        try {
            const { title, description, price, discountedPrice, brand, color, sizes, ratings, reviews, categoryName, subcategoryName, gender } = req.body;

            // Find or create the parent category
            let category = await Category.findOne({ name: categoryName });

            if (!category) {
                // Create new category if it doesn't exist
                category = new Category({ name: categoryName });
                await category.save();
            }

            // Find or create the subcategory under the parent category
            let subcategory;
            if (subcategoryName) {
                subcategory = await Category.findOne({ name: subcategoryName, _id: { $in: category.subcategories } });

                if (!subcategory) {
                    // Create new subcategory if it doesn't exist
                    subcategory = new Category({ name: subcategoryName });
                    await subcategory.save();

                    // Add the subcategory to the parent category
                    category.subcategories.push(subcategory._id);
                    await category.save();
                }
            }

            // Map the uploaded files to the imageUrl field
            const imageUrl = req.files.map(file => ({
                data: file.buffer,
                contentType: file.mimetype
            }));

            // Create a new product with the provided data and imageUrl
            const product = new Product({
                title,
                description,
                price,
                discountedPrice,
                brand,
                color,
                sizes: sizes ? JSON.parse(sizes) : [],
                imageUrl,
                ratings: ratings ? JSON.parse(ratings) : [],
                reviews: reviews ? JSON.parse(reviews) : [],
                category: subcategory ? subcategory._id : category._id, // Use subcategory if it exists, otherwise use category
                gender
            });

            // Save the product to the database
            await product.save();

            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error creating product', error });
        }
    },

    getProductById: async (req, res) => {
        try {
            console.log("product get by id");
            const productId = req.params.id;
            const product = await Product.findById(productId)
            //.populate('ratings reviews category');
    
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            
            console.log("product by id->", product);

            return res.status(200).json(product);
        } catch (error) {
            console.error('Error retrieving product by ID:', error);
            return res.status(500).json({ message: 'Error retrieving product', error });
        }
    }
};

export default productController;
