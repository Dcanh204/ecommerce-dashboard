import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from './../../api/api';
import { jwtDecode } from 'jwt-decode';
export const admin_login = createAsyncThunk(
  'auth/admin_login',
  async (info, { rejectWithValue }) => {
    try {
      const { data } = await api.post('auth/admin-login', info, { withCredentials: true })
      localStorage.setItem('accessToken', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const seller_login = createAsyncThunk(
  'auth/seller_login',
  async (info, { rejectWithValue }) => {
    try {
      const { data } = await api.post('auth/seller-login', info, { withCredentials: true })
      localStorage.setItem('accessToken', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const seller_register = createAsyncThunk(
  'auth/seller_register',
  async (info, { rejectWithValue }) => {
    try {
      const { data } = await api.post('auth/seller-register', info, { withCredentials: true })
      localStorage.setItem('accessToken', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const get_me = createAsyncThunk(
  'auth/get_me',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('auth/get-me', { withCredentials: true })
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

const returnRole = (token) => {
  try {
    if (!token) return '';
    const decodedToken = jwtDecode(token);
    const expireTime = new Date(decodedToken.exp * 1000);
    if (new Date() > expireTime) {
      localStorage.removeItem('accessToken');
      return null;
    }
    return decodedToken.role || '';
  } catch {
    localStorage.removeItem('accessToken');
    return null;
  }

}

export const profile_image_upload = createAsyncThunk(
  'auth/profile_image_upload',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/profile-image-upload', formData, { withCredentials: true });
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loading: false,
    loadingProfile: false,
    userInfo: '',
    role: returnRole(localStorage.getItem('accessToken')),
    token: localStorage.getItem('accessToken')
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = '';
      state.successMessage = ''
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(admin_login.pending, (state) => {
        state.loading = true;
      })
      .addCase(admin_login.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.token = action.payload.token;
        state.role = returnRole(action.payload.token);
      })
      .addCase(admin_login.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })

      .addCase(seller_register.pending, (state) => {
        state.loading = true;
      })
      .addCase(seller_register.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.token = action.payload.token;
        state.role = returnRole(action.payload.token);
      })
      .addCase(seller_register.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })

      .addCase(seller_login.pending, (state) => {
        state.loading = true;
      })
      .addCase(seller_login.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.token = action.payload.token;
        state.role = returnRole(action.payload.token);
      })
      .addCase(seller_login.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })

      .addCase(get_me.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_me.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.userInfo;
      })
      .addCase(get_me.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload?.message;
      })

      .addCase(profile_image_upload.pending, (state) => {
        state.loadingProfile = true;
      })
      .addCase(profile_image_upload.fulfilled, (state, action) => {
        state.loadingProfile = false;
        state.successMessage = action.payload?.message;
        state.userInfo = action.payload?.userInfo;
      })
      .addCase(profile_image_upload.rejected, (state, action) => {
        state.loadingProfile = false;
        state.errorMessage = action.payload?.message;
      })

  }
})

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;