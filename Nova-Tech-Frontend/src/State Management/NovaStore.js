import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  users: null,
  logo:null
 
};

const NovaStoreSlice = createSlice({
  name: "NovaStore",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = action.payload
      console.log('from redux', state.users)

    },
    removeUser: (state, action) => {
      state.users = null
    },
    addLogo:(state,action)=>{
      state.logo=action.payload
    }
   
  }
});

export const { addUser, removeUser ,addLogo} = NovaStoreSlice.actions;
export default NovaStoreSlice.reducer;
