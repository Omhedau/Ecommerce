import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Siderbar';
import { ProductItem } from '../components/NewProducts'; 
import Pagination from '../components/Pagination';
import Dropdown from '../components/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../redux/actions/product';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Loader from '../components/Loader';

const ITEMS_PER_PAGE = 9;

const Shop = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('Newest');
    const { gender, toplevelCat, category } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const { products, totalPages, loading } = useSelector(state => state.products);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const page = searchParams.get("page");
        const sort = searchParams.get("sort");

        setCurrentPage(page ? Number(page) : 1);
        setSortOption(sort || 'Newest');

        fetchProducts();
    }, [location.search, gender, toplevelCat, category]);

    const fetchProducts = async () => {
        try {
            const searchParams = new URLSearchParams(location.search);
            const page = searchParams.get("page") || 1;
            const sort = searchParams.get("sort") || 'Newest';
            const minPrice = searchParams.get("minPrice");
            const maxPrice = searchParams.get("maxPrice");
            const brands = searchParams.get("brands");
            const sizes = searchParams.get("sizes");
            const colors = searchParams.get("colors");

            const options = { page, sort, minPrice, maxPrice, brands, sizes, colors, limit: ITEMS_PER_PAGE };

            dispatch(getAllProducts(gender,toplevelCat,category,options));

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("page", pageNumber);
        navigate({ search: searchParams.toString() });
    };

    const handleSortChange = (option) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("sort", option);
        navigate({ search: searchParams.toString() });
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    if(!products){
        return <Loader/>;
    }

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
                            options={['Low To High', 'High To Low', 'Newest', 'High Rated']}
                            onSelect={handleSortChange}
                            selected={sortOption}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {products.map((product) => (
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
