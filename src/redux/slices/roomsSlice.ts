/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { roomsApi } from "../../api/api";
import { toast } from "react-toastify";

// Интерфейс комнаты
export interface Room {
  id?: number | string;
  img: string;
  name?: string | undefined;
  price: number;
  area: number;
  equipment: string;
  capacity: number;
}

// Интерфейс состояния
interface RoomsState {
  rooms: Room[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: RoomsState = {
  rooms: [],
  loading: false,
  error: null,
  success: null
};

// GET
export const getRooms = createAsyncThunk<Room[], void, { rejectValue: string }>(
  "getRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(roomsApi);
      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// CREATE
export const createRoom = createAsyncThunk<Room, Room, { rejectValue: string }>(
  "createRoom",
  async (newRoom, { rejectWithValue }) => {
    try {
      const response = await fetch(roomsApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoom),
      });
      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
      const data = await response.json();
      toast.success("Комната успешно добавлена");
      return data;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// UPDATE
export const updateRoom = createAsyncThunk<
  Room,
  { id: number; updatedData: Partial<Room> },
  { rejectValue: string }
>(
  "updateRoom",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${roomsApi}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
      const data = await response.json();
      toast.success("Комната успешно обновлена");
      return data;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// DELETE
export const deleteRoom = createAsyncThunk<number, number, { rejectValue: string }>(
  "deleteRoom",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${roomsApi}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
      toast.success("Комната успешно удалена");
      return id;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Слайс
const roomsSlice = createSlice({
  name: "roomsSlice",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // GET
      .addCase(getRooms.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Ошибка при получении комнат";
      })

      // CREATE
      .addCase(createRoom.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.loading = false;
        state.rooms.push(action.payload);
        state.success = "Комната успешно добавлена";
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Ошибка при добавлении комнаты";
      })

      // UPDATE
      .addCase(updateRoom.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.loading = false;
        const index = state.rooms.findIndex(room => room.id === action.payload.id);
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
        state.success = "Комната успешно обновлена";
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Ошибка при обновлении комнаты";
      })

      // DELETE
      .addCase(deleteRoom.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.rooms = state.rooms.filter(room => room.id !== action.payload);
        state.success = "Комната успешно удалена";
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Ошибка при удалении комнаты";
      });
  }
});

export default roomsSlice.reducer;
