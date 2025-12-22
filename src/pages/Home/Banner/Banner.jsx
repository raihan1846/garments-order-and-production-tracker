import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import img1 from "/src/assets/Bangladesh-rmg-industry-2.webp";
import img2 from "/src/assets/images (1).jpeg";
import img3 from "/src/assets/store-merchandiser-web-banner-landing-page_277904-9227.avif";

const Banner = () => {
    return (
        <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={5000}
            swipeable
        >
            {[img1, img2, img3].map((img, index) => (
                <div key={index} className="relative">
                    {/* Image */}
                    <img
                        src={img}
                        className="h-[70vh] md:h-[85vh] w-full object-cover"
                        alt="Banner"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center text-white px-4 max-w-4xl">
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
                                Realtime Garment Production Tracking Software
                            </h2>

                            <p className="text-sm sm:text-lg md:text-2xl mb-6">
                                Monitor your factory floor in real-time, boost efficiency,
                                and ensure compliance.
                            </p>

                            <a href="#book-demo"
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-lg transition"
                            >
                                Book Now
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default Banner;
