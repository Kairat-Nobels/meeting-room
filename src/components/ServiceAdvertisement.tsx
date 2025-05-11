import {
  FaClock,
  FaCheckCircle,
  FaCalendarAlt,
  FaHeadset,
} from "react-icons/fa";

const ServiceAdvertisement = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Почему стоит выбрать наши услуги?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaClock className="text-green-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">
              Доступность в реальном времени
            </h3>
            <p className="text-gray-600">
              Просматривайте доступные номера в режиме реального времени, чтобы иметь возможность забронировать их именно тогда, когда вам это нужно.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaCheckCircle className="text-green-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">
              Мгновенное подтверждение бронирования
            </h3>
            <p className="text-gray-600">
              Получите немедленное подтверждение вашего бронирования, и вся информация будет у вас под рукой.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaCalendarAlt className="text-green-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Гибкий график</h3>
            <p className="text-gray-600">
              Легко управляйте временем бронирования с помощью наших гибких возможностей планирования, адаптированных под ваши потребности.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaHeadset className="text-green-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Круглосуточная поддержка</h3>
            <p className="text-gray-600">
              Наша команда готова помочь вам в любое время суток и решить любые вопросы или проблемы.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAdvertisement;
