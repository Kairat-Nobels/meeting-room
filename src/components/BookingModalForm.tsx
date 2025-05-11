/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Schema,
  SelectPicker,
  DatePicker,
} from "rsuite";
import { calculatePrice } from "./utils/calculator";
import { Booking, updateBooking } from "../redux/slices/bookingsSlice";
import { useAppDispatch } from "../hooks/hooks";

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Укажите имя"),
  phone: StringType().isRequired("Укажите телефон"),
  date: StringType().isRequired("Укажите дату"),
  startTime: StringType().isRequired("Укажите начало"),
  endTime: StringType().isRequired("Укажите окончание"),
  status: StringType().isRequired("Укажите статус"),
});

const statusOptions = [
  { label: "Забронировано", value: "забронировано" },
  { label: "Оплачено", value: "оплачено" },
];

// Генерация списка времени с шагом в 30 минут (07:00 — 22:00)
const generateTimeOptions = () => {
  const times = [];
  let hour = 7;
  let minute = 0;

  while (hour < 22 || (hour === 22 && minute === 0)) {
    const timeStr = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
    times.push({ label: timeStr, value: timeStr });

    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }

  return times;
};

const timeOptions = generateTimeOptions();

// interface Booking {
//   id?: number;
//   name: string;
//   phone: string;
//   date: string;
//   startTime: string;
//   endTime: string;
//   status: string;
//   roomName: string;
//   room: Room;
//   amount: number;
// }

interface Props {
  open: boolean;
  onClose: () => void;
  bookData: Booking | null;
  allBookings: Booking[];
}

const BookingModalForm: React.FC<Props> = ({
  open,
  onClose,
  bookData,
  allBookings,
}) => {
  const formRef = useRef<any>(null);
  const [formValue, setFormValue] = useState<Partial<Booking>>({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (bookData) {
      setFormValue({
        name: bookData.name,
        phone: bookData.phone,
        date: bookData.date,
        startTime: bookData.startTime,
        endTime: bookData.endTime,
        status: bookData.status,
      });
    } else {
      setFormValue({});
    }
  }, [bookData]);


  const isTimeSlotTaken = (): boolean => {
    if (!formValue.date || !formValue.startTime || !formValue.endTime)
      return false;

    return allBookings.some((booking) => {
      if (
        booking.id === bookData?.id ||
        booking.date !== formValue.date ||
        booking.roomName !== bookData?.roomName
      ) {
        return false;
      }

      const [startA, endA] = [booking.startTime, booking.endTime];
      const [startB, endB] = [formValue.startTime!, formValue.endTime!];

      return !(endB <= startA || startB >= endA);
    });
  };
  const totalPrice = calculatePrice(bookData?.room?.price, formValue?.startTime, formValue?.endTime);

  const handleSubmit = () => {
    if (!formRef.current.check()) return;

    if (isTimeSlotTaken()) {
      alert("Это время уже занято в выбранном зале.");
      return;
    }

    const payload = { ...bookData, ...formValue, amount: totalPrice };
    dispatch(updateBooking({ id: Number(bookData?.id), updatedData: payload }));
    onClose();
  };

  const filterAvailableTimes = (type: "start" | "end") => {
    if (!formValue.date || !bookData) return timeOptions;

    const selectedDate = new Date(formValue.date);
    const today = new Date();
    const isToday =
      selectedDate.toDateString() === today.toDateString();

    const bookingsForRoom = allBookings.filter(
      (b: any) =>
        b.id !== bookData.id &&
        b.roomName === bookData?.roomName &&
        b.date === formValue.date
    );

    return timeOptions.filter(({ value }) => {
      // 1. Блокируем прошлое время, если это сегодня
      if (isToday) {
        const [h, m] = value.split(":").map(Number);
        const timeDate = new Date();
        timeDate.setHours(h, m, 0, 0);
        if (timeDate <= new Date()) return false;
      }

      // 2. Блокируем если время попадает в чужие брони
      const conflicts = bookingsForRoom.some((b) => {
        if (type === "start") return value >= b.startTime && value < b.endTime;
        if (type === "end") return value > b.startTime && value <= b.endTime;
        return false;
      });

      return !conflicts;
    });
  };

  const withSelectedValue = (data: any, selectedValue: any) => {
    if (!selectedValue) return data;
    const exists = data.some((item: any) => item.value === selectedValue);
    return exists ? data : [...data, { value: selectedValue, label: selectedValue }];
  };
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <Modal.Header>
        <Modal.Title>Редактировать бронь</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bookData?.room?.img && (
          <img
            src={bookData.room.img}
            alt="room"
            style={{ width: "100%", borderRadius: 8, marginBottom: 10 }}
          />
        )}
        <div style={{ fontWeight: "bold", marginBottom: 10 }}>
          Зал: {bookData?.roomName}
        </div>

        <Form
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={setFormValue}
          fluid
        >
          <Form.Group>
            <Form.ControlLabel>Имя</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Телефон</Form.ControlLabel>
            <Form.Control name="phone" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Дата</Form.ControlLabel>
            <Form.Control
              name="date"
              accepter={DatePicker}
              value={formValue.date ? new Date(formValue.date) : null}
              onChange={(date) => {
                setFormValue((prev) => ({
                  ...prev,
                  date: date?.toISOString().split("T")[0] || "",
                }));
              }}
              oneTap
              format="yyyy-MM-dd"
              shouldDisableDate={(date) =>
                date < new Date(new Date().toDateString())
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Время начала</Form.ControlLabel>
            <Form.Control
              name="startTime"
              accepter={SelectPicker}
              data={withSelectedValue(filterAvailableTimes("start"), formValue.startTime)}
              value={formValue.startTime || null}
              onChange={(value) =>
                setFormValue((prev) => ({ ...prev, startTime: value }))
              }
              cleanable={false}
              searchable={false}
              placeholder="Выберите время"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Время окончания</Form.ControlLabel>
            <Form.Control
              name="endTime"
              accepter={SelectPicker}
              data={withSelectedValue(filterAvailableTimes("end"), formValue.endTime)}
              value={formValue?.endTime || null}
              onChange={(value) =>
                setFormValue((prev) => ({ ...prev, endTime: value }))
              }
              cleanable={false}
              searchable={false}
              placeholder="Выберите время"
            />
          </Form.Group>
          {totalPrice > 0 && <h4 className="text-lg text-center">Стоимость: {totalPrice} сом</h4>}
          <Form.Group>
            <Form.ControlLabel>Статус</Form.ControlLabel>
            <Form.Control
              name="status"
              accepter={SelectPicker}
              data={statusOptions}
              value={formValue.status || null}
              onChange={(value) =>
                setFormValue((prev) => ({ ...prev, status: value }))
              }
              cleanable={false}
              searchable={false}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="primary" onClick={handleSubmit}>
          Сохранить изменения
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModalForm;
