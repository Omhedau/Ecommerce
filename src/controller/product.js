import { Product } from '../models/product.js';
import Category from '../models/category.js';

const productController = {
    getAllProducts: async (req, res) => {
        try {
            console.log("Fetching all products...");
            const products = await Product.find()
            //.populate('category');
            console.log("Products fetched:", products);
            res.status(200).json(products);
        } catch (error) {
            console.error("Error retrieving products:", error);
            res.status(500).json({ message: 'Error retrieving products', error });
        }
    },

    getProductByGender: async (req, res) => {
        try {
            const { gender } = req.params;
            console.log(`Fetching products for gender: ${gender}`);
            const products = await Product.find({ gender })
            // .populate({
            //     path: 'category',
            //     populate: {
            //         path: 'parentCategory',
            //         model: 'Category'
            //     }
            // });
    
            if (products.length === 0) {
                return res.status(404).json({ message: `No products found for gender: ${gender}` });
            }
    
            // Initialize brand and category data
            const brandData = {
                topwear: [],
                bottomWear: [],
                footwear: []
            };
    
            const categoryData = {
                topwear: [],
                bottomWear: [],
                footwear: []
            };
    
            // Categorize products and collect brand and category data
            // products.forEach(product => {
            //     const parentCategoryName = product.category.parentCategory ? product.category.parentCategory.name : product.category.name;
    
            //     switch (parentCategoryName.toLowerCase()) {
            //         case 'topwear':
            //             if (!brandData.topwear.includes(product.brand)) {
            //                 brandData.topwear.push(product.brand);
            //             }
            //             if (!categoryData.topwear.includes(product.category.name)) {
            //                 categoryData.topwear.push(product.category.name);
            //             }
            //             break;
            //         case 'bottomwear':
            //             if (!brandData.bottomWear.includes(product.brand)) {
            //                 brandData.bottomWear.push(product.brand);
            //             }
            //             if (!categoryData.bottomWear.includes(product.category.name)) {
            //                 categoryData.bottomWear.push(product.category.name);
            //             }
            //             break;
            //         case 'footwear':
            //             if (!brandData.footwear.includes(product.brand)) {
            //                 brandData.footwear.push(product.brand);
            //             }
            //             if (!categoryData.footwear.includes(product.category.name)) {
            //                 categoryData.footwear.push(product.category.name);
            //             }
            //             break;
            //         default:
            //             break;
            //     }
            // });
    
            console.log(`Products fetched for gender ${gender}:`, products);
            res.status(200).json({ products, brandData, categoryData });
        } catch (error) {
            console.error("Error retrieving products by gender:", error);
            res.status(500).json({ message: 'Error retrieving products by gender', error });
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
                subcategory = await Category.findOne({ name: subcategoryName, parentCategory: category._id });

                if (!subcategory) {
                    // Create new subcategory if it doesn't exist
                    subcategory = new Category({ name: subcategoryName, parentCategory: category._id });
                    await subcategory.save();
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
                ratings: ratings ? parseFloat(ratings) : 0,
                reviews: reviews ? JSON.parse(reviews) : [],
                category: subcategory ? subcategory._id : category._id, // Use subcategory if it exists, otherwise use category
                gender
            });

            // Save the product to the database
            await product.save();

            res.status(201).json(product);
        } catch (error) {
            console.error("Error creating product:", error);
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
