import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/userType";

const initialState: User = {
  username: "",
  avatar: "",
  email:""
};

const userSlice = createSlice({
  name:'User',
  initialState: initialState,
  reducers:{
    updateUsername(state,action){
      state.username = action.payload;
    },
    updateAvatar(state, action){
      state.avatar = action.payload;
    },
    updateEmail(state, action){
      state.email = action.payload;
    }
  }

})

export const {updateUsername, updateAvatar, updateEmail} = userSlice.actions;
const userReducer = userSlice.reducer

export default userReducer;