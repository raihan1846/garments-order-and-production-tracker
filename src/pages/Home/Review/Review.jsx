import React from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const reviews = [
  {
    name: "Rahim Textiles Ltd.",
    role: "Merchandising Manager",
    review:
      "This system made order tracking and production monitoring extremely easy. Real-time updates reduced delays significantly.",
  },
  {
    name: "Ayesha Fashion Wear",
    role: "Production Head",
    review:
      "User-friendly and very efficient. We can now monitor production stages without confusion.",
  },
  {
    name: "Blue Stitch Garments",
    role: "Factory Owner",
    review:
      "The production tracker improved communication between departments. A must-have system.",
  },
  {
    name: "Nova Apparel",
    role: "Operations Manager",
    review:
      "Accurate order tracking and clear reports help us take faster decisions.",
  },
  {
    name: "Elite Knitwear",
    role: "Quality Control Manager",
    review:
      "Tracking production status and quality checkpoints has never been this smooth.",
  },
];

const Review = () => {
  return (
    <div
      style={{
        padding: "70px 0",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#fff",
          marginBottom: "45px",
          fontSize: "32px",
        }}
      >
        Customer Reviews
      </h2>

      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={900}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: "18px",
                padding: "32px",
                color: "#fff",
                height: "100%",
                boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
              }}
            >
              <div style={{ fontSize: "42px", opacity: 0.3 }}>“</div>

              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "1.7",
                  marginBottom: "28px",
                }}
              >
                {item.review}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h4 style={{ margin: 0 }}>{item.name}</h4>
                  <small style={{ opacity: 0.8 }}>{item.role}</small>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Review;
