import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <div className='mt-20 text-center mb-10'>
        <h1 className='font-bold text-4xl mb-3'>Our Products</h1>
        <p>Showing {products.length} products from our collection</p>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map(product => (
          <div key={product._id} className="card bg-base-100 w-full shadow-md">
            <figure>
              <img 
                src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/300'} 
                alt={product.productName} 
                className="h-64 w-full object-cover" 
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {product.productName}
                {product.showOnHome && <div className="badge badge-secondary">NEW</div>}
              </h2>
              <p>{product.description}</p>
              <div className="card-actions justify-between items-center mt-4">
                <div className="badge badge-outline">${product.price}</div>
                <Link to={`/productDetails/${product._id}`}  className="btn badge badge-outline p-3 bg-blue-600 text-white hover:bg-blue-700">
                  Show Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
