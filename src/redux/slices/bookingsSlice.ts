/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { booksApi } from "../../api/api";
import { Room } from "./roomsSlice";

// Интерфейс бронирования
export interface Booking {
  id?: number;
  room: Room;
  date: string;       // "2025-05-10"
  startTime: string;  // "08:30"
  endTime: string;    // "10:00"
  name: string;
  phone: string;
  status: string;
  roomName?: string;
}

// Состояние
interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
  success: null
};

// GET
export const getBookings = createAsyncThunk<Booking[], void, { rejectValue: string }>(
  "bookings/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(booksApi);
      if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
      return await res.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// CREATE
export const createBooking = createAsyncThunk<Booking, Booking, { rejectValue: string }>(
  "bookings/create",
  async (newBooking, { rejectWithValue }) => {
    try {
      const res = await fetch(booksApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      });
      if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
      const data = await res.json();
      toast.success("Бронирование создано");
      return data;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// UPDATE
export const updateBooking = createAsyncThunk<
  Booking,
  { id: number; updatedData: Partial<Booking> },
  { rejectValue: string }
>(
  "bookings/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${booksApi}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
      const data = await res.json();
      toast.success("Бронирование обновлено");
      return data;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// DELETE
export const deleteBooking = createAsyncThunk<number, number, { rejectValue: string }>(
  "bookings/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${booksApi}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
      toast.success("Бронирование удалено");
      return id;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// SLICE
const bookingsSlice = createSlice({
  name: "bookingsSlice",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // GET
      .addCase(getBookings.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Ошибка при загрузке бронирований";
      })

      // CREATE
      .addCase(createBooking.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.loading = false;
        state.bookings.push(action.payload);
        state.success = "Бронирование создано";
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Ошибка при создании";
      })

      // UPDATE
      .addCase(updateBooking.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.loading = false;
        const index = state.bookings.findIndex(b => b.id === action.payload.id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
        state.success = "Бронирование обновлено";
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Ошибка при обновлении";
      })

      // DELETE
      .addCase(deleteBooking.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.bookings = state.bookings.filter(b => b.id !== action.payload);
        state.success = "Бронирование удалено";
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Ошибка при удалении";
      });
  }
});

export default bookingsSlice.reducer;
