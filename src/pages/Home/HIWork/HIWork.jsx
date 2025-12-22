import React from 'react';
import { 
  FaSearch, 
  FaShoppingCart, 
  FaCreditCard, 
  FaShippingFast,
  FaArrowRight,
  FaCheckCircle,
  FaRegSmile,
  FaUserPlus,
  FaShieldAlt,
  FaClock
} from 'react-icons/fa';

const HIWork = () => {
  const steps = [
    {
      icon: <FaSearch className="text-3xl" />,
      title: "Browse Products",
      description: "Explore thousands of products across categories",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: <FaShoppingCart className="text-3xl" />,
      title: "Add to Cart",
      description: "Select items and add them to your shopping cart",
      gradient: "from-purple-500 to-pink-400"
    },
    {
      icon: <FaCreditCard className="text-3xl" />,
      title: "Secure Checkout",
      description: "Safe payment with multiple options available",
      gradient: "from-green-500 to-emerald-400"
    },
    {
      icon: <FaShippingFast className="text-3xl" />,
      title: "Fast Delivery",
      description: "Get your order delivered in 2-3 business days",
      gradient: "from-orange-500 to-red-400"
    }
  ];

  const features = [
    {
      icon: <FaUserPlus className="text-xl" />,
      text: "No account needed"
    },
    {
      icon: <FaShieldAlt className="text-xl" />,
      text: "100% secure"
    },
    {
      icon: <FaClock className="text-xl" />,
      text: "24/7 support"
    },
    {
      icon: <FaRegSmile className="text-xl" />,
      text: "Easy returns"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple steps to get your products delivered to your doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white shadow-lg`}>
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  {step.description}
                </p>
                
                <div className="flex justify-center">
                  <FaCheckCircle className="text-green-500 text-2xl" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center justify-center mb-12">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400"></div>
              <FaArrowRight className="text-gray-400 mx-4" />
            </React.Fragment>
          ))}
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-green-400"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center justify-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
              <div className="text-blue-600">
                {feature.icon}
              </div>
              <span className="text-gray-700 font-medium">
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-10 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center mx-auto">
            Start Shopping Now
            <FaArrowRight className="ml-3" />
          </button>
          <p className="mt-4 text-gray-500 text-sm">
            Free shipping on orders above $50
          </p>
        </div>
      </div>
    </div>
  );
};

export default HIWork;