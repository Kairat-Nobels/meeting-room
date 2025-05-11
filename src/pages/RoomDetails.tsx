/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";

const LOTTIE_URL =
  "https://lottie.host/0fea4ce6-8b86-47f0-89dd-fabfdeda9fbc/P8PHWLK1QD.json";

const RoomDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { rooms, isLoading, error } = useSelector((state: any) => state.roomsReducer);
  const room = rooms?.find((room: any) => Number(room.id) === Number(id));
  const [animationData, setAnimationData] = useState(null);

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

  if (error)
    return (
      <div className="text-center py-12 text-red-500">
        Ошибка при загрузке данных: {error}
      </div>
    );

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-[90%] mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-[65%]">
              <img
                className="rounded-xl w-full shadow-lg"
                src={room?.img}
                alt={room?.name}
              />
            </div>
            <div className="w-full md:w-[35%]">
              <h1 className="text-4xl font-bold mb-4">{room?.name}</h1>
              <p className="text-gray-600 mb-2">
                <strong>Зал Номер:</strong> {room?.id}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Площадь:</strong> {room?.area}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Вместимость:</strong> {room?.capacity} человек
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Цена за час:</strong> ${room?.price} сом
              </p>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Оборудование:</h3>
                <ul className="list-disc list-inside pl-5">
                  {room?.equipment?.split(",")?.map((equipment: string) => equipment.trim())?.map(
                    (amenity: string, index: number) => (
                      <li key={index}>{amenity}</li>
                    )
                  )}
                </ul>
              </div>
              <Link
                to={`/book-room/${room?.id}`}
                state={{ room: room }}
              >
                <button className="bg-green-500 text-white px-6 py-3 rounded-[6px] hover:bg-green-600 transition-colors duration-300">
                  Забронировать
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
