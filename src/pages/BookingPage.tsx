/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createBooking } from "../redux/slices/bookingsSlice";
import PaymentModal from "../components/PaymentModal";
import { calculatePrice } from "../components/utils/calculator";
import { useAppDispatch } from "../hooks/hooks";

const BookingPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { rooms, isLoading, error } = useSelector((state: any) => state.roomsReducer);
  const room = rooms?.find((room: any) => Number(room.id) === Number(id));
  const { bookings } = useSelector((state: any) => state.bookingsReducer);
  const filteredBookings = bookings.filter((booking: any) => Number(booking.room.id) === Number(id));
  const totalPrice = calculatePrice(room?.price, startTime, endTime);

  const handleSubmit = () => {
    if (!selectedDate || !startTime || !endTime || !name || !phone) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    if (startTime >= endTime) {
      alert("Время окончания должно быть позже времени начала.");
      return;
    }

    const bookingData = {
      room: room,
      roomName: room?.name || "",
      date: selectedDate.toISOString().split("T")[0],
      startTime: startTime.toTimeString().slice(0, 5),
      endTime: endTime.toTimeString().slice(0, 5),
      name,
      phone,
      status: "забронировано",
      amount: totalPrice,
    };
    dispatch(createBooking(bookingData));
    setIsModalOpen(true);
    setName("");
    setPhone("");
    setSelectedDate(null);
    setStartTime(null);
    setEndTime(null);
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value;
    input = input.replace(/\D/g, '');
    if (!/^(2\d{2}|5\d{2}|7\d{2}|9\d{2})\d{6}$/.test(input)) {
      setIsValid(false);
      setPhone(input);
      return;
    }
    input = input.replace(/^(\d{3})(\d{3})(\d{3})$/, '($1)-$2-$3');
    setIsValid(/^\(\d{3}\)-\d{3}-\d{3}$/.test(input));
    setPhone(input);
  };

  const today = new Date();
  const isToday = selectedDate
    ? selectedDate.toDateString() === today.toDateString()
    : false;

  const getMinSelectableTime = () => {
    if (isToday) {
      const current = new Date();
      const rounded = new Date(current);
      rounded.setMinutes(current.getMinutes() < 30 ? 30 : 0);
      rounded.setHours(current.getMinutes() < 30 ? current.getHours() : current.getHours() + 1);
      rounded.setSeconds(0);
      rounded.setMilliseconds(0);

      if (rounded.getHours() < 7) {
        rounded.setHours(7);
        rounded.setMinutes(0);
      }

      return rounded;
    }
    const start = new Date();
    start.setHours(7, 0, 0, 0);
    return start;
  };

  const getMaxSelectableTime = () => {
    const end = new Date();
    end.setHours(22, 0, 0, 0);
    return end;
  };

  const getDisabledTimes = (): Date[] => {
    if (!selectedDate) return [];

    const disabledTimes: Date[] = [];

    filteredBookings.forEach((booking: any) => {
      const bookingDate = new Date(booking.date);
      if (bookingDate.toDateString() !== selectedDate.toDateString()) return;

      const start = new Date(`${booking.date}T${booking.startTime}`);
      const end = new Date(`${booking.date}T${booking.endTime}`);

      for (let time = new Date(start); time <= end; time.setMinutes(time.getMinutes() + 30)) {
        disabledTimes.push(new Date(time));
      }
    });

    return disabledTimes;
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Бронирование</h1>

      {isLoading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p className="text-red-500">Ошибка: {error}</p>
      ) : (
        <>
          <h2 className="text-2xl text-center font-semibold mb-6">Зал: {room?.name}</h2>

          <div className="mb-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Выберите дату:</h2>
            <Calendar
              className="border rounded px-3 py-2 w-full h-[320px]"
              minDate={today}
              onChange={(value) => {
                if (value instanceof Date) {
                  setSelectedDate(value);
                  setStartTime(null);
                  setEndTime(null);
                }
              }}
              value={selectedDate}
            />
          </div>

          {selectedDate && (
            <div className="space-y-4 mt-6">
              <div className="flex gap-2 justify-between">
                <div>
                  <label className="block font-medium text-md">Время от:</label>
                  <DatePicker
                    selected={startTime}
                    onChange={(date) => setStartTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    minTime={getMinSelectableTime()}
                    maxTime={getMaxSelectableTime()}
                    excludeTimes={getDisabledTimes()}
                    required
                    timeCaption="Время"
                    timeFormat="HH:mm"
                    dateFormat="HH:mm"
                    placeholderText="Выберите время"
                    className="text-md border rounded px-3 py-2 w-full"
                  />

                </div>

                <div>
                  <label className="block font-medium text-md">Время до:</label>
                  <DatePicker
                    selected={endTime}
                    onChange={(date) => setEndTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    disabled={startTime === null}
                    minTime={startTime || getMinSelectableTime()}
                    maxTime={getMaxSelectableTime()}
                    excludeTimes={getDisabledTimes()}
                    timeCaption="Время"
                    required
                    timeFormat="HH:mm"
                    dateFormat="HH:mm"
                    placeholderText="Выберите время"
                    className="text-md border rounded px-3 py-2 w-full"
                  />
                </div>

              </div>
              <div>
                <label className="block font-medium text-lg">Ваше имя:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded px-3 py-2 w-full text-lg"
                  placeholder="Введите имя"
                  required
                />
              </div>

              <div>
                <label className="block font-medium">Телефон:</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneNumberChange}
                  className="border rounded px-3 py-2 w-full text-lg"
                  placeholder="Введите номер"
                  required
                />
                {!isValid && phone.length > 0 && <p className='errorNum'>Неверный номер телефона</p>
                }
              </div>
              {totalPrice > 0 && <h4 className="text-lg text-center">Стоимость: {totalPrice} сом</h4>}
              <button
                type="submit"
                disabled={!selectedDate || !startTime || !endTime || !name || !phone}
                onClick={handleSubmit}
                className="mt-4 w-full bg-green-500 text-white px-6 py-4 rounded-[6px] text-lg hover:bg-green-600 transition-colors duration-300 disabled:opacity-50"
              >
                Перейти к оплате
              </button>
            </div>
          )}
        </>
      )}
      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default BookingPage;
