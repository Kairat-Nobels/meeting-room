/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import { Room } from "../redux/slices/roomsSlice";

const FeaturedRooms = () => {
  const { rooms, isLoading, error } = useSelector((state: any) => state.roomsReducer);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        {(
          <Lottie
            animationData={[]}
            loop
            autoplay
            style={{ width: 200, height: 200 }}
          />
        )}
      </div>
    );

  if (rooms?.data?.length === 0) return <p>No Rooms available right now!</p>;

  // Limit to 3 rooms
  const featuredRooms = rooms?.slice(0, 3);

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Избранные номера</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms?.map((room: Room) => (
            <div
              key={room.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={room.img}
                alt={room.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
              <p className="text-gray-600 mb-1">
                Вместимость: {room.capacity} человек
              </p>
              <p className="text-gray-600 mb-4">
                Цена: {room.price} сом за час
              </p>
              <Link
                to={`/rooms/${room.id}`}
                state={{ room }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
              >
                Подробнее
              </Link>
            </div>
          ))}
        </div>
        <Link
          to="/meeting-rooms"
          className="mt-8 inline-block bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Смотреть больше
        </Link>
      </div>
      {error && (
        <p className="font-bold text-center my-5">Что-то пошло не так!</p>
      )}
    </section>
  );
};

export default FeaturedRooms;
