import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";



export const get_admin_orders = createAsyncThunk(
  'order/get_admin_orders',
  async ({ parPage, page, searchValue }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/order/admin/orders?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }

  }
)

export const get_admin_order = createAsyncThunk(
  'order/get_admin_order',
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/order/admin/orders/${orderId}`, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const admin_order_status_update = createAsyncThunk(
  'order/admin_order_status_update',
  async ({ orderId, info }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/order/admin/order-status/update/${orderId}`, info, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
export const get_sellet_orders = createAsyncThunk(
  'order/get_sellet_orders',
  async ({ parPage, page, searchValue, sellerId }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/order/seller/orders/${sellerId}?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }

  }
)
const orderReducer = createSlice({
  name: 'order',
  initialState: {
    errorMessage: '',
    successMessage: '',
    totalOrders: 0,
    order: {},
    myOrders: []
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = '';
      state.successMessage = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_admin_orders.fulfilled, (state, action) => {
        state.myOrders = action.payload?.orders;
        state.totalOrders = action.payload?.totalOrders
      })
      .addCase(get_admin_order.fulfilled, (state, action) => {
        state.order = action.payload?.order
      })

      .addCase(admin_order_status_update.fulfilled, (state, action) => {
        state.successMessage = action.payload?.message;
      })

      .addCase(get_sellet_orders.fulfilled, (state, action) => {
        state.myOrders = action.payload?.orders;
        state.totalOrders = action.payload?.totalOrders
      })
  }
});
export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;