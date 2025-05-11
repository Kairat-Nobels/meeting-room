/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { useDebounce } from "../hooks/useDebounce";
import { useSelector } from "react-redux";
import { Room } from "../redux/slices/roomsSlice";

// URL to fetch Lottie animation JSON data
const LOTTIE_URL =
  "https://lottie.host/0fea4ce6-8b86-47f0-89dd-fabfdeda9fbc/P8PHWLK1QD.json";

const MeetingRoomsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCapacity, setFilterCapacity] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [animationData, setAnimationData] = useState(null);
  const { rooms, isLoading, error } = useSelector((state: any) => state.roomsReducer);

  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const response = await fetch(LOTTIE_URL);
        const data = await response.json();
        setAnimationData(data);
      } catch (err) {
        console.error("Failed to load Lottie animation data:", err);
      }
    };

    fetchAnimationData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCapacityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCapacity(Number(e.target.value));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "asc" | "desc");
  };

  const filteredRooms = rooms?.filter((room: Room) =>
    room?.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  )
    .filter((room: Room) =>
      filterCapacity ? room.capacity >= filterCapacity : true
    )
    .sort((a: Room, b: Room) =>
      sortOrder === "asc"
        ? a.price - b.price
        : b.price - a.price
    );

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        {animationData && (
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ width: 200, height: 200 }}
          />
        )}
      </div>
    );

  return (
    <section className="py-12 bg-pink-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Конференц-залы</h2>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/2"
          />
          <div className="md:mx-24 grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4 mt-4">
            <select
              onChange={handleCapacityChange}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Фильтр по количеству людей</option>
              <option value="10">10+ человек</option>
              <option value="20">20+ человек</option>
              <option value="30">30+ человек</option>
            </select>
            <select
              onChange={handleSortChange}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="asc">Сортировать по цене: по возрастанию</option>
              <option value="desc">Сортировать по цене: по убыванию</option>
            </select>
          </div>
          <button
            onClick={() => {
              setSearchTerm("");
              setFilterCapacity(null);
              setSortOrder("asc");
            }}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
          >
            Очистить фильтры
          </button>
        </div>
        {filteredRooms?.length === 0 && <p>Нету конференц-залов</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms?.map((room: Room) => (
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
      </div>
      {error && (
        <p className="font-bold text-center my-5">Что-то пошло не так!</p>
      )}
    </section>
  );
};

export default MeetingRoomsPage;
