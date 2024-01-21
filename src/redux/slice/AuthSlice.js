import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    email: null,
    userID: null,
    profilePic: '',
    session: null,
    prevUrl: ''
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_ACTIVE_USER(state, action){
      
        state.isLoggedIn= true
        state.email= action.payload.email
        state.userID= action.payload.userID
        state.profilePic= action.payload.profilePic
        state.session= action.payload.sessionID
    },
    REMOVE_ACTIVE_USER(state, action){
      state.isLoggedIn= false
      state.email= null
      state.userName= null
      state.userID= null
      state.profilePic= ''
    },
    SAVE_URL(state, action){
      state.prevUrl = action.payload
    }

  }
});

export const {SET_ACTIVE_USER, REMOVE_ACTIVE_USER, SAVE_URL} = AuthSlice.actions
export const selectIsLoggedIn = (state)=> state.auth.isLoggedIn;
export const selectEmail = (state)=> state.auth.email;
export const selectUserID = (state)=> state.auth.userID;
export const selectProfilePic = (state)=> state.auth.profilePic;
export const selectSessionID = (state)=> state.auth.session;
export const selectPrevious = (state)=> state.auth.prevUrl;

export default AuthSlice.reducer