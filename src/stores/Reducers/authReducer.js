import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const admin_login = createAsyncThunk(
  'auth/admin_login',
  async (info) => {
    try {
      console.log(info);
      // const { data } = await api.post('/admin-login', info, { withCredentials: true })
      // console.log(data);
    } catch (error) {
      console.log('error', error)
    }
  }
)

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    userInfo: ''
  },
  reducers: {

  },

  extraReducers: () => {

  }
})

export default authReducer.reducer;