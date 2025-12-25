import React from 'react';
import Banner from '../Banner/Banner';
import Product from '../Product/Product';
import HIWork from '../HIWork/HIWork';
import Review from '../Review/Review';

const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <Product></Product>
            <HIWork></HIWork>
            <Review></Review>
        </div>
    );
};

export default Home;