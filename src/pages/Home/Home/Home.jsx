import React from 'react';
import Banner from '../Banner/Banner';
import Product from '../Product/Product';
import HIWork from '../HIWork/HIWork';
import Review from '../Review/Review';
import SingleSixProduct from '../Product/SingleSixProduct';

const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <SingleSixProduct></SingleSixProduct>
            <HIWork></HIWork>
            <Review></Review>
        </div>
    );
};

export default Home;