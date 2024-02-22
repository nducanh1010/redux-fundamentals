import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IUser {
  id: number;
  name: string;
  email: string;
}
export const fetchListUsers = createAsyncThunk(
  "users/fetchListUsers",
  async () => {
    try {
      const res = await fetch("    http://localhost:8000/users");
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }
);
export const createNewUser = createAsyncThunk(
  "user/createNewUser",
  async (payload: Omit<IUser, "id">, thunkAPI) => {
    try {
      const res = await fetch(" http://localhost:8000/users", {
        method: "POST",
        body: JSON.stringify({ ...payload }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      if (data && data.id) {
        thunkAPI.dispatch(fetchListUsers());
      }
    } catch (error) {}
  }
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload: IUser, thunkAPI) => {
    try {
      const res = await fetch(` http://localhost:8000/users/${payload.id}`, {
        method: "PUT",
        body: JSON.stringify({ name: payload.name, email: payload.email }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      console.log(data);
      if (data && data.id) {
        thunkAPI.dispatch(fetchListUsers());
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (payload: Pick<IUser, "id">, thunkAPI) => {
    try {
      const res = await fetch(` http://localhost:8000/users/${payload.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();

      thunkAPI.dispatch(fetchListUsers());
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
const initialState: {
  listUser: IUser[];
  isCreateSuccess: boolean;
  isUpdateUser: boolean;
  isDeleteUser: boolean;
} = {
  listUser: [],
  isCreateSuccess: false,
  isUpdateUser: false,
  isDeleteUser: false
};
export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCreate(state) {
      state.isCreateSuccess = false;
      state.isUpdateUser = false;
    },
    resetDelete(state) {
      state.isDeleteUser = false;
    }
  },
  extraReducers(builder) {
    //
    builder
      .addCase(fetchListUsers.fulfilled, (state, action) => {
        state.listUser = action.payload;
      })
      .addCase(createNewUser.fulfilled, (state) => {
        state.isCreateSuccess = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.isUpdateUser = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isUpdateUser = true;
      });
    // Giongs actions vuex
    // Add reducer for additional action types
  }
});

// Action creators are generated for each case reducer function
// eslint-disable-next-line react-refresh/only-export-components
export const { resetCreate, resetDelete } = UserSlice.actions;
export default UserSlice.reducer;
