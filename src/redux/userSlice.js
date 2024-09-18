import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isUserLoggedIn: true
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        setUserLoggedIn: (state, action) => {
            state.isUserLoggedIn = action.payload;
        }
    },
});

export const {login, logout, setUserLoggedIn} = userSlice.actions;
export default userSlice.reducer;