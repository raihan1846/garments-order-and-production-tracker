import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

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

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by product name..."
          value={search}
          onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
          className="border p-2 rounded w-full md:w-1/3"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, idx) => (
              <tr key={product._id} className="border-b">
                <td className="py-3 px-6">{indexOfFirstProduct + idx + 1}</td>
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

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div className='flex justify-center items-center'>
          <Link className='btn btn-primary p-3 text-3xl text-white shadow-2xl mt-2' to="/addProduct">
            Add Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
