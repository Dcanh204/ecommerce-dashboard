import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async ({ page, searchValue, parpage }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products?page=${page}&searchValue=${searchValue}&parpage=${parpage}`, { withCredentials: true })
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/products', productData, { withCredentials: true });
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }

  }
)

const productReducer = createSlice({
  name: 'product',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loading: false,
    products: [],
    totalProduct: 0,
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = '';
      state.successMessage = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message;
        state.products = [...state.products, action.payload?.product];
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload?.message;
      })
  }
})
export const { messageClear } = productReducer.actions;
export default productReducer.reducer;