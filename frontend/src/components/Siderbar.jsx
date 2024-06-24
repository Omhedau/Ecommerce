import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Range, getTrackBackground } from "react-range";

const Sidebar = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [values, setValues] = useState([0, 99]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
 // const [selectedGender, setSelectedGender] = useState("All");
  const [selectedBrands, setSelectedBrands] = useState([]);

  // const genderOptions = [
  //   { value: "All", label: "All" },
  //   { value: "Men", label: "Men" },
  //   { value: "Women", label: "Women" },
  //   { value: "Kids / boy", label: "Kids / boy" },
  //   { value: "Kids / girl", label: "Kids / girl" },
  // ];

  const categoriesData = {
    topwear: ["Coats", "Jackets", "Shirts", "T-shirts", "Sweaters"],
    bottomwear: ["Pants", "Shorts", "Skirts", "Jeans", "Leggings"],
    footwear: ["Sneakers", "Boots", "Sandals", "Flats", "Heels"],
  };

  const brandsData = ["Nike", "Adidas", "Puma", "Reebok"]; 

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prevSelectedSizes) =>
      prevSelectedSizes.includes(size)
        ? prevSelectedSizes.filter((s) => s !== size)
        : [...prevSelectedSizes, size]
    );
  };

  const handleColorChange = (color) => {
    setSelectedColors((prevSelectedColors) =>
      prevSelectedColors.includes(color)
        ? prevSelectedColors.filter((c) => c !== color)
        : [...prevSelectedColors, color]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prevSelectedBrands) =>
      prevSelectedBrands.includes(brand)
        ? prevSelectedBrands.filter((b) => b !== brand)
        : [...prevSelectedBrands, brand]
    );
  };

  const resetFilters = () => {
    setValues([33, 66]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedGender("All");
    setSelectedBrands([]);
    setSelectedSubcategories([]);
  };

  const colorOptions = [
    { name: "Blacks", color: "black" },
    { name: "Whites", color: "white" },
    { name: "Reds", color: "red" },
    { name: "Greys", color: "gray" },
    { name: "Blues", color: "blue" },
    { name: "Beige Tones", color: "beige" },
    { name: "Greens", color: "green" },
    { name: "Yellows", color: "yellow" },
  ];

  const categoryKeys = Object.keys(categoriesData);

  // const handleGenderChange = (value) => {
  //   setSelectedGender(value); // Update selected gender state
  // };

  const handleCategorySelect = (category, subcategory) => {
    if (category !== selectedCategory) {
      setSelectedSubcategories([]);
    }
  
    const updateSubcategories = (prevSelectedSubcategories) => {

        if(category !== selectedCategory){
            return [subcategory];
        }

      if (prevSelectedSubcategories.includes(subcategory)) {
        return prevSelectedSubcategories.filter((s) => s !== subcategory);
      } else {
        return [...prevSelectedSubcategories, subcategory];
      }
    };
  
    // Determine the updated subcategories
    const updatedSubcategories = updateSubcategories(selectedSubcategories);
    
    // Update selectedCategory based on the subcategories
    if (updatedSubcategories.length === 0) {
      setSelectedCategory("All");
    } else if (category !== selectedCategory) {
      setSelectedCategory(category);
    }

    console.log(selectedCategory);
    console.log(selectedSubcategories);
    setSelectedSubcategories(updatedSubcategories);
  };
  

  const getSizeOptions = () => {
    switch (selectedCategory) {
      case "topwear":
        return ["xxs", "xs", "s", "m", "l", "xl"];
      case "bottomwear":
        return ["25", "26", "27", "28", "29"];
      case "footwear":
        return ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
      case "All": 
      default:
        return [];
    }
  };

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
                <div
                  key={index}
                  className="card mb-3 pb-3 border-b border-gray-200"
                >
                  <div
                    className={`card-heading flex justify-between items-center cursor-pointer ${
                      activeAccordion === index ? "active" : ""
                    }`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="text-base font-medium text-gray-800">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                    {activeAccordion === index ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </div>
                  {activeAccordion === index && (
                    <div className="card-body pl-4 pt-2">
                      <ul>
                        {categoriesData[key].map((subcategory, i) => (
                          <li
                            key={i}
                            className={`relative pl-4 mb-2 ${
                              selectedCategory === key &&
                              (subcategory === selectedCategory ||
                                selectedSubcategories.includes(subcategory))
                                ? "text-red-600"
                                : "text-gray-600"
                            }`}
                          >
                            <span
                              className="text-sm leading-7"
                              onClick={() =>
                                handleCategorySelect(
                                  key,
                                  subcategory === "All" ? key : subcategory
                                )
                              }
                              style={{ cursor: "pointer" }}
                            >
                              {subcategory}
                            </span>
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
        {/* <div className="sidebar__gender mb-10">
          <div className="section-title mb-9">
            <h4 className="text-lg font-medium">Gender</h4>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {genderOptions.map((option, index) => (
              <label key={index} className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="gender"
                  value={option.value}
                  checked={selectedGender === option.value}
                  onChange={() => handleGenderChange(option.value)}
                />
                <span className="ml-2">{option.label}</span>
              </label>
            ))}
          </div>
        </div> */}
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
              max={99}
              onChange={(values) => setValues(values)}
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
                      max: 99,
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
          <a
            href="#"
            className="text-sm text-gray-800 uppercase tracking-wide font-bold inline-block py-1 px-6 border-2 border-red-600 rounded-sm absolute right-0 bottom-0"
          >
            Filter
          </a>
        </div>{
            selectedCategory !== "All" && <div className="sidebar__sizes mb-10">
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
        }
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
                  className={`inline-block w-8 h-8 rounded-full cursor-pointer border-2 ${
                    selectedColors.includes(name)
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
