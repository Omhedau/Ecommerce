import React from "react";

const Hero = () => {
  return (
    <div className="container py-4 h-[638px] grid grid-cols-1 md:grid-cols-4 gap-2">
      <div
        className="col-span-1 md:col-span-2 bg-pink-100 p-8 flex flex-col justify-center"
        style={{
          backgroundImage:
            'url("../../src/assets/img/categories/category-1.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h1 style={{ fontFamily: "Cookie" }}
           className="text-6xl font-bold mb-4">Women's fashion</h1>
          <p style={{fontFamily:'Montserrat'}} className="mb-4 text-2xl">
          Elevate Your Style with Elegance
          </p>
        </div>
        <div className="w-fit">
          <a href="#" className="text-black font-semibold">
            SHOP NOW
          </a>
          <div className="h-1 bg-red-600 w-full mt-1"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 col-span-2 gap-2">
            <div className="bg-green-100 flex"
            style={{
              backgroundImage:
                'url("../../src/assets/img/categories/category-2.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            >
                <div className="p-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Men's fashion</h2>
                        {/* <p className="mb-2">358 items</p> */}
                        <div className="w-fit">
                            <a href="#" className="text-black font-semibold">
                                SHOP NOW
                            </a>
                            <div className="h-1 bg-red-600 w-full mt-1"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-blue-100 flex"
            style={{
              backgroundImage:
                'url("../../src/assets/img/categories/category-3.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            >
                <div className="p-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Kid's fashion</h2>
                        {/* <p className="mb-2">273 items</p> */}
                        <div className="w-fit">
                            <a href="#" className="text-black font-semibold">
                                SHOP NOW
                            </a>
                            <div className="h-1 bg-red-600 w-full mt-1"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-pink-100 flex"
            style={{
              backgroundImage:
                'url("../../src/assets/img/categories/category-4.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            >
                <div className="p-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Cosmetics</h2>
                        {/* <p className="mb-2">159 items</p> */}
                        <div className="w-fit">
                            <a href="#" className="text-black font-semibold">
                                SHOP NOW
                            </a>
                            <div className="h-1 bg-red-600 w-full mt-1"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-blue-100 flex"
            style={{
              backgroundImage:
                'url("../../src/assets/img/categories/category-5.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            >
                <div className="p-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Accessories</h2>
                        {/* <p className="mb-2">792 items</p> */}
                        <div className="w-fit">
                            <a href="#" className="text-black font-semibold">
                                SHOP NOW
                            </a>
                            <div className="h-1 bg-red-600 w-full mt-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Hero;
