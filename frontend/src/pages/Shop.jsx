import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Siderbar';
import { ProductItem } from '../components/NewProducts'; 
import Pagination from '../components/Pagination';
import Dropdown from '../components/Dropdown';
import axios from "axios";
import { useParams } from "react-router-dom";

const ITEMS_PER_PAGE = 9;

const Shop = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const { gender, toplevelCat, category } = useParams();

    useEffect(() => {
        fetchProducts();
    }, [gender,toplevelCat,category]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:5454/product/${gender}/${toplevelCat}/${category}`);
            const fetchedProducts = response.data;
            setProducts(fetchedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSortChange = (option) => {
        // Handle sorting logic
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

    return (
        <>
            <div className='h-40 bg-[#7b713f5b]'>
                {/* Breadcrumb area */}
            </div>
            <div className="flex flex-wrap px-40">
                <Sidebar />
                <div className="relative w-full lg:w-3/4 md:w-2/3 p-4 h-[1500px]">
                    <div className="flex justify-between ml-5 items-center">
                        <div className="text-sm font-medium text-gray-700">
                            Showing {startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, products.length)} of {products.length} results
                        </div>
                        <Dropdown
                            label="Sort by "
                            options={['Low To High', 'Newest', 'High Rated']}
                            onSelect={handleSortChange}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedProducts.map((product) => (
                            <ProductItem key={product._id} product={product} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    );
};

export default Shop;
