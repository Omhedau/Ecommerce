import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Range, getTrackBackground } from 'react-range';

const Sidebar = () => {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [values, setValues] = useState([33, 66]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

    const categoriesData = {
        gender: ['All', 'Men', 'Women', 'Unisex', 'Kids / boy','Kids / girl'],
        clothing: ['Coats', 'Jackets', 'Dresses', 'Shirts', 'T-shirts', 'Jeans'],
        accessories: ['Bags', 'Belts', 'Hats', 'Scarves', 'Watches', 'Sunglasses'],
        cosmetics: ['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Nailcare', 'Tools']
    };

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    const handleSizeChange = (size) => {
        setSelectedSizes(prevSelectedSizes =>
            prevSelectedSizes.includes(size)
                ? prevSelectedSizes.filter(s => s !== size)
                : [...prevSelectedSizes, size]
        );
    };

    const handleColorChange = (color) => {
        setSelectedColors(prevSelectedColors =>
            prevSelectedColors.includes(color)
                ? prevSelectedColors.filter(c => c !== color)
                : [...prevSelectedColors, color]
        );
    };

    const resetFilters = () => {
        setValues([33, 66]);
        setSelectedSizes([]);
        setSelectedColors([]);
    };

    const colorOptions = [
        { name: 'Blacks', color: 'black' },
        { name: 'Whites', color: 'white' },
        { name: 'Reds', color: 'red' },
        { name: 'Greys', color: 'gray' },
        { name: 'Blues', color: 'blue' },
        { name: 'Beige Tones', color: 'beige' },
        { name: 'Greens', color: 'green' },
        { name: 'Yellows', color: 'yellow' },
    ];

    const categoryKeys = Object.keys(categoriesData);

    return (
        <div className="w-full lg:w-1/4 md:w-1/3 mb-8">
            <div className="shop__sidebar p-4 rounded-lg">
                <div className="sidebar__categories mb-12">
                    <div className="section-title mb-9">
                        <h4 className="text-lg font-medium">Categories</h4>
                    </div>
                    <div className="categories__accordion">
                        <div id="accordionExample">
                            {categoryKeys.map((key, index) => (
                                <div key={index} className="card mb-3 pb-3 border-b border-gray-200">
                                    <div className={`card-heading flex justify-between items-center cursor-pointer ${activeAccordion === index ? 'active' : ''}`}
                                        onClick={() => toggleAccordion(index)}>
                                        <span className="text-base font-medium text-gray-800">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                                        {activeAccordion === index ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>
                                    {activeAccordion === index && (
                                        <div className="card-body pl-4 pt-2">
                                            <ul>
                                                {categoriesData[key].map((subcategory, i) => (
                                                    <li key={i} className="relative pl-4 mb-2">
                                                        <span className="text-sm text-gray-600 leading-7">{subcategory}</span>
                                                        <span className="absolute left-1 top-3 w-1 h-1 bg-gray-600"></span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="sidebar__filter relative mb-15">
                    <div className="section-title mb-12">
                        <h4 className="text-lg font-medium">Shop by price</h4>
                    </div>
                    <div className="filter-range-wrap mb-7">
                        <Range
                            values={values}
                            step={1}
                            min={0}
                            max={99}
                            onChange={(values) => setValues(values)}
                            renderTrack={({ props, children }) => (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: '6px',
                                        width: '100%',
                                        background: getTrackBackground({
                                            values,
                                            colors: ['#ccc', '#f00', '#ccc'],
                                            min: 0,
                                            max: 99,
                                        }),
                                    }}
                                >
                                    {children}
                                </div>
                            )}
                            renderThumb={({ props }) => (
                                <div
                                    {...props}
                                    className="w-4 h-4 bg-red-600 rounded-full"
                                />
                            )}
                        />
                    </div>
                    <div className="relative mb-7">
                        <p className="inline-block text-base text-gray-800 font-medium">Price: </p>
                        <span className="inline-block text-base text-gray-800 mx-2">${values[0]}</span> - <span className="inline-block text-base text-gray-800 mx-2">${values[1]}</span>
                    </div>
                    <a href="#" className="text-sm text-gray-800 uppercase tracking-wide font-bold inline-block py-1 px-6 border-2 border-red-600 rounded-sm absolute right-0 bottom-0">Filter</a>
                </div>
                <div className="sidebar__sizes mb-10">
                    <div className="section-title mb-9">
                        <h4 className="text-lg font-medium">Shop by size</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['xxs', 'xs', 'xs-s', 's', 'm', 'm-l', 'l', 'xl'].map((size, i) => (
                            <label key={i} className="block">
                                <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={selectedSizes.includes(size)} 
                                    onChange={() => handleSizeChange(size)} 
                                />
                                <span className={`inline-block text-sm uppercase text-gray-700 cursor-pointer px-4 py-2 border rounded-md ${selectedSizes.includes(size) ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}>
                                    {size}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="sidebar__color">
                    <div className="section-title mb-9">
                        <h4 className="text-lg font-medium">Shop by color</h4>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {colorOptions.map(({ name, color }, i) => (
                            <label key={i} className="block">
                                <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={selectedColors.includes(name)} 
                                    onChange={() => handleColorChange(name)} 
                                />
                                <span 
                                    className={`inline-block w-8 h-8 rounded-full cursor-pointer border-2 ${selectedColors.includes(name) ? 'border-gray-700' : 'border-transparent'}`} 
                                    style={{ backgroundColor: color }}
                                />
                            </label>
                        ))}
                    </div>
                </div>
                <div className='flex items-center mt-10'>
                    <button 
                        className="py-2 px-4 w-[200px] border-2 border-red-700 uppercase hover:text-white font-bold rounded hover:bg-red-700" 
                        onClick={resetFilters}
                    >
                        Reset Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
