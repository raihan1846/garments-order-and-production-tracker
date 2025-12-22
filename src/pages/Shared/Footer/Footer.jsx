import React from 'react';
import logo from '/src/assets/protracker.webp';
const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div>
            <h6 className="footer-title"><img src={logo} className='h-10 w-30' alt="" /></h6>
            <p className="text-sm leading-relaxed">
              Premium quality products with excellent customer service.
              <br />
              Shop with confidence.
            </p>
            <p className="text-xs mt-4">
              © 2025 ShopName. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="footer-title">Quick Links</h6>
            <ul className="space-y-2">
              <li><a className="link link-hover" href="/">Home</a></li>
              <li><a className="link link-hover" href="/products">All Products</a></li>
              <li><a className="link link-hover" href="/about">About Us</a></li>
              <li><a className="link link-hover" href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h6 className="footer-title">Account</h6>
            <ul className="space-y-2">
              <li><a className="link link-hover" href="/login">Login</a></li>
              <li><a className="link link-hover" href="/register">Register</a></li>
              <li><a className="link link-hover" href="/dashboard">Dashboard</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h6 className="footer-title">Support</h6>
            <ul className="space-y-2">
              <li><a className="link link-hover" href="/faq">FAQ</a></li>
              <li><a className="link link-hover" href="/shipping">Shipping & Returns</a></li>
              <li><a className="link link-hover" href="/privacy">Privacy Policy</a></li>
              <li><a className="link link-hover" href="/terms">Terms of Service</a></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
