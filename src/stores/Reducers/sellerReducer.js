
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const get_seller_request = createAsyncThunk(
  'seller/get_seller_request',
  async ({ status, page, searchValue, parPage }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/sellers?page=${page}&searchValue=${searchValue}&parPage=${parPage}&status=${status}`, { withCredentials: true });
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
export const getSellerById = createAsyncThunk(
  'seller/getSellerById',
  async (sellerId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/sellers/${sellerId}`, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const updateStatus = createAsyncThunk(
  'seller/updateStatus',
  async ({ sellerId, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/sellers/${sellerId}`, { status }, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
export const create_stripe_connect_account = createAsyncThunk(
  'seller/create_stripe_connect_account',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/payment/create-stripe-connect-account`, { withCredentials: true })
      window.location.href = data.url;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const active_stripe_connect_account = createAsyncThunk(
  'seller/active_stripe_connect_account',
  async (activeCode, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/payment/active-stripe-connect-account/${activeCode}`, {}, { withCredentials: true })
      return data
    } catch (error) {
      // console.log(error.response.data) 
      return rejectWithValue(error.response.data)
    }
  }
)

const sellerReducer = createSlice({
  name: 'seller',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loading: false,
    sellers: [],
    seller: {},
    totalSellers: 0,
    loader: false
  },
  reducers: {
    messageClear: (state) => {
      state.successMessage = '';
      state.errorMessage = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_seller_request.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_seller_request.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload?.sellers;
        state.totalSellers = action.payload?.totalSellers;
      })
      .addCase(get_seller_request.rejected, (state) => {
        state.loading = false;
      })

      .addCase(getSellerById.fulfilled, (state, action) => {
        state.seller = action.payload?.seller;
      })
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatus.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message;
        state.seller = action.payload?.seller;
      })
      .addCase(create_stripe_connect_account.pending, (state) => {
        state.loader = true;
      })
      .addCase(create_stripe_connect_account.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.message;
      })
      .addCase(create_stripe_connect_account.fulfilled, (state) => {
        state.loader = false;
      })

      .addCase(active_stripe_connect_account.pending, (state) => {
        state.loader = true;
      })
      .addCase(active_stripe_connect_account.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.message;
      })
      .addCase(active_stripe_connect_account.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload?.message;
      })
  }
})
export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;