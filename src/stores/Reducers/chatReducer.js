import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from '../../api/api';

export const get_customers = createAsyncThunk(
  'chat/get_customers',
  async (sellerId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/chat/seller/get-customers/${sellerId}`, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const get_customer_messages = createAsyncThunk(
  'chat/get_customer_messages',
  async (customerId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/chat/seller/get_customer_messages/${customerId}`, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

const chatReducer = createSlice({
  name: 'chat',
  initialState: {
    customers: [],
    messages: [],
    activeCustomer: [],
    activeSeller: [],
    activeAdmin: "",
    friends: [],
    seller_admin_message: [],
    currentSeller: {},
    currentCustomer: {},
    sellers: [],
    successMessage: '',
    errorMessage: '',
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = '';
      state.successMessage = ''
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(get_customers.fulfilled, (state, action) => {
        state.customers = action.payload.customers;
      })
      .addCase(get_customer_messages.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
        state.currentCustomer = action.payload.currentCustomer;
      })
    // .addCase(admin_login.rejected, (state, action) => {
    //   state.loading = false;
    //   state.errorMessage = action.payload.message;
    // })

  }
})

export const { messageClear } = chatReducer.actions;
export default chatReducer.reducer;