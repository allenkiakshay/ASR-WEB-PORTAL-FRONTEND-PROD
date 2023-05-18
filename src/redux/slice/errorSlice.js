import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null, //? any error will be stored here.
  status: false, //? if error then status is true.
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    addError: (state, action) => {
      state.error = action.payload;
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

// ? methods for manipulating error state.
export const { addError, changeStatus } = errorSlice.actions;

export default errorSlice.reducer;
