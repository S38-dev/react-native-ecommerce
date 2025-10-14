import { configureStore } from '@reduxjs/toolkit';
import SliceReducer from './Slice';

const store = configureStore({
  reducer: {
    slice: SliceReducer,
  },
});

export default store;
