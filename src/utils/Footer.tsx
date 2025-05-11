import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pb-10 pt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* MRBS Information */}
          <div className="mb-6 md:mb-0 md:w-1/2">
            <Link to="/" className="text-xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
                MRBS
              </span>
            </Link>
            <p className="mt-4 mr-12">
              Система бронирования конференц-залов — это ваша платформа для бронирования профессиональных пространств в коворкинг-средах. Мы стремимся предложить бесперебойный и эффективный процесс бронирования, гарантируя, что ваши встречи будут проходить в идеальной обстановке каждый раз.
            </p>
          </div>
          {/* Contact Information */}
          <div className="mb-6 md:mb-0 md:w-1/3">
            <h4 className="text-xl font-bold mb-4">Контактная информация</h4>
            <p>Улица Максима Горького, 1/2</p>
            <p>Бишкек, Кыргызстан.</p>
            <p>Email: mavlynov808@gmail.com</p>
            <p>Phone: (+996) 550 789 907</p>
          </div>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0 md:w-1/3">
            <h4 className="text-xl font-bold mb-4">Быстрые ссылки</h4>
            <ul>
              <li className="mb-2">
                <Link to="/privacy-policy" className="hover:text-gray-400">
                  Политика конфиденциальности
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about-us" className="hover:text-gray-400">
                  О нас
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/meeting-rooms" className="hover:text-gray-400">
                  Конференц-залы
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact-us" className="hover:text-gray-400">
                  Связаться с нами
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="mb-6 md:mb-0 md:w-1/3">
            <h4 className="text-xl font-bold mb-4">Подписывайтесь на нас</h4>
            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href={`https://wa.me/+996550789907?text=${encodeURIComponent("Здравствуйте, я хочу забронировать конференц-зал.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <p>&copy; {new Date().getFullYear()} MRBS. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
