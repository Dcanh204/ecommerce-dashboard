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
      const { data } = await api.get(`/chat/seller/get-customer-messages/${customerId}`, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const send_message = createAsyncThunk(
  'chat/send_message',
  async (info, { rejectWithValue }) => {
    console.log(info)
    try {
      const { data } = await api.post(`/chat/seller/send-message`, info, { withCredentials: true });
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
    },
    updateMessage: (state, action) => {
      state.messages = [...state.messages, action.payload]
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
      .addCase(send_message.fulfilled, (state, action) => {
        let tempFriends = state.customers
        let index = tempFriends.findIndex(f => f.fdId === action.payload.message.receiverId)
        while (index > 0) {
          let temp = tempFriends[index]
          tempFriends[index] = tempFriends[index - 1]
          tempFriends[index - 1] = temp
          index--
        }
        state.customers = tempFriends;
        state.messages = [...state.messages, action.payload.message];
        state.successMessage = 'Gửi tin nhắn thành công';
      })

  }
})

export const { messageClear, updateMessage } = chatReducer.actions;
export default chatReducer.reducer;