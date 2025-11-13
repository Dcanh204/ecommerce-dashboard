import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async ({ page, searchValue, parPage }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, { withCredentials: true })
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
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }

  }
)

export const getProductById = createAsyncThunk(
  'product/getProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/${productId}`, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)


export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (product, { rejectWithValue }) => {
    const { id, ...productData } = product;
    console.log(id);
    console.log(productData)
    try {
      const { data } = await api.put(`/products/${id}`, productData, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateImage = createAsyncThunk(
  'product/updateImage',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/products/updateImage/${id}`, formData, { withCredentials: true });
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
    product: {},
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

      .addCase(getProduct.fulfilled, (state, action) => {
        state.products = action.payload?.products;
        state.totalProduct = action.payload?.totalProduct
      })

      .addCase(getProductById.fulfilled, (state, action) => {
        state.product = action.payload?.product;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message;
        state.product = action.payload?.product;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload?.message;
      })
      // update change image
      .addCase(updateImage.pending, (state) => {
        state.loading = true
      })

      .addCase(updateImage.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message;
        state.product = action.payload?.product;
      })
      .addCase(updateImage.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload?.message;
      })
  }
})
export const { messageClear } = productReducer.actions;
export default productReducer.reducer;