import CustomerTestimonials from "../components/CustomerTestimonials";
import FeaturedRooms from "../components/FeaturedRooms";
import { Hero } from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import ServiceAdvertisement from "../components/ServiceAdvertisement";
import WhyChooseUs from "../components/WhyChooseUs";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ServiceAdvertisement />
      <FeaturedRooms />
      <WhyChooseUs />
      <HowItWorks />
      <CustomerTestimonials />
    </div>
  );
};

export default HomePage;
