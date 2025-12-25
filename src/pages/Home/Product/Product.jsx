import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state
  const productsPerPage = 6;

  // Fetch products
  useEffect(() => {
    setLoading(true);
    axios.get('https://garments-order-production-tracker-s-zeta.vercel.app/products')
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);

        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(res.data.map(p => p.category))];
        setCategories(uniqueCategories);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Filter and search logic
  useEffect(() => {
    let updatedProducts = [...products];

    if (selectedCategory !== 'All') {
      updatedProducts = updatedProducts.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      updatedProducts = updatedProducts.filter(p =>
        p.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, products]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='text-center'>
          <div className='loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin mx-auto mb-4'></div>
          <p className='text-lg font-semibold'>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='mt-20 text-center mb-10'>
        <h1 className='font-bold text-4xl mb-3'>Our Products</h1>
        <p>Showing {filteredProducts.length} products from our collection</p>
        
        {/* Filter & Search */}
        <div className='flex justify-center gap-4 mt-5 flex-wrap'>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className='select select-bordered w-40'
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input
            type='text'
            placeholder='Search products...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='input input-bordered w-64'
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {currentProducts.map(product => (
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
                <Link to={`/productDetails/${product._id}`} className="btn badge badge-outline p-3 bg-blue-600 text-white hover:bg-blue-700">
                  Show Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-center mt-8 gap-2'>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Product;
