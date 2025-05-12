import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "../redux/slices/reviewsSlice";
import { getRooms } from "../redux/slices/roomsSlice";
import { getBookings } from "../redux/slices/bookingsSlice";
import { useAppDispatch } from "../hooks/hooks";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getReviews())
    dispatch(getRooms())
    dispatch(getBookings())
  }, [])
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-100 text-black p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
            MRBS
          </span>
        </Link>
      </div>
      <div className="hidden md:flex space-x-4">
        <Link
          to="/"
          className="hover:text-green-500 active:text-purple-500 font-medium"
        >
          Главная
        </Link>
        <Link
          to="/meeting-rooms"
          className="hover:text-green-500 active:text-purple-500 font-medium"
        >
          Конференц-залы
        </Link>
        <Link
          to="/about-us"
          className="hover:text-green-500 active:text-purple-500 font-medium"
        >
          О нас
        </Link>
        <Link
          to="/contact-us"
          className="hover:text-green-500 active:text-purple-500 font-medium"
        >
          Связаться с нами
        </Link>
        <Link
          to="/login"
          className="hover:text-green-500 active:text-purple-500 font-medium"
        >
          Админ
        </Link>
      </div>
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-black hover:text-green-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden absolute top-16 right-0 bg-white shadow-md z-50">
          <div className="flex flex-col items-center space-y-4 p-4">
            <Link to="/" className="hover:text-green-500" onClick={toggleMenu}>
              Главная
            </Link>
            <Link
              to="/meeting-rooms"
              className="hover:text-green-500"
              onClick={toggleMenu}
            >
              Конференц-залы
            </Link>
            <Link
              to="/about-us"
              className="hover:text-green-500"
              onClick={toggleMenu}
            >
              О нас
            </Link>
            <Link
              to="/contact-us"
              className="hover:text-green-500"
              onClick={toggleMenu}
            >
              Связаться с нами
            </Link>
            <Link
              to="/login"
              className="hover:text-green-500"
              onClick={toggleMenu}
            >
              Админ
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
