
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Login } from '../Api/ApiCalls';
import { getItem, removeItem, setItem } from '../Utils/AsyncStorage';

export const loadToken = createAsyncThunk('auth/loadToken', async () => {
  const token = await getItem('userToken');
  return token || null;
});


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data) => {
    await Login(data.email,data.password)
    await setItem('userToken', token);
    return token;
  }
);


export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await removeItem('userToken');
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    status: 'idle',
    error: null,
     theme: 'light',
  },
  reducers: {
    toggleTheme: (state) => {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
}



  },
  extraReducers: (builder) => {
    builder

      .addCase(loadToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
      })
      .addCase(loadToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })


      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })


      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.status = 'idle';
      });
  },
});

export const { toggleTheme } = authSlice.actions;
export default authSlice.reducer;