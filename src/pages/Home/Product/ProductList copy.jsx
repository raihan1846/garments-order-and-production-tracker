import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://garments-order-production-tracker-s-zeta.vercel.app/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    axios.delete(`https://garments-order-production-tracker-s-zeta.vercel.app/products/${id}`)
      .then(() => setProducts(products.filter(p => p._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full  shadow-md rounded-lg overflow-hidden">
          <thead className="">
            <tr>
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={product._id} className="border-b ">
                <td className="py-3 px-6">{idx + 1}</td>
                <td className="py-3 px-6">{product.productName}</td>
                <td className="py-3 px-6">
                  <img 
                    src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/50'} 
                    alt={product.productName} 
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-6">${product.price}</td>
                <td className="py-3 px-6 text-center space-x-2">
                  <Link 
                    to={`/productDetails/${product._id}`} 
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Show
                  </Link>
                  <Link 
                    to={`/editProduct/${product._id}`} 
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(product._id)} 
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='flex justify-center items-center'>
            <Link className='btn btn-primary p-3 text-3xl text-white shadow-2xl mt-2' to="/addProduct">Add Product</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
