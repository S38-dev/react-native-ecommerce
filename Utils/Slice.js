
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Login, loadMore,searchProduct } from '../Api/ApiCalls';
import { getItem, removeItem, setItem } from '../Utils/AsyncStorage';

export const loadToken = createAsyncThunk('auth/loadToken', async () => {
  const token = await getItem('userToken');
  return token || null;
});


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data) => {
    await Login(data.email, data.password)
    // await setItem('userToken', token);
    // return token;
  }
);

export const loadMoreProduct = createAsyncThunk(
  'auth/loadMoreProduct',
  async ({ limit, off }, { rejectWithValue }) => {
    try {
      const products = await loadMore(limit, off);
      return products;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const Search= createAsyncThunk(
  'auth/Search',
  async ({ input }, { rejectWithValue }) => {
    try {
      const products = await searchProduct(input);
      return products;
    } catch (err) {
      return rejectWithValue(err.message);
    }
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
  products: [], 
  searchProduct:[]  ,
  
  loadingMore: false,
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
      })
      .addCase(loadMoreProduct.pending, (state) => {
        state.loadingMore = true; 
      })
      .addCase(loadMoreProduct.fulfilled, (state, action) => {
        console.log('product')
        state.loadingMore = false;
        
        state.products = [...state.products, ...action.payload];
      })
      .addCase(loadMoreProduct.rejected, (state, action) => {
        console.log('loadMoreProduct rejected:', action.payload, action.error);
        state.loadingMore = false;
        state.error = action.payload; 
      })

       .addCase(Search.pending, (state) => {
        state.loadingMore = true; 
      })
      .addCase(Search.fulfilled, (state, action) => {
        console.log('product')
        state.loadingMore = false;
        
        state.searchProduct = [...state.products, ...action.payload];
      })
      .addCase(Search.rejected, (state, action) => {
        console.log('loadMoreProduct rejected:', action.payload, action.error);
        state.loadingMore = false;
        state.error = action.payload; 
      });

  },
});

export const { toggleTheme } = authSlice.actions;
export default authSlice.reducer;