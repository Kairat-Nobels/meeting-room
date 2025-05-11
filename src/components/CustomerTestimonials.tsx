/* eslint-disable @typescript-eslint/no-explicit-any */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image from '../assets/images/userIcon.png';
import { useSelector } from "react-redux";
import { Review } from "../redux/slices/reviewsSlice";

const CustomerTestimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const { reviews } = useSelector((state: any) => state.reviewsReducer);

  return (
    <section className="py-16 bg-gray-100 rounded-xl">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Что говорят наши клиенты</h2>
        <Slider {...settings}>
          {reviews.map((testimonial: Review) => (
            <div
              key={testimonial.id}
              className="p-6 bg-white rounded-lg shadow-md"
            >
              <img
                src={image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full border-pink-500 border-4 mx-auto mb-4"
              />
              <p className="text-gray-700 italic mb-4">
                "{testimonial.comment}"
              </p>
              <h3 className="text-xl font-semibold">{testimonial.name}</h3>
              <p className="text-gray-500">{testimonial.phone}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
