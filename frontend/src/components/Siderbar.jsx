import React, { useState, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [values, setValues] = useState([0, 10000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const brandsData = ["Nike", "Adidas", "H&M", "ZARA", "Uniqlo", "Levi's", "Gucci"];
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const brands = params.get("brands") ? params.get("brands").split(',') : [];
    const sizes = params.get("sizes") ? params.get("sizes").split(',') : [];
    const colors = params.get("colors") ? params.get("colors").split(',') : [];
    const minPrice = params.get("minPrice") ? Number(params.get("minPrice")) : 0;
    const maxPrice = params.get("maxPrice") ? Number(params.get("maxPrice")) : 10000;

    setSelectedBrands(brands);
    setSelectedSizes(sizes);
    setSelectedColors(colors);
    setValues([minPrice, maxPrice]);
  }, [location.search]);

  const handleFilter = (sectionId, value) => {
    const searchParams = new URLSearchParams(location.search);
    let filterValues = searchParams.get(sectionId) ? searchParams.get(sectionId).split(',') : [];

    if (filterValues.includes(value)) {
      filterValues = filterValues.filter(item => item !== value);
      if (filterValues.length === 0) {
        searchParams.delete(sectionId);
      }
    } else {
      filterValues.push(value);
    }

    if (filterValues.length) {
      searchParams.set(sectionId, filterValues.join(','));
    }

    navigate({ search: searchParams.toString() });
  };

  const handleApplyFilters = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("minPrice", values[0]);
    searchParams.set("maxPrice", values[1]);
    navigate({ search: searchParams.toString() });
  };

  const handleBrandChange = (brand) => {
    handleFilter('brands', brand);
    setSelectedBrands((prevSelectedBrands) =>
      prevSelectedBrands.includes(brand)
        ? prevSelectedBrands.filter((b) => b !== brand)
        : [...prevSelectedBrands, brand]
    );
  };

  const handleSizeChange = (size) => {
    handleFilter('sizes', size);
    setSelectedSizes((prevSelectedSizes) =>
      prevSelectedSizes.includes(size)
        ? prevSelectedSizes.filter((s) => s !== size)
        : [...prevSelectedSizes, size]
    );
  };

  const handleColorChange = (color) => {
    handleFilter('colors', color);
    setSelectedColors((prevSelectedColors) =>
      prevSelectedColors.includes(color)
        ? prevSelectedColors.filter((c) => c !== color)
        : [...prevSelectedColors, color]
    );
  };

  const resetFilters = () => {
    setValues([0, 10000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedBrands([]);
    navigate({ search: "" });
  };

  const colorOptions = [
    "black" ,  "white" ,  "red" , "gray" ,  "blue" ,  "beige" , "green" ,"yellow" 
  ];

  const getSizeOptions = () => {
    return ["S", "M", "L", "XL", "25", "26", "27", "28", "29", "36", "37", "38", "39"];
  };

  return (
    <div className="w-full lg:w-1/4 md:w-1/3 mb-8">
      <div className="shop__sidebar p-4 rounded-lg">
        <div className="sidebar__brands mb-10">
          <div className="section-title mb-9">
            <h4 className="text-lg font-medium">Brands</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {brandsData.map((brand, i) => (
              <label key={i} className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                />
                <span className="ml-2">{brand}</span>
              </label>
            ))}
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
              max={10000}
              onChange={(newValues) => setValues(newValues)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "6px",
                    width: "100%",
                    background: getTrackBackground({
                      values,
                      colors: ["#ccc", "#f00", "#ccc"],
                      min: 0,
                      max: 10000,
                    }),
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div {...props} className="w-4 h-4 bg-red-600 rounded-full" />
              )}
            />
          </div>
          <div className="relative mb-7">
            <p className="inline-block text-base text-gray-800 font-medium">
              Price:{" "}
            </p>
            <span className="inline-block text-base text-gray-800 mx-2">
              ${values[0]}
            </span>{" "}
            -{" "}
            <span className="inline-block text-base text-gray-800 mx-2">
              ${values[1]}
            </span>
          </div>
          <button
            className="text-sm text-gray-800 uppercase tracking-wide font-bold inline-block py-1 px-6 border-2 border-red-600 rounded-sm absolute right-0 bottom-0"
            onClick={handleApplyFilters}
          >
            Filter
          </button>
        </div>
        <div className="sidebar__sizes mb-10">
          <div className="section-title mb-9">
            <h4 className="text-lg font-medium">Shop by size</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {getSizeOptions().map((size, i) => (
              <label key={i} className="block">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedSizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                />
                <span
                  className={`inline-block text-sm uppercase cursor-pointer px-4 py-2 border rounded-md ${
                    selectedSizes.includes(size)
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
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
            {colorOptions.map((color, i) => (
              <label key={i} className="block">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedColors.includes(color)}
                  onChange={() => handleColorChange(color)}
                />
                <span
                  className={`inline-block w-8 h-8 rounded-full cursor-pointer border-2 ${
                    selectedColors.includes(color)
                      ? "border-gray-700"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              </label>
            ))}
          </div>
        </div>
        <div className="flex items-center mt-10">
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
