import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // ? user state is saved here.
  docs: [], // ? user documents are saved here
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    addDocs: (state, action) => {
      state.docs = [action.payload, ...state.docs];
    },
    setDocs: (state, action) => {
      state.docs = action.payload;
    },
  },
});

// ? methods for manipulating user and docs state.
export const { addUser, addDocs, setDocs } = userSlice.actions;

export default userSlice.reducer;
