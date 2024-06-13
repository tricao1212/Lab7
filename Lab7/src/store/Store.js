import {configureStore, createSlice} from '@reduxjs/toolkit';
const userSlice = createSlice({
  name: 'UserInfo',
  initialState: {user: null},
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: state => {
      state.user = null;
    },
  },
});

export const {setUser, removeUser} = userSlice.actions;

const store = configureStore({
  reducer: {
    UserInfo: userSlice.reducer,
  },
});

export default store;
