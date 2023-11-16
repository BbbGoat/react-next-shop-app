import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IAuthState {
    isLoggedIn: boolean;
    email: null | string;
    userName: null | string;
    userID: null | string;
}

const initialState: IAuthState = {
    isLoggedIn: false,
    email: null,
    userName: null,
    userID: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // 로그인 상태 저장
        SET_ACTIVE_USER: (state, action) => {
            const { email, userName, userID } = action.payload;
            state.isLoggedIn = true;
            state.email = email;
            state.userName = userName;
            state.userID = userID;
        },
        // 로그인 상태 초기화
        REMOVE_ACTIVE_USER: (state) => {
            state.isLoggedIn = false;
            state.email = null;
            state.userName = null;
            state.userID = null;
        }
    }
})

export const {SET_ACTIVE_USER, REMOVE_ACTIVE_USER} = authSlice.actions;

// state 내보내기
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectUserId = (state: RootState) => state.auth.userID;

export default authSlice.reducer;