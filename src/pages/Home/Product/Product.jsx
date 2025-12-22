import React from 'react';

const Product = () => {
    return (
        <div>
            <div className='mt-20 text-center mb-10'>
                <h1 className='font-bold text-4xl mb-3'>Our Products</h1>
                <p>Showing 6 products from our collection</p>
            </div>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
             <div className="card bg-base-100 w-full shadow-sm">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        Card Title
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="card-actions justify-between">
                        <div className="badge badge-outline">$100</div>
                        <div className="badge badge-outline p-4 bg-blue-600">Show Details</div>
                    </div>
                </div>
            </div>
             <div className="card bg-base-100 w-full shadow-sm">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        Card Title
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="card-actions justify-between">
                        <div className="badge badge-outline">$100</div>
                        <div className="badge badge-outline p-4 bg-blue-600">Show Details</div>
                    </div>
                </div>
            </div>
             <div className="card bg-base-100 w-full shadow-sm">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        Card Title
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="card-actions justify-between items-center">
                        <div className="badge badge-outline">$100</div>
                        <div className="badge badge-outline p-4 bg-blue-600">Show Details</div>
                    </div>
                </div>
            </div>
           </div>
        </div>
    );
};

export default Product;