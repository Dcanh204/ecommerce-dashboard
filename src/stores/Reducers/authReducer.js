import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from './../../api/api';

export const admin_login = createAsyncThunk(
  'auth/admin_login',
  async (info, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/admin-login', info, { withCredentials: true })
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
)

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loading: false,
    userInfo: ''
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = ''
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(admin_login.pending, (state) => {
        state.loading = true;
      })
      .addCase(admin_login.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message
      })
      .addCase(admin_login.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
  }
})

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;