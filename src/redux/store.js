import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import errorReducer from './slice/errorSlice';
const store = configureStore({
  reducer: {
    userState: userReducer,
    errorState: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;

/* 
? Redux Toolkit - https://redux-toolkit.js.org/introduction/getting-started 
*/
