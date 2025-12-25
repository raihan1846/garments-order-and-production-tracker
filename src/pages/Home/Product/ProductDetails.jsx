import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`)
      .then(res => {
        setProduct(res.data);
        if (res.data.images && res.data.images.length > 0) {
          setMainImage(res.data.images[0]);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <div className="text-center py-20">Loading product...</div>;

  const payments = product.paymentOptions?.split(',') || [];
  

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img 
                src={mainImage} 
                alt={product.productName} 
                className="w-full h-auto object-cover" 
              />
            </div>

            <div className="grid grid-cols-5 gap-4">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="rounded-lg cursor-pointer hover:opacity-80 transition border-2 border-transparent hover:border-blue-500 object-cover h-28"
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.productName}</h1>

              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                {product.category}
              </span>

              <div className="flex items-baseline mb-6">
                <span className="text-5xl font-bold text-gray-900">${product.price}</span>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Available Quantity</p>
                  <p className="text-2xl font-semibold text-green-600">{product.availableQuantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Minimum Order</p>
                  <p className="text-2xl font-semibold text-gray-900">{product.minimumOrder}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Options</h3>
                <div className="flex flex-wrap gap-4">
                  {payments.map((p, idx) => (
                    <div key={idx} className="flex items-center px-5 py-3 bg-gray-100 rounded-lg">
                      <span className="font-medium">{p.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

           <div className="mt-auto">
            <Link to={`/order/${product._id}`}>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-8 rounded-xl text-xl shadow-lg transition transform hover:scale-105 flex items-center justify-center">
                Add to Cart / Book Now
                </button>
            </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
