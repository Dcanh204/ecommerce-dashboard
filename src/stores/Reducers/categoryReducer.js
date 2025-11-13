import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";


export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/categories', formData, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const getCategory = createAsyncThunk(
  'category/getCategory',
  async ({ parPage, page, searchValue }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/categories?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/categories/${id}`, formData, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/categories/${id}`, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }

  }
)

const categoryReducer = createSlice({
  name: 'category',
  initialState: {
    errorMessage: '',
    successMessage: '',
    loading: false,
    categories: [],
    totalCategories: 0
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = '';
      state.successMessage = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })

      .addCase(getCategory.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.totalCategories = action.payload.totalCategories;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false
        state.successMessage = action.payload.message;
        const updated = action.payload.category;
        const index = state.categories.findIndex(cat => cat._id === updated._id);
        if (index !== -1) {
          state.categories[index] = updated
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.payload.message;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.categories = state.categories.filter(cat => cat._id !== action.payload.id);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload?.message;
      })
  }
});
export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;