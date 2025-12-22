import React from 'react';

const ProductDetails = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Breadcrumb */}
               
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left: Images Section */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <img 
                                src="https://img.freepik.com/premium-photo/front-view-wireless-ear-full-size-headphones-isolated-white-background-clipping-path_252965-1155.jpg" 
                                alt="Premium Wireless Headphones - Main View" 
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="grid grid-cols-5 gap-4">
                            <img 
                                src="https://img.freepik.com/premium-photo/front-view-wireless-ear-full-size-headphones-isolated-white-background-clipping-path_252965-1155.jpg" 
                                alt="Thumbnail 1" 
                                className="rounded-lg cursor-pointer hover:opacity-80 transition border-2 border-transparent hover:border-blue-500 object-cover h-28"
                            />
                            <img 
                                src="https://cdn.shopify.com/s/files/1/0742/0683/9100/files/best_over_ear_headphones_under_200_dollars.jpg?v=1761201454" 
                                alt="Thumbnail 2" 
                                className="rounded-lg cursor-pointer hover:opacity-80 transition border-2 border-transparent hover:border-blue-500 object-cover h-28"
                            />
                            <img 
                                src="https://cdn.thewirecutter.com/wp-content/media/2025/09/BEST-WIRELESS-WIRED-HEADSETS-8960-3x2-1.jpg?auto=webp&quality=75&crop=1.91:1&width=1200" 
                                alt="Thumbnail 3" 
                                className="rounded-lg cursor-pointer hover:opacity-80 transition border-2 border-transparent hover:border-blue-500 object-cover h-28"
                            />
                            <img 
                                src="https://cdn.mos.cms.futurecdn.net/5EXYtCuqRyRpHPSFDMJqgB.jpg" 
                                alt="Thumbnail 4" 
                                className="rounded-lg cursor-pointer hover:opacity-80 transition border-2 border-transparent hover:border-blue-500 object-cover h-28"
                            />
                            <img 
                                src="https://platform.theverge.com/wp-content/uploads/sites/2/2025/12/fairbuds_xl2.jpg?quality=90&strip=all&crop=0,0,100,100" 
                                alt="Thumbnail 5" 
                                className="rounded-lg cursor-pointer hover:opacity-80 transition border-2 border-transparent hover:border-blue-500 object-cover h-28"
                            />
                        </div>
                    </div>

                    {/* Right: Product Information */}
                    <div className="flex flex-col justify-between">
                        <div>
                            {/* Product Title */}
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Premium Wireless Headphones
                            </h1>

                            {/* Category Badge */}
                            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                                Electronics
                            </span>

                            {/* Price */}
                            <div className="flex items-baseline mb-6">
                                <span className="text-5xl font-bold text-gray-900">$299.99</span>
                            </div>

                            {/* Stock & Minimum Order */}
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Available Quantity</p>
                                    <p className="text-2xl font-semibold text-green-600">48 in stock</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Minimum Order</p>
                                    <p className="text-2xl font-semibold text-gray-900">1 unit</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Experience superior sound quality with these premium wireless headphones. 
                                    Featuring active noise cancellation, 30-hour battery life, and premium comfort padding. 
                                    Perfect for music lovers, professionals, and travelers.
                                </p>
                            </div>

                            {/* Payment Options */}
                            <div className="mb-10">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Options</h3>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center px-5 py-3 bg-gray-100 rounded-lg">
                                        <i className="fab fa-cc-visa text-2xl text-blue-600 mr-3"></i>
                                        <span className="font-medium">Visa</span>
                                    </div>
                                    <div className="flex items-center px-5 py-3 bg-gray-100 rounded-lg">
                                        <i className="fab fa-cc-mastercard text-2xl text-orange-600 mr-3"></i>
                                        <span className="font-medium">Mastercard</span>
                                    </div>
                                    <div className="flex items-center px-5 py-3 bg-gray-100 rounded-lg">
                                        <i className="fab fa-paypal text-2xl text-blue-800 mr-3"></i>
                                        <span className="font-medium">PayPal</span>
                                    </div>
                                    <div className="flex items-center px-5 py-3 bg-gray-100 rounded-lg">
                                        <i className="fas fa-university text-2xl text-gray-700 mr-3"></i>
                                        <span className="font-medium">Bank Transfer</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order / Booking Button */}
                        <div className="mt-auto">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-8 rounded-xl text-xl shadow-lg transition transform hover:scale-105 flex items-center justify-center">
                                <i className="fas fa-shopping-cart mr-3"></i>
                                Add to Cart / Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;